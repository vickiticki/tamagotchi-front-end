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

  const params = useParams()

  useEffect(() => {
    axios
      .get(`http://eggfriend.herokuapp.com/api/pets/${params.id}`)
      .then(response => {
        setPet(response.data)
      })
  }, [])

  return (
    <>
      <h1> here is a pet</h1>
      <h2>{pet.name}</h2>
      <dl>
        <dt>Birthday</dt>
        <dl>{pet.birthday}</dl>
        <dt>Happiness:</dt>
        <dl>{pet.happinessLevel}</dl>
        <dl>Hunger:</dl>
        <dt>{pet.hungerLevel}</dt>
      </dl>
      <Link to="/">Home</Link>
    </>
  )
}