import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Communication from './services/Communication'



const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number:'123123'
    }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  // const [notes, setNotes] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const PersonObject = {
      name: newName,
      number: newNumber,
    }
    if(persons.map(person => person.name.toUpperCase()).indexOf(newName.toUpperCase())!==-1){
      window.alert(`${newName} is in list already dude. there is only one ${newName}`)
    }else{
      setPersons(persons.concat(PersonObject))
      setNewName('')
      setNewNumber('')

      axios
        .post('http://localhost:3001/persons', PersonObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (id,name) => {
    if(window.confirm(`delete ${name} ?`)){
      const person = persons.find(p => p.id === id)
      //const changedNote = { ...note, important: !note.important }
      console.log(person.name + "this person will be deleted")
      axios.delete(`http://localhost:3001/persons/${person.id}`).then(response => {
      setPersons(persons.filter(p => p.id !== id))
  })
    }


  /*  axios.put(url, changedNote).then(response => {
      setNotes(notes.map(note => note.id !== id ? note : response.data))
    })
  */
  }

  const filteredPeople = persons.filter(person => person.name.toLowerCase().startsWith(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      filter : <input value = {newFilter} onChange={handleFilterChange}>
      </input>
      <h2>add a new</h2>
        <form onSubmit = {addPerson}>
          name: <input value = {newName} onChange={handleNameChange}
          />
          number: <input value = {newNumber} onChange={handleNumberChange}/>
        <div>
          <button type="submit">add </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filteredPeople.map(person =>
        <p key = {person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person.id,person.name)}>delete</button></p>)}
      </div>
    </div>
  )

}

export default App
