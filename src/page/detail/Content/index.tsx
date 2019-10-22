import React from 'react';
import { Tabs } from 'antd-mobile';
import { connect } from 'react-redux';
import './index.scss';
import OrderTab from '../OrderTab';
import EvaluateTab from '../EvaluateTab';
import DealerTab from '../DealerTab';

const tabs = [
  { title: '点菜', sub: '1' },
  { title: '评价', sub: '2' },
  { title: '商家', sub: '3' },
];

class Index extends React.Component {

  handleTabChange = (tab: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'changeCurTab',
      payload: { curTab: tab.sub }
    })
  }

  render() {
    return (
      <div className="content-wrapper">
        <Tabs
          className='tab'
          tabs={tabs}
          initialPage={'2'}
          tabBarUnderlineStyle={{borderColor: '#ffc85b'}}
          tabBarActiveTextColor="#333"
          renderTab={tab => <span>{tab.title}</span>}
          onChange={this.handleTabChange}
        >
          <OrderTab />
          <EvaluateTab />
          <DealerTab />
        </Tabs>
      </div>
    )
  }
}

export default connect(
  state => ({
    curTab: state.tabReducer.curTab,
  })
)(Index)