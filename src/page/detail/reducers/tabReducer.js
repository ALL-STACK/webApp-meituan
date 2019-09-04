
const initState = {
  activeCate: {
    index: 0,
    name: '',
  }
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'changeCateActive':
      return {
        ...state,
        activeCate: action.payload.activeCate
      }
    default: return state;
  }
};