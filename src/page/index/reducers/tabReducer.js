import CONFIG from '../config.js';

const { TABKEY } = CONFIG;
const initState = {
  tabs: [
    {name: '首页', key: TABKEY.home},
    {name: '订单', key: TABKEY.order},
    {name: '我的', key: TABKEY.my},
  ],
  activeKey: TABKEY.home,
};

function changeBottomBar(state, { payload }) {
  return {
    ...state,
    activeKey: payload,
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'changeBottomBar': return changeBottomBar(state, action);
    default: return state;
  }
};

