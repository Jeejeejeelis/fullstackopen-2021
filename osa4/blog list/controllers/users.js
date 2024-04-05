const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const uniqueValidator = require('mongoose-unique-validator')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

// 4.16*
  if (password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  //4.16*
  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
        if (error.errors.username.kind === 'unique') {
            response.status(400).json({ error: 'username must be unique' })
        } else {
            response.status(400).json({ error: error.message })
        }
    } else {
        response.status(500).json({ error: error.message })
    }
  }
})

// usersRouter.get('/', async (request, response) => {
//     const users = await User
//     .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })

//     response.json(users)
//   })

//4.15
usersRouter.get('/', async (request, response) => {
    const users = await User.find({}, 'username name') // Only fetch 'username' and 'name'
    response.json(users)
})

module.exports = usersRouter