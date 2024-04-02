const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const config = require('../utils/config')
const logger = require('../utils/logger')

logger.info(`Server running on port ${config.PORT}`)

// Refactor this into asynchronous code
// blogsRouter.get('/', (request, response) => {
//   Blog.find({}).then(blogs => {
//     response.json(blogs)
//   })
// })

blogsRouter.get('/', async (request, response) => { 
    const blogs = await Blog.find({})
    response.json(blogs)
  })

blogsRouter.get('/:id', async (request, response, next) => {
//   Blog.findById(request.params.id)
//     .then(blog => {
//       if (blog) {
//         response.json(blog)
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch(error => next(error))
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog) {
          response.json(blog)
        } else {
          response.status(404).end()
        }
      } catch(exception) {
        next(exception)
      }
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

//   blog.save()
//     .then(savedBlog => {
//       // response.json(savedBlog)
//       response.status(201).json(savedBlog)
//     })
//     .catch(error => next(error))
    try {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
        } catch(exception) {
            next(exception)
        }
})

blogsRouter.delete('/:id', async (request, response, next) => {
//   Blog.findByIdAndRemove(request.params.id)
//     .then(() => {
//       response.status(204).end()
//     })
//     .catch(error => next(error))

    // try {
    //     await Blog.findByIdAndDelete(request.params.id)
    //     response.status(204).end()
    //     } catch(exception) {
    //     next(exception)
    //     }
    // Test express-async-errors library!
    // Do this to other routes!
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter