import React, { useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { useHistory } from 'react-router';

function PokemonList() {
  const [pokemonList, setPokemonList] = React.useState([]);
  const [nextPage, setNextPage] = React.useState('');

  const fetchPokemon = async (url) => {
    let listPokemon = (await axios(url)).data;

    await Promise.all(
      listPokemon.results.map(async (pokemon) => {
        let { sprites, id } = await (await axios(pokemon.url)).data;
        pokemon.picture = sprites.front_default;
        pokemon.id = id;
      })
    );

    setNextPage(listPokemon.next);
    const newPokemonList = [...pokemonList, ...listPokemon.results];
    setPokemonList(newPokemonList);
  };

  const fetchMorePokemon = async () => {
    fetchPokemon(nextPage);
  };

  useEffect(() => {
    fetchPokemon('https://pokeapi.co/api/v2/pokemon/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let history = useHistory();

  function detailPokemon(id) {
    history.push('/detail/' + id);
  }

  return (
    <div className='container'>
      <h1 style={{ color: 'orange' }}>Pokemon List</h1>
      <InfiniteScroll
        loadMore={fetchMorePokemon}
        initialLoad={false}
        hasMore={true}
        loader={<h1 key={0}>Loading...</h1>}
      >
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {pokemonList.map(({ name, id, picture }) => (
              <tr key={name}>
                <td>{name}</td>
                <td>
                  <img
                    src={picture}
                    alt={name}
                    className='figure-img img-fluid rounded'
                  ></img>
                </td>
                <td>
                  <button
                    className='btn btn-primary'
                    onClick={(event) => detailPokemon(id)}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
}

export default PokemonList;
