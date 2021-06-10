import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Home } from './components/Home'
import { Pet } from './components/Pet'

// https://eggfriend.herokuapp.com/api/Pets
export function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/pets/:id">
          <Pet />
        </Route>

        <Route path="*">Not Found</Route>
      </Switch>
    </>
  )
}
