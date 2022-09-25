function Persons({ persons, deleteContact })  {
  return (
    <div>
        {persons.map(person => 
          <div key={person.id}><div> {person.name} {person.number}</div>
          <button onClick={() => deleteContact(person.id)}>delete</button>
        </div>
        )}
    </div>
  )
}

export default Persons