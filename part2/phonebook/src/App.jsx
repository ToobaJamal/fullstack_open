import { useState, useEffect } from 'react'
import axios from 'axios'
import Notification from './components/Notification'
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Error from './components/Error'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personService.getAll().then(response => {
        setPersons(response)
      })
  }, [])
  function handleFilter(e) {
    const filterVal = e.target.value
    if(persons.find(element => element.name.toLowerCase() === filterVal.toLowerCase())) {
      alert(`${filterVal} already exists in phonebook`)
    }
  }

  function handleContactChange(e) {
    setNewName(e.target.value)
}
  function handleNumberChange(e) {
      setNewNumber(e.target.value)
  }
  function addName(e) {
    e.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber
    }
    if(persons.find(element => element.name === newName)) {
      if (window.confirm(`${newName} is already in phonebook, replace old number with a new one?`)) {
        const personToChange = persons.filter(n => n.name === newName)
        const changedContact = { ...personToChange[0], number: newNumber }
        const id = personToChange[0].id
        const url = `http://localhost:3001/persons/${id}`
        axios
    .put(url, changedContact)
    .then(response => {
      const newSetPerson = persons.map((person) =>
      person.id !== changedContact.id ? person : changedContact)
      setPersons(newSetPerson)
      }).catch(error => console.log("fail"))
      }
      setNewName("")
      setNewNumber("")
    }
    axios
    .post('http://localhost:3001/persons', contactObject)
    .then(response => {
      setPersons(persons.concat(contactObject))
      setNewName("")
      setNewNumber("")
      setNotificationMessage(`Added ${contactObject.name}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }).catch(error => console.log(error))}

  function deleteContact(id) {
    const url = `http://localhost:3001/persons/${id}`
    //const deletePerson = persons.find(n => n.id === id)
    const personToDelete = persons.filter(person => person.id === id)
    if (window.confirm(`delete ${personToDelete[0].name}?`)) {
    axios.delete(url).then(response => {
      setPersons(persons.filter(person => person.id !== id))
    }).catch(error => {
      setErrorMessage(`${contactObject.name} has already been deleted`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)})}}
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <Filter handleFilter={handleFilter}/>

      <h3>Add a new</h3>

      <PersonForm 
      addName={addName} newName={newName} newNumber={newNumber} 
      handleContactChange={handleContactChange} handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} deleteContact={deleteContact}/>
    </div>
  )
}

export default App