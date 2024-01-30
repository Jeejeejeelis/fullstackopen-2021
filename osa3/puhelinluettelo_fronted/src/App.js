import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import communicationService from './services/Communication'

const Notification = ({ message, type }) => {
  if (type==='Error'){
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
  else if (type==='Success') {
    return(
      <div className='success'>
        {message}
      </div>
    )
  }
  else{
    return null
  }
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number:'123123'
    }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState('')

  useEffect(() => {
    communicationService
      .getAll()
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
      if(window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)){
        const person = persons.find(p => p.name === newName)
        communicationService
          .update(person.id, PersonObject)
          .then(response => {
            setPersons(persons.map(p => p.id !== person.id ? p : response.data))
            setNewName('')
            setNewNumber('')
            setErrorType('Success')
            setErrorMessage(
              `${newName}'s number has been changed`
            )
            setTimeout(() => {
              setErrorType(null)
              setErrorMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorType('Error')
            setErrorMessage(
              `Information of ${newName} has already been removed from server`
            )
            setTimeout(() => {
              setErrorType(null)
              setErrorMessage(null)
            }, 5000)
          })
      }
    }else{
      setPersons(persons.concat(PersonObject))
      setNewName('')
      setNewNumber('')
      communicationService
        .create(PersonObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setErrorType('Success')
          setErrorMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setErrorType(null)
            setErrorMessage(null)
          }, 5000)
        }).catch(error => {
          console.log(error.response.data);
          setErrorType('Error')
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorType(null)
            setErrorMessage(null)
          }, 5000)
        })
        // .catch(error => {
        //   // console.log(error.response.data);
        //   setErrorType('Error')
        //   const fullErrorMessage = error.response.data.match(/<pre>(.*?)<\/pre>/s)[1];
        //   const errorMessage = fullErrorMessage.replace(/<[^>]*>?/gm, '').split('\n')[0];
        //   const cleanErrorMessage = errorMessage.replace(/&nbsp;/g, ' ');
        //   const finalErrorMessage = cleanErrorMessage.split('.')[0];
        //   console.log(finalErrorMessage);
        //   setErrorMessage(finalErrorMessage)
        //   // `Person '${newName}' has not been added`
        //   setTimeout(() => {
        //     setErrorType(null)
        //     setErrorMessage(null)
        //   }, 5000)
        // })
    }
  }

  const deletePerson = (id,name) => {
    if(window.confirm(`delete ${name} ?`)){
      const person = persons.find(p => p.id === id)
      communicationService.removePerson(person.id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }

  }

  const filteredPeople = persons.filter(person => person.name.toLowerCase().startsWith(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={errorType} />
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
