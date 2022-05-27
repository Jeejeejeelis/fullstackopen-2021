import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather =({ capital }) => {
  const [ weatherAPI, setWeatherAPI ] = useState(null)

  useEffect(() => {
       const weatherAPIkey = process.env.REACT_APP_API_KEY
       const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${weatherAPIkey}`
       console.log(weatherUrl)
       axios
       .get(weatherUrl)
       .then(response => {setWeatherAPI(response.data)})
   }, [capital])
   if (weatherAPI !== null){
     const iconUrl = `http://openweathermap.org/img/wn/${weatherAPI.weather[0].icon}@2x.png`
     return (
       <div>
        <p>temperature {Math.round(weatherAPI.main.temp - 273.15)} Celcius</p>
        <img src= {iconUrl} alt='weather icon' width="100" height="auto" />
        <p>wind {weatherAPI.wind.speed} m/s</p>
       </div>
     )
   }else {
     return <div>weather not found</div>
   }

}

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

              <h3>Weather in {countries[0].capital}</h3>
              <Weather capital={countries[0].capital}  />



            </div>
          )
      } else if ( countries.length <= 10 && countries.length > 1) {
          return (
            <div>
              {filteredCountries.map(c =>
              <div key = {c.name}> {c.name} <button value = {c.name} onClick={handleFilterChange}>Show</button></div>)}
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
