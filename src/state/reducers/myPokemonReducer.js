const reducer = (state = [], action) => {
  switch (action.type) {
    case "pokemon/catch":
      return state.concat(action.payload);
    case "pokemon/release":
      let newState = action.payload;
      return newState;
    case 'pokemon/rename':
      return action.payload;
    default:
      return state;
  }
};

export default reducer;