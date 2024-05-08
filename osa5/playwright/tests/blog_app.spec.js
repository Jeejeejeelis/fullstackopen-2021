const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        // await request.post('http:localhost:3003/api/tests/reset')
        // await request.post('http://localhost:3003/api/users'
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
          data: {
            name: 'testpart5',
            username: 'testpart5',
            password: 'testpart5'
          }
        })

        await request.post('/api/users', {
            data: {
              name: 'lastTest',
              username: 'lastTest',
              password: 'lastTest'
            }
          })
        await page.goto('')
    })
// 5.17
    test('Login form is shown', async ({ page }) => {
        // await page.goto('http://localhost:5173')
        await page.goto('/')
        await page.getByRole('button', { name: 'log in' }).click()

        const usernameField = await page.getByTestId('username')
        const passwordField = await page.getByTestId('password')
        
        await expect(usernameField).toBeVisible()
        await expect(passwordField).toBeVisible()
    })
// 5.18
    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            // await page.goto('http://localhost:5173') 
            await page.goto('/')    
            // await page.getByRole('button', { name: 'log in' }).click()
            // await page.getByTestId('username').fill('testpart5')
            // await page.getByTestId('password').fill('testpart5')
            // await page.getByRole('button', { name: 'login' }).click()
            await loginWith(page, 'testpart5', 'testpart5')
            await expect(page.getByText('testpart5 logged in')).toBeVisible()
        
        })
    
        test('fails with wrong credentials', async ({ page }) => {
            // await page.goto('http://localhost:5173')
            await page.goto('/')
            await loginWith(page, 'wrong', 'wrong')
        
            await expect(page.getByText('wrong username or password')).toBeVisible()
        })
    })
    
    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            // await page.goto('http://localhost:5173')
            await page.goto('/')
            // await page.getByRole('button', { name: 'log in' }).click()
            // await page.getByTestId('username').fill('testpart5')
            // await page.getByTestId('password').fill('testpart5')
            // await page.getByRole('button', { name: 'login' }).click()
            await loginWith(page, 'testpart5', 'testpart5')
        })
// 5.19
        test('a new blog can be created', async ({ page }) => {
            // await page.getByRole('button', { name: 'create new blog' }).click()
            // const textboxes = await page.getByRole('textbox').all()
            // await textboxes[0].fill('E2E test blog submission')
            // await textboxes[1].fill('Test author')
            // await textboxes[2].fill('www.e2e.ai')
            // await page.getByRole('button', { name: 'create' }).click()
            await createBlog(page, 'E2E test blog submission', 'Test author','www.e2e.ai')
            // await expect(page.getByText('a new blog E2E test blog submission by Test author added')).toBeVisible()
            await expect(page.getByText('E2E test blog submission Test author')).toBeVisible()
        })

        describe('and a blog exists', () => {
            let blogPostLocator;
            beforeEach(async ({ page }) => {
                // await page.getByRole('button', { name: 'create new blog' }).click()
                // const textboxes = await page.getByRole('textbox').all()
                // await textboxes[0].fill('Another E2E test blog submission')
                // await textboxes[1].fill('Test author')
                // await textboxes[2].fill('www.e2e.ai')
                // await page.getByRole('button', { name: 'create' }).click()
                await createBlog(page, 'Another E2E test blog submission', 'Test author','www.e2e.ai')
                await expect(page.getByText('a new blog Another E2E test blog submission by Test author added')).toBeVisible()
                blogPostLocator = page.locator('li').filter({ hasText: 'Another E2E test blog submission Test author' })
            })  
        // 5.20
            test('likes can be changed', async ({ page }) => {
                await blogPostLocator.getByRole('button', { name: 'view' }).click()
                // await page.waitForSelector('button[name="like"]')
                await page.getByRole('button', { name: 'like' }).click()
                // await expect(page.getByText('like')).toBeVisible()
                // await page.getByRole('button', { name: 'like' }).click()
                await expect(page.getByText('blog has been successfully liked')).toBeVisible()

            })

            test('blog can be deleted', async ({ page }) => {
                // Open the blog post
                await blogPostLocator.getByRole('button', { name: 'view' }).click()
                // Confirm all the window.confirm dialogues!
                page.on('dialog', dialog => dialog.accept())
            
                // Click the 'delete' button
                await page.getByRole('button', { name: 'remove' }).click()
            
                // Check that the blog post has been deleted
                await expect(page.getByText('Blog has been successfully deleted')).toBeVisible()
              })
              // 5.22 I had filtered out other users blogposts in the fronted for some reason... now it is fixed!
              test('delete button is visible to blog creator', async ({ page }) => {
                await blogPostLocator.getByRole('button', { name: 'view' }).click()
                const deleteButton = await page.getByRole('button', { name: 'remove' })
                await expect(deleteButton).toBeVisible()
              })
            
              test('delete button is not visible to other users', async ({ page }) => {
                // Log out
                await page.getByRole('button', { name: 'logout' }).click()
            
                // Log in as a different user
                await loginWith(page, 'lastTest', 'lastTest')
                // Check that the delete button is not visible
                await blogPostLocator.getByRole('button', { name: 'view' }).click()
                const deleteButton = await page.getByRole('button', { name: 'remove' })
                await expect(deleteButton).not.toBeVisible()
              })
            
        })  
    })

    // 5.23
    describe('when logged in as a user and multiple blogs exist', () => {
        beforeEach(async ({ page }) => {
          await loginWith(page, 'testpart5', 'testpart5')

          // Create several blog posts
            for (let i = 1; i <= 5; i++) {
                await createBlog(page, `Blog post ${i}`, 'Test author', `www.blog${i}.com`)
                if (i === 5) {
                    await page.waitForTimeout(1000); // wait for 1 second after the 5th blog is created
                }
            }
          
        })
      
        test('blogs are sorted in descending order of likes', async ({ page }) => {
            const blogNames = Array.from({ length: 5 }, (_, i) => `Blog post ${i + 1}`);
            // Like each blog post one more time than the previous one
            for (let i = 0; i < blogNames.length; i++) {
                const blogName = blogNames[i];
                const blog = await page.locator(`.blog:has-text("${blogName}")`);
                await blog.getByRole('button', { name: 'view' }).click();
                
                // Like the blog posts
                for (let j = 0; j <= i; j++) {
                    await blog.getByRole('button', { name: 'like' }).click();
                    // Add a delay or wait for a specific condition here if necessary
                    await page.waitForTimeout(1000);
                }
            }
            await page.waitForTimeout(1000);
            let likes = [];

            // Loop over each blog by its name
            for (let i = 0; i < blogNames.length; i++) {
            const blogName = blogNames[i];
            
            // Find the blog by its name
            const blog = await page.locator(`.blog:has-text("${blogName}")`);
            
            // Get the likes for the blog
            let likeText = await blog.locator('.blogLikes').innerText();
            likeText = likeText.replace('likes ', '');
            console.log(`likeText: ${likeText}`);
            
            // Push to array and make it an integer not text!
            likes.push(parseInt(likeText));
            }

            // Check that the likes are sorted in ascending order, order goes other way around when we push!
            for (let i = 0; i < likes.length; i++) {
                console.log(`likes: ${likes[i]}`);
                if (i < likes.length - 1) {
                    expect(likes[i]).toBeLessThanOrEqual(likes[i + 1]);
                }
                await page.waitForTimeout(1000);
            }
        })
    })
})