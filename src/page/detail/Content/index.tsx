import React from 'react';
import { Tabs } from 'antd-mobile';
import './index.scss';
import OrderTab from '../OrderTab';
import EvaluateTab from '../EvaluateTab';
import DealerTab from '../DealerTab';

const tabs = [
  { title: '点菜', sub: '1' },
  { title: '评价', sub: '2' },
  { title: '商家', sub: '3' },
];

export default class Index extends React.Component {
  render() {
    return (
      <div className="content-wrapper">
        <div className="empty" />
        <Tabs
          tabs={tabs}
          initialPage={'1'}
          tabBarUnderlineStyle={{borderColor: '#ffc85b'}}
          tabBarActiveTextColor="#333"
          renderTab={tab => <span>{tab.title}</span>}
        >
          <OrderTab />
          <EvaluateTab />
          <DealerTab />
        </Tabs>
      </div>
    )
  }
}