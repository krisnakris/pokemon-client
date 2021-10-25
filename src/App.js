import React from 'react';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import PokemonFavorites from './components/PokemonFavorites';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <div className="text-center mt-3">
          <h4 className="">
            <Link to='/' className="mr-3">Home</Link>
          </h4>
          <h5 className="">
            <Link to='/myPokemon'>My Pokemon</Link>
          </h5>
        </div>

        <Switch>
          <Route exact path='/'>
            <PokemonList />
          </Route>
          <Route path='/detail/:id'>
            <PokemonDetail />
          </Route>
          <Route path='/myPokemon'>
            <PokemonFavorites />
          </Route>
        </Switch>
      </div>
    </Router >
  );
}

export default App;
