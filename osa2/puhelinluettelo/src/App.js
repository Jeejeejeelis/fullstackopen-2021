import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number:'123123'
    }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')

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
    }
  }

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
        {(persons.filter(person => person.name.toLowerCase().startsWith(newFilter.toLowerCase()))).map(person =>
        <p key = {person.name}>{person.name} {person.number}</p>)}
      </div>
    </div>
  )

}

export default App