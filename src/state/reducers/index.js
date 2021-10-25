import { combineReducers } from 'redux';
import myPokemonReducer from './myPokemonReducer';
import pokemonReducer from './pokemonReducer';

const reducers = combineReducers({
  myPokemon: myPokemonReducer,
  pokemonDetail: pokemonReducer,
});

export default reducers;