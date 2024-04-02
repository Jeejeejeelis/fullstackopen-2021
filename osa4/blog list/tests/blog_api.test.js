const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const assert = require('assert');
const api = supertest(app)

// Let's initialize the database before every test with the beforeEach function:
// beforeEach(async () => {
//     await Blog.deleteMany({})
  
//     let blogObject = new Blog(helper.initialBlogs[0])
//     await blogObject.save()
  
//     blogObject = new Blog(helper.initialBlogs[1])
//     await blogObject.save()
//   })

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

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, initialBlogs.length)
  })
  
test('the title of the first blog is TestPost1', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(e => e.title)
    assert(contents.includes('TestPost1'))
})

//4.10
test('a valid blog can be added', async () => {
    const newBlog = {
        "title": "async/await simplifies making async calls",
        "author": "asyncTest Author",
        "url": "asyncTest.com",
        "likes": 1
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    // const response = await api.get('/api/blogs')
  
    // const titles = response.body.map(r => r.title)
  
    // assert.strictEqual(response.body.length, initialBlogs.length + 1)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  
    const titles = blogsAtEnd.map(n => n.title)
  
    assert(titles.includes("async/await simplifies making async calls"))

    // beforeEach deletes post from database so let's log it to see that it is working!
    console.log('Blogs in database after test:', blogsAtEnd)
})

//4.11
test('blog without likes is not added', async () => {
    const newBlog = {
        "title": "no Likes Test",
        "author": "noLikesTest Author",
        "url": "noLikesTest.com"
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
  
    // const response = await api.get('/api/blogs')
    // assert.strictEqual(response.body.length, initialBlogs.length)
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    console.log('Blogs in database after test:', blogsAtEnd)
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
  })

//4.9
test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    assert(response.body[0].id, 'id property is not defined')
})
  

after(async () => {
  await mongoose.connection.close()
})