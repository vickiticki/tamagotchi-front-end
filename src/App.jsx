import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Home } from './components/Home'
import { Pet } from './components/Pet'

// https://eggfriend.herokuapp.com/api/Pets
export function App() {
  return (
    <>
      {/* <header>
        <h1>Welcome to my SPA</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Go Home</Link>
            </li>
            <li>
              <Link to="/1">Page 1</Link>
            </li>
            <li>
              <Link to="/2">Page 2</Link>
            </li>
          </ul>
        </nav>
      </header> */}
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
