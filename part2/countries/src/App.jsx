import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Country from './components/Country'
function App() {
  const [countries, setCountries] = useState('')
  const [countriesData, setCountriesData] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  
  const hook = () => {
    console.log('effect')
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        console.log('promise fulfilled', response.data)
        setCountriesData(response.data)
      })
  }
  
  useEffect(hook, [])
  console.log('countries data', countriesData)
  console.log('countries to show', countriesToShow)
  
  function handleCountries(e) {
    const input = e.target.value
    setCountries(input)
    setCountriesToShow(countriesData.filter(country => country.name.common.toLowerCase().includes(countries.toLowerCase())))

  }
  return (
    <>
    <div>find countries: <input type='text' onChange={handleCountries}/></div>
    <div>
      {countriesToShow.length === 1 ? <Country country={countriesToShow[0]}/>: null}
      {countriesToShow.length >= 10 ? <p>Too many matches, specify another filter</p> : null}
      {countriesToShow.length < 10 && countriesToShow.length > 1? <Countries countries={countriesToShow} setCountries={setCountriesToShow}/> : null}
    </div>
    
    </>
  )
}

export default App
