import axios from 'axios'
// import { format } from 'prettier'
import { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import format from 'date-fns/format'

export function Pet() {
  const [pet, setPet] = useState({
    id: 0,
    name: '',
    birthday: '',
    hungerLevel: null,
    happinessLevel: null,
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
  const picture = `picture no${pet.id % 8}`
  const bday = pet.birthday.slice(0, 10)

  useEffect(() => {
    axios
      // @ts-ignore
      .get(`https://eggfriend.herokuapp.com/api/pets/${params.id}`)
      .then(response => {
        setPet(response.data)
      })
  }, [params.id])

  async function Playtime() {
    await axios.post(
      `https://eggfriend.herokuapp.com/api/Pets/${params.id}/playtimes`
    )

    await axios
      .get(`https://eggfriend.herokuapp.com/api/pets/${params.id}`)
      .then(response => {
        setPet(response.data)
      })
    console.log('play')
  }
  async function Feeding() {
    await axios.post(
      `https://eggfriend.herokuapp.com/api/Pets/${params.id}/feedings`
    )
    await axios
      .get(`https://eggfriend.herokuapp.com/api/pets/${params.id}`)
      .then(response => {
        setPet(response.data)
      })
  }

  async function scolding() {
    await axios.post(
      `https://eggfriend.herokuapp.com/api/Pets/${params.id}/scoldings`
    )
    await axios
      .get(`https://eggfriend.herokuapp.com/api/pets/${params.id}`)
      .then(response => {
        setPet(response.data)
      })
  }
  async function deletePet() {
    await axios.delete(`https://eggfriend.herokuapp.com/api/Pets/${params.id}`)

    history.push('/')
  }

  return (
    <>
      <div className="pet intro">
        <h2>{pet.name}</h2>
        <div className={picture}></div>
      </div>

      <dl>
        <dt>Birthday:</dt>
        <dl>
          {/* <time>{format(new Date(pet.birthday), dateFormat)}</time> */}
          {/* that was weird when I deployed the site so whatever hopefully this works better */}
          {bday}
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
