import CONFIG from '../config.js';

const { TABKEY } = CONFIG;

const tabs = {};
tabs[TABKEY.cate] = {
  key: TABKEY.cate,
  text: '全部分类',
  obj: {}
};
tabs[TABKEY.type] = {
  key: TABKEY.type,
  text: '综合排序',
  obj: {}
};
tabs[TABKEY.filter] = {
  key: TABKEY.filter,
  text: '筛选',
  obj: {}
};
const initState = {
  tabs,
  activeKey: '',
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'changeHeaderTabKey':
      return {
        ...state,
        activeKey: action.tabKey !== state.activeKey ? TABKEY[action.tabKey] : ''
      }
    default: return state;
  }
};

