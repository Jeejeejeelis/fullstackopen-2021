const Blog = require('../models/blog')

const initialBlogs = [
    {
        "title": "TestPost1",
        "author": "TestPost1 Author",
        "url": "test1.com",
        "likes": 1
    },
    {
        "title": "TestPost2",
        "author": "TestPost2 Author",
        "url": "test2.com",
        "likes": 2
    },
  ]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}