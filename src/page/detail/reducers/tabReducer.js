
const initState = {
  activeCate: {
    index: 0,
    name: '',
  },
  orderedProd: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'changeCateActive':
      return {
        ...state,
        activeCate: action.payload.activeCate
      }
    case 'changeOrderedProd':
      console.log('改变')
      return {
        ...state,
      }
    default: return state;
  }
};