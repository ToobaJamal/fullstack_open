const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')
//const { default: PersonForm } = require('../../newphonebook/src/components/PersonForm')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', (request, response) => request.method === "POST" ? JSON.stringify(request.body) : "")
app.use(morgan(function (tokens, request, response) {
  return [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, 'content-length'), '-',
    tokens['response-time'](request, response), 'ms',
    tokens.body(request, response)
  ].join(' ')
}))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


// DO NOT SAVE YOUR PASSWORD TO GITHUB!!


const generateId = () => {
  return Math.floor(Math.random() * 100000)
}

app.get('/info', (request, response) => { 
  Person.find({}).then(persons => response.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>
  `))
})
// app.get('/api/persons', (request, response) => {
//     Person.find({}).then(persons => )
    
// })
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})
app.get('/api/persons/:id', (request, response, next) => {
    //const id = Number(request.params.id)
    Person.findById(request.params.id).then(person => {
      if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
    }).catch(error => next(error)) 
  })
    
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id).then(result => {
    response.status(204).end()
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;
  const person = {
    name: name,
    number: number
  }
  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
  .then(updatedPerson => {
    console.log(updatedPerson)
    response.json(updatedPerson)
  }).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body;
  const person = new Person({
    name: name,
    number: number,
  });

  person
    .save()
    .then((savedPerson) => {
      console.log(savedPerson)
      response.json(savedPerson)
    }).catch(error => next(error))
    
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint) 


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)
// app.post('/api/persons', (request, response) => {
//   //const id = generateId()
//   const { name, number} = request.body
//   const person = new Person({
//     number: number,
//   })
  
//   person.save().then((savedPerson) => {
//     response.json(savedPerson);
//     })
// })
// app.post("/api/persons", (request, response, next) => {
//   const { name, number } = request.body;

//   const person = new Person({
//     name: name,
//     number: number,
//   });

//   person
//     .save()
//     .then((savedPerson) => {
//       response.json(savedPerson);
//     })
//     .catch((error) => next(error));
// });
const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log(`Sever is running on port ${PORT}`)
})

