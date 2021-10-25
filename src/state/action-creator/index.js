export const pokemonDetail = (pokemon) => {
  return (dispatch) => {
    dispatch({
      type: 'pokemon/detail',
      payload: pokemon
    });
  };
};

export function asyncDetailPokemonStore(id) {
  return (dispatch) => {
    fetch('https://pokeapi.co/api/v2/pokemon/' + id)
      .then(res => res.json())
      .then(res => {
        dispatch(pokemonDetail(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export const catchPokemon = (pokemon) => {
  return (dispatch) => {
    dispatch({
      type: 'pokemon/catch',
      payload: pokemon,
    });
  };
};

export const releasePokemon = (pokemonList, id) => {
  let newPokemonList = pokemonList.filter((pokemon) => pokemon.id !== id);

  return (dispatch) => {
    dispatch({
      type: 'pokemon/release',
      payload: newPokemonList,
    });
  };
};

export const renamePokemon = (pokemonList, payload) => {
  let newPokemonList = JSON.parse(JSON.stringify(pokemonList));
  let { id, pokemonNickName, renamedTimes } = payload;
  let index = newPokemonList.findIndex((item) => item.id === id);
  newPokemonList[index].pokemonNickName = pokemonNickName;
  newPokemonList[index].renamedTimes = renamedTimes;

  return (dispatch) => {
    dispatch({
      type: 'pokemon/rename',
      payload: newPokemonList,
    });
  };
};