
const initState = {
  activeCate: {
    index: 0,
    name: '',
  },
  orderedProd: {},
  showOrderList: false,
  showMask: false,
  curTab: '1',
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'changeCurTab': {
      return {
        ...state,
        curTab: action.payload.curTab
      }
    }
    case 'showMask': {
      return {
        ...state,
        showMask: !state.showMask
      }
    }
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
      const { payload: { item, item: { id }, isControlVisible }} = action;
      const { orderedProd } = state;
      const params = JSON.parse(JSON.stringify(orderedProd));
      delete params[id];
      const newOrderedProd = {
        ...params,
        ...orderedProd && orderedProd[id].orderedNum > 1 && { 
          [`${id}`]: {
            ...item,
            orderedNum: --orderedProd[id].orderedNum
          }
        },
      };
      return {
        ...state,
        orderedProd: newOrderedProd,
        ...isControlVisible && {
          showOrderList: !!Object.values(newOrderedProd).length,
          showMask: !!Object.values(newOrderedProd).length,
        }
      }
    }
    default: return state;
  }
};