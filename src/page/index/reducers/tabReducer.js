import { ADD_TODO } from '../actions/actionTypes';
// import { addTodo } from "../actions/tabAction";

const initState = {
  num: 0,
};
const addTodo = (state, action) => {
  const objNum = action.obj.num;
  const num = state.num;
  return {
    num: num + objNum
  }
};

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_TODO: return addTodo(state, action);
    default: return state;
  }
};

