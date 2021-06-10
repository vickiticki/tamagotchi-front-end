import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function Pet() {
  const [pet, setPet] = useState({
    id: 0,
    name: '',
    birthday: '',
    hungerLevel: 0,
    happinessLevel: 0,
    playtimes: null,
    feedings: null,
    scoldings: null,
  })

  // const [playtimes, setPlaytimes] = useState({
  //   id: null,
  //   when: '',
  //   petId: pet.id,
  //   pet: pet,
  // })

  const params = useParams()

  useEffect(() => {
    axios
      .get(`http://eggfriend.herokuapp.com/api/pets/${params.id}`)
      .then(response => {
        setPet(response.data)
      })
  }, [pet])

  function Playtime() {
    axios.post(
      `https://eggfriend.herokuapp.com/api/Pets/${params.id}/playtimes`
    )
    console.log('play')
  }
  function Feeding() {
    axios.post(`https://eggfriend.herokuapp.com/api/Pets/${params.id}/feedings`)
  }

  function Scolding() {
    axios.post(
      `https://eggfriend.herokuapp.com/api/Pets/${params.id}/scoldings`
    )
  }

  return (
    <>
      <h2>{pet.name}</h2>
      <dl>
        <dt>Birthday</dt>
        <dl>{pet.birthday}</dl>
        <dt>Happiness:</dt>
        <dl>{pet.happinessLevel}</dl>
        <dl>Hunger:</dl>
        <dt>{pet.hungerLevel}</dt>
      </dl>
      <div className="interact buttons">
        <button onClick={Playtime}>Play</button>
        <button onClick={Feeding}>Feed</button>
        <button onClick={Scolding}>Scold</button>
      </div>
      <Link to="/" className="go home">
        Home
      </Link>
    </>
  )
}
