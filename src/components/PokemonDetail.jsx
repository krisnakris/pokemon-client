import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { actionCreators } from '../state';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import axiosConfig from '../config/axiosConfig';

function PokemonDetail(props) {
  const params = useParams();
  // const [pokemon, setPokemon] = useState({
  //   name: '',
  //   types: [],
  // });
  // console.log('pokemon: ', pokemon);

  // useEffect(() => {
  //   let { id } = params;

  //   fetch('https://pokeapi.co/api/v2/pokemon/' + id)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setPokemon(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [params]);

  let pokemon = useSelector((state) => state.pokemonDetail);
  let listPokemon = useSelector((state) => state.myPokemon);
  const dispatch = useDispatch();

  useEffect(() => {
    let { id } = params;

    dispatch(actionCreators.asyncDetailPokemonStore(id));
  }, [params]);

  const catchPokemon = () => {
    Swal.fire({
      title: 'Do you want to catch the pokemon?',
      confirmButtonText: 'Yes',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        let { name, sprites, id } = pokemon;
        let index = listPokemon.findIndex((item) => item.id === id);
        if (index !== -1) {
          Swal.fire('Pokemon are already catched', '', 'info');
        } else {
          axiosConfig('/catch')
            .then((res) => {
              if (res.data.result) {
                (async () => {
                  const { value: pokemonNickName } = await Swal.fire({
                    title: 'Enter your Pokemon nickname',
                    input: 'text',
                    inputLabel: 'Your Pokemon nickname',
                    showCancelButton: true,
                    inputValidator: (value) => {
                      if (!value) {
                        return 'You need to write something!';
                      }
                    },
                  });

                  if (pokemonNickName) {
                    let payload = {
                      name,
                      sprites,
                      id,
                      renamedTimes: 0,
                      pokemonNickName,
                    };

                    dispatch(actionCreators.catchPokemon(payload));
                    Swal.fire(
                      `Your Pokemon nickname for ${pokemon.name} is ${pokemonNickName}`
                    );
                  }
                })();
              } else {
                Swal.fire(
                  `${pokemon.name} is run away`,
                  'Better luck next time',
                  'info'
                );
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    });
  };

  return (
    <div className='container'>
      <img
        src={pokemon.sprites.front_shiny}
        alt={pokemon.name}
        className='figure-img img-fluid rounded'
        style={{ height: '270px', width: '350px' }}
      ></img>
      <button className='btn btn-danger' onClick={catchPokemon}>
        Catch
      </button>
      <h1>Pokemon Name: </h1>
      <h3 style={{ color: 'red' }}>{pokemon.name}</h3>
      <h1>Types: </h1>
      <ul>
        {pokemon.types.map((item, index) => (
          <li key={index}>{item.type.name}</li>
        ))}
      </ul>
      <h1>Moves: </h1>
      <ul>
        {pokemon.moves.map((item, index) => (
          <li key={index}>{item.move.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonDetail;
