const mongoose = require('mongoose')
if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
  }
const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.8htkjte.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })

  const Person = mongoose.model('Person', personSchema)

  mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')
    if (process.argv.length == 5) {
        const person = new Person({
                 name: process.argv[3],
                 number: process.argv[4]
               })

               person.save().then(() => {
                console.log(`added to phonebook`);
                mongoose.connection.close();
              })
      }
//     const person = new Person({
//       name: 'Jerry',
//       number: 12345
//     })

//    return person.save()
if (process.argv.length == 3) {
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
      })        
  }
  
})
  .then(() => {
    console.log('Query successful')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))