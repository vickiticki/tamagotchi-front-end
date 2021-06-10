import axios from 'axios'
// import { format } from 'prettier'
import { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import format from 'date-fns/format'

export function Pet() {
  const [pet, setPet] = useState({
    id: 0,
    name: '',
    birthday: '1990-01-14',
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
  const dateFormat = 'MMMM do, yyyy'
  const history = useHistory()
  const params = useParams()

  useEffect(() => {
    axios
      // @ts-ignore
      .get(`http://eggfriend.herokuapp.com/api/pets/${params.id}`)
      .then(response => {
        setPet(response.data)
      })
  }, [params.id])

  function Playtime() {
    axios.post(
      `https://eggfriend.herokuapp.com/api/Pets/${params.id}/playtimes`
    )
    console.log('play')
  }
  function Feeding() {
    axios.post(`https://eggfriend.herokuapp.com/api/Pets/${params.id}/feedings`)
  }

  function scolding() {
    axios.post(
      `https://eggfriend.herokuapp.com/api/Pets/${params.id}/scoldings`
    )
  }
  async function deletePet() {
    await axios.delete(`https://eggfriend.herokuapp.com/api/Pets/${params.id}`)

    history.push('/')
  }

  return (
    <>
      <h2>{pet.name}</h2>
      <dl>
        <dt>Birthday</dt>
        <dl>
          <time>{format(new Date(pet.birthday), dateFormat)}</time>
        </dl>
        <dt>Happiness:</dt>
        <dl>{pet.happinessLevel}</dl>
        <dl>Hunger:</dl>
        <dt>{pet.hungerLevel}</dt>
      </dl>
      <div className="interact buttons">
        <button onClick={Playtime}>Play</button>
        <button onClick={Feeding}>Feed</button>
        <button onClick={scolding}>Scold</button>
      </div>

      <button onClick={deletePet}>Delete Pet</button>
      <div className="go home">
        <Link to="/" className="go home">
          Home
        </Link>
      </div>
    </>
  )
}
