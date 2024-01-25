require('dotenv').config()
const express = require('express')
const morgan = require('morgan');
const cors = require('cors')

const app = express()

app.use(express.json())

app.use(express.static('build'))

morgan.token('body', function (req, res) { return JSON.stringify(req.body) });

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.use(cors())

const Person = require('./models/person')

// const mongoose = require('mongoose')

// const password = process.argv[2]

// // ÄLÄ KOSKAAN TALLETA SALASANOJA GitHubiin!
// const url =
//   `mongodb+srv://eelispinomaa:${password}@cluster0.iklnkwt.mongodb.net/personApp?retryWrites=true&w=majority`

// mongoose.set('strictQuery',false)
// mongoose.connect(url)

// const personSchema = new mongoose.Schema({
//   Name: String,
//   Number: String,
// })

// personSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })


let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Marry Poppendick",
    number: "39-23-6423122"
  },
  {
    id: 5,
    name: "nikola tesla",
    number: "+358-44011202312"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

//Schema? persons-> people?!!!!!!!!!!!!!!!!!!!!!
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  let d = new Date();
  let personCount = persons.length;
  response.send(`<h6>Phonebook has info for ${personCount} people</h6> <h6>${d}</h6>`);
})

// app.get('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id)
//   const person = persons.find(person => person.id === id)


//   if (person) {
//     response.json(person)
//   } else {
//     response.status(404).end()
//   }
// })

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

// app.delete('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id)
//   persons = persons.filter(person => person.id !== id)

//   response.status(204).end()
// })

app.delete('/api/persons/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const generateId = () => {
  // const maxId = persons.length > 0
  //   ? Math.max(...persons.map(n => n.id))
  //   : 0
  // return maxId + 1
  return Math.floor(Math.random() * 1000000);
}

// app.post('/api/persons', (request, response) => {
//   const body = request.body

//   if (!body.name || !body.number) {
//     return response.status(400).json({ 
//       error: 'name or number missing!' 
//     })
//   } else if (persons.some(person => person.name === body.name)){
//     return response.status(409).json({
//       error: 'name must be unique'
//     })
//   }

 

//   const person = {
//     name: body.name,
//     number: body.number,
//     id: generateId(),
//   }

//   persons = persons.concat(person)

//   response.json(person)
// })

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined||body.number === undefined) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})