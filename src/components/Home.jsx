import { useEffect, useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export function Home() {
  const [pets, setPets] = useState([])

  useEffect(function () {
    async function loadPets() {
      const response = await axios.get(
        'https://eggfriend.herokuapp.com/api/pets/'
      )

      if (response.status === 200) {
        setPets(response.data)
        console.log(pets)
      }
    }
    loadPets()
  }, [])

  return (
    <>
      <h1>Pets</h1>
      <p>Click a pet to see more information</p>
      <ul className="pet list">
        {pets.map(pet => (
          <li key={pet.id} className="pet">
            <Link to={`/pets/${pet.id}`}>{pet.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
