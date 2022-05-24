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

  const PageContent = ({ countries }) => {

      if ( countries.length === 1 ) {
          return (
            <div>
              <h2>{countries[0].name}</h2>
              <div>capital {countries[0].capital}</div>
              <div>area {countries[0].area}</div>

              <h3>languages:</h3>
              <ul>
              {countries[0].languages.map(l =>
              <li key = {l.name}>{l.name}</li>)}
              </ul>
              <img src={countries[0].flag} alt={'no flag found'} width="170" height="auto" />
            </div>
          )
      } else if ( countries.length <= 10 && countries.length > 1) {
          return (
            <div>
              {filteredCountries.map(c =>
              <p key = {c.name}>{c.name}</p>)}
            </div>
          )
      } else {
          return (<p> Too many matches, specify another filter </p>)
      }
  }

  return (
    <div>
      find countries : <input value = {newFilter} onChange={handleFilterChange}>
      </input>
      <PageContent countries={filteredCountries}/>
    </div>

  )
}

export default App
