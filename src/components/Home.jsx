import { useEffect, useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export function Home() {
  const [pets, setPets] = useState([])
  const [newName, setNewName] = useState('')
  const [holder, setHolder] = useState('Name')

  useEffect(function () {
    async function loadPets() {
      const response = await axios.get(
        'https://eggfriend.herokuapp.com/api/pets'
      )
      setPets(response.data)
      // if (response.status === 200) {
      //   setPets(response.data)
      //   console.log(pets)
      // }
    }
    loadPets()
  }, [])

  // function to sort by name
  function sortPets(names) {
    names.sort(function (a, b) {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })
  }

  // here is the function to make a new pet
  async function newPet() {
    if (newName === '') {
      console.log('oops')
      return
    }
    console.log('hello ' + newName)
    await axios.post(`https://eggfriend.herokuapp.com/api/pets`, {
      name: `${newName}`,
    })
    const refresh = await axios.get('https://eggfriend.herokuapp.com/api/pets')
    setPets(refresh.data)

    setNewName('')
    setHolder('Name')
    // location.reload()
  }

  return (
    <>
      <h1>卵友達 </h1>
      <p>Click a pet to see more information</p>
      <ul className="pet list">
        {/* sort by name */}
        {sortPets(pets)}
        {pets.map(pet => (
          <li key={pet.id} className="pet">
            <Link to={`/pets/${pet.id}`}>{pet.name}</Link>
          </li>
        ))}
      </ul>
      {/* make new pet */}
      <input
        type="text"
        id="huh"
        placeholder={holder}
        value={newName}
        onChange={event => setNewName(event.target.value)}
      />
      <button className="make pet" onClick={newPet}>
        Make a Pet
      </button>
    </>
  )
}
