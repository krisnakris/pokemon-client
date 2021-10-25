import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { actionCreators } from '../state';
import Swal from 'sweetalert2';
import axiosConfig from '../config/axiosConfig';

function PokemonFavorites() {
  let listPokemon = useSelector((state) => state.myPokemon);
  const dispatch = useDispatch();
  const history = useHistory();

  const releasePokemon = async (id) => {
    let result = (await axiosConfig('/release')).data;
    if (result.number) {
      dispatch(actionCreators.releasePokemon(listPokemon, id));
    } else {
      Swal.fire(`This pokemon still want to stay`, 'Please try again', 'info');
    }
  };

  const renamePokemon = (id, name, pokemonNickName, renamedTimes) => {
    (async () => {
      const { value: newPokemonNickName } = await Swal.fire({
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

      if (newPokemonNickName) {
        let form = {
          name: newPokemonNickName,
          renamedTimes,
        };
        let result = (
          await axiosConfig({
            method: 'post',
            url: '/rename',
            data: form,
          })
        ).data;

        let payload = {
          id,
          name,
          pokemonNickName: result.renamedName,
          renamedTimes: renamedTimes + 1,
        };

        Swal.fire(`Your Pokemon nickname for ${name} is ${newPokemonNickName}`);
        dispatch(actionCreators.renamePokemon(listPokemon, payload));
      }
    })();
  };

  const detailPokemon = (id) => {
    history.push('/detail/' + id);
  };

  return (
    <div className='container'>
      <h1>My Pokemon</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Nickname</th>
            <th>Image</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {listPokemon.map(
            ({ name, id, sprites, pokemonNickName, renamedTimes }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{pokemonNickName}</td>
                <td>
                  <img
                    src={sprites.front_default}
                    alt={name}
                    className='figure-img img-fluid rounded'
                  ></img>
                </td>
                <td>
                  <button
                    className='btn btn-primary'
                    style={{ marginRight: '15px' }}
                    onClick={() => releasePokemon(id)}
                  >
                    Release
                  </button>
                  <button
                    className='btn btn-danger'
                    style={{ marginRight: '15px' }}
                    onClick={() =>
                      renamePokemon(id, name, pokemonNickName, renamedTimes)
                    }
                  >
                    Rename
                  </button>
                  <button
                    className='btn btn-info'
                    onClick={() => detailPokemon(id)}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PokemonFavorites;
