const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
      })

    test('front page can be opened', async ({ page }) => {
        await page.goto('http://localhost:5173')

        const locator = await page.getByText('Blogs')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Blogs')).toBeVisible()
    })

    test('login form can be opened', async ({ page }) => {
        await page.goto('http://localhost:5173')
    
        await page.getByRole('button', { name: 'log in' }).click()
        await page.getByTestId('username').fill('testpart5')
        await page.getByTestId('password').fill('testpart5')
        await page.getByRole('button', { name: 'login' }).click()
      
        await expect(page.getByText('testpart5 logged in')).toBeVisible()
    
      })
    
    
    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'log in' }).click()
        await page.getByTestId('username').fill('testpart5')
        await page.getByTestId('password').fill('testpart5')
        await page.getByRole('button', { name: 'login' }).click()
        })

        test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'create new blog' }).click()
        const textboxes = await page.getByRole('textbox').all()
        await textboxes[0].fill('E2E test blog submission')
        await textboxes[1].fill('Test author')
        await textboxes[2].fill('www.e2e.ai')
        await page.getByRole('button', { name: 'create' }).click()
        await expect(page.getByText('a new blog E2E test blog submission by Test author added')).toBeVisible()
        })
    })  
})