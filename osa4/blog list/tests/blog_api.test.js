const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const assert = require('assert');
const bcrypt = require('bcrypt')
const api = supertest(app)


require('express-async-errors')

// Let's initialize the database before every test with the beforeEach function:
// beforeEach(async () => {
//     await Blog.deleteMany({})
  
//     let blogObject = new Blog(helper.initialBlogs[0])
//     await blogObject.save()
  
//     blogObject = new Blog(helper.initialBlogs[1])
//     await blogObject.save()
//   })

beforeEach(async () => {
    await User.deleteMany({})
  
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
  
    await user.save()
  })
  
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
  
    const newUser = {
      username: 'freessshhhh',
      name: 'fresh freshness',
      password: 'salainen',
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  
    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
  
// Loop blogs and use promise so all asynchronous operations finish executing!
beforeEach(async () => {
    await Blog.deleteMany({})
  
    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

// beforeEach(async () => {
//     await Blog.deleteMany({})
//     let blogObject = new Blog(initialBlogs[0])
//     await blogObject.save()
//     blogObject = new Blog(initialBlogs[1])
//     await blogObject.save()
// })

// 4.8
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs') //Check this line!
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
     assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

// test('there are two blogs', async () => {
//     const response = await api.get('/api/blogs')
  
//     assert.strictEqual(response.body.length, initialBlogs.length)
//   })
  
test('the title of the first blog is TestPost1', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(e => e.title)
    assert(contents.includes('TestPost1'))
})

//4.10
// test('a valid blog can be added', async () => {
//     const newBlog = {
//         "title": "async/await simplifies making async calls",
//         "author": "asyncTest Author",
//         "url": "asyncTest.com",
//         "likes": 1
//     }
  
//     await api
//       .post('/api/blogs')
//       .send(newBlog)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)
  
//     // const response = await api.get('/api/blogs')
  
//     // const titles = response.body.map(r => r.title)
  
//     // assert.strictEqual(response.body.length, initialBlogs.length + 1)

//     const blogsAtEnd = await helper.blogsInDb()
//     assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  
//     const titles = blogsAtEnd.map(n => n.title)
  
//     assert(titles.includes("async/await simplifies making async calls"))

//     // beforeEach deletes post from database so let's log it to see that it is working!
//     console.log('Blogs in database after test:', blogsAtEnd)
// })

//4.11
// test('blog without likes is not added', async () => {
//     const newBlog = {
//         "title": "no Likes Test",
//         "author": "noLikesTest Author",
//         "url": "noLikesTest.com"
//     }
  
//     const response = await api
//       .post('/api/blogs')
//       .send(newBlog)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)

//     assert.strictEqual(response.body.likes, 0)
  
//     // const response = await api.get('/api/blogs')
//     // assert.strictEqual(response.body.length, initialBlogs.length)
//     const blogsAtEnd = await helper.blogsInDb()
//     assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
//     console.log('Blogs in database after test:', blogsAtEnd)
// })

//4.12 Add test without title
test('blog without title is not added', async () => {
    const newBlog = {
        "author": "Test Author",
        "url": "test.com",
        "likes": 1
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
})

test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
  
    const blogToView = blogsAtStart[0]
  
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    assert.deepStrictEqual(resultBlog.body, blogToView)
  })

//4.13
test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    const titles = blogsAtEnd.map(r => r.title)
    assert(!titles.includes(blogToDelete.title))
  
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    // beforeEach deletes post from database so let's log it to see that it is working!
    console.log('Blogs in database after test:', blogsAtEnd)
  })

//4.9
test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    assert(response.body[0].id, 'id property is not defined')
})


//4.14
test('blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    
    // Comment out title, author, url or likes to test if it updates only the parameters that we give!
    const newBlog = {
        title: 'Updated Title',
        author: 'Updated Author',
        url: 'http://updated.com',
        likes: 5,
    }
  
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    // const titles = blogsAtEnd.map(r => r.title)
    // assert(titles.includes(newBlog.title))
    
    // update only given parameters!
    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

    if (newBlog.title !== undefined) {
        assert.strictEqual(updatedBlog.title, newBlog.title)
    }
    if (newBlog.author !== undefined){
        assert.strictEqual(updatedBlog.author, newBlog.author)
    }
    if (newBlog.url !== undefined){
        assert.strictEqual(updatedBlog.url, newBlog.url)
    }
    if (newBlog.likes !== undefined){
        assert.strictEqual(updatedBlog.likes, newBlog.likes)
    }
  
    console.log('Blogs in database after test:', blogsAtEnd)
})

//4.16
test('creation fails with short username and password', async () => {
    const usersAtStart = await helper.usersInDb()
  
    const newUser = {
      username: 'a',
      name: 'testshortnameandpassword1',
      password: 'a1',
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
//4.16 THIS IS FAILING O.o
test('unique username fails with proper statuscode', async () => {
    const usersAtStart = await helper.usersInDb()
  
    const newUser = {
      username: 'root', // This is in DB already! otherwise test will fail!
      name: 'doesntmatter',
      password: 'password',
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

  

after(async () => {
  await mongoose.connection.close()
})