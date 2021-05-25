import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const PersonObject = {
      name: newName,
    }
    if(persons.map(person => person.name.toUpperCase()).indexOf(newName.toUpperCase())!==-1){
      window.alert(`${newName} is in list already dude. there is only one ${newName}`)
    }else{
      setPersons(persons.concat(PersonObject))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addPerson}>
        name: <input value = {newName}
        onChange={handleNameChange}
        />
        <div>
          <button type="submit">add </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
        <p key = {person.name}>{person.name}</p>)}
      </div>
      ...
    </div>
  )

}

export default App