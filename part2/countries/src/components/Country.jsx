import Weather from "./Weather"
function Country({ country }) {
    console.log(country)
    return (
        <>
            <p>{country.name.common}</p>
            <p>{country.capital}</p>
            <p>{country.area}</p>
            <h3>Languages:</h3>
            <ul>
              {Object.values(country.languages).map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <img src={country.flags.png} alt={`${country.name.common} flag`} />
            <h3>Weather in {country.capital}</h3>
            <Weather capital={country.capital}/>
        </>
    )
}

export default Country