
const initState = {
  activeCate: {
    index: 0,
    name: '',
  },
  orderedProd: {},
  showOrderList: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'showOrderList': {
      return {
        ...state,
        showOrderList: !state.showOrderList
      }
    }
    case 'changeCateActive': {
      return {
        ...state,
        activeCate: action.payload.activeCate
      }
    }
    case 'addOrderedProd': {
      const { payload: { item, item: { id } }} = action;
      const { orderedProd } = state;
      return {
        ...state,
        orderedProd: {
          ...orderedProd,
          [`${id}`]: orderedProd[id] ? { 
            ...item,
            orderedNum: ++orderedProd[id].orderedNum
          } : {
            ...item,
            orderedNum: 1 
          }
        }
      }
    }
    case 'minusOrderedProd': {
      const { payload: { item, item: { id } }} = action;
      const { orderedProd } = state;
      return {
        ...state,
        orderedProd: {
          ...orderedProd,
          [`${id}`]: {
            ...item,
            orderedNum: --orderedProd[id].orderedNum
          }
        }
      }
    }
    default: return state;
  }
};