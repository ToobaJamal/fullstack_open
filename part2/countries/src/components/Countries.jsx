function Countries({ countries, setCountries }) {
    if (countries.length === 1) return null;
    
    return countries.map((country) => (
      <>
        <div key={country.name.official}>
          {country.name.common}{" "}
          <button onClick={() => setCountries([country])}>show</button>
        </div>
      </>
      ))
    }
    

export default Countries

