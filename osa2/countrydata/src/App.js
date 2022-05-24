import React, { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {

  const [ countries, setCountries ] = useState([])

  const [ newFilter, setNewFilter] = useState('')
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const filteredCountries = countries.filter(c => c.name.toLowerCase().startsWith(newFilter.toLowerCase()))

  return (
    <div>
      find countries : <input value = {newFilter} onChange={handleFilterChange}>
      </input>
      <div>
        {filteredCountries.map(c =>
        <p key = {c.name}>{c.name}</p>)}
      </div>
    </div>

  )
}

export default App
