const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

logger.info(`Server running on port ${config.PORT}`)
// 4.20* refactored to middleware!
// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.startsWith('Bearer ')) {
//       return authorization.replace('Bearer ', '')
//     }
//     return null
//   }

// Refactor this into asynchronous code
// blogsRouter.get('/', (request, response) => {
//   Blog.find({}).then(blogs => {
//     response.json(blogs)
//   })
// })

//4.17
blogsRouter.get('/', async (request, response) => { 
    const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1})
    
    response.json(blogs)
  })

// blogsRouter.get('/:id', async (request, response, next) => {
// //   Blog.findById(request.params.id)
// //     .then(blog => {
// //       if (blog) {
// //         response.json(blog)
// //       } else {
// //         response.status(404).end()
// //       }
// //     })
// //     .catch(error => next(error))
//     try {
//         const blog = await Blog.findById(request.params.id)
//         if (blog) {
//           response.json(blog)
//         } else {
//           response.status(404).end()
//         }
//       } catch(exception) {
//         next(exception)
//       }
// })

//4.12
blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    // 4.17
    //const user = await User.findOne()

    //added Bearer schema
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    // //Javascript returns undefined if trying to access property that doesnt exist! Check if title of url is undefined!
    if (body.title === undefined || body.url === undefined) {
        return response.status(400).end()
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })
    //   blog.save()
    //     .then(savedBlog => {
    //       // response.json(savedBlog)
    //       response.status(201).json(savedBlog)
    //     })
    //     .catch(error => next(error))

    // use the express-async-errors for cleaner syntax :)
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    //4.17
    // const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 }).execPopulate()

    response.status(201).json(savedBlog)
})

//4.13
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

    //4.21*
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(404).json({ error: 'blog not found' })
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (blog.user.toString() !== decodedToken.id.toString()) {
        return response.status(401).json({ error: 'only the creator can delete blogs' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()


})

//4.14
blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }
// Check what to update!
    if (body.title !== undefined) {
        blog.title = body.title
    }
    if (body.author !== undefined) {
        blog.author = body.author
    }
    if (body.url !== undefined) {
        blog.url = body.url
    }
    if (body.likes !== undefined) {
        blog.likes = body.likes
    }

//   Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
//     .then(updatedBlog => {
//       response.json(updatedBlog)
//     })
//     .catch(error => next(error))
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

module.exports = blogsRouter