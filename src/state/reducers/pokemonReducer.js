const reducer = (state = {
  name: '',
  types: [],
  sprites: {},
  moves: [],
}, action) => {
  switch (action.type) {
    case "pokemon/detail":
      return action.payload;
    default:
      return state;
  }
};

export default reducer;