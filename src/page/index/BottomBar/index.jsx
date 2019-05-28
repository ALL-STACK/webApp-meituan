import React from 'react';
import './index.scss';
import { connect } from 'react-redux';

export default class Index extends React.Component {

  renderItems = () => {
    const tabs = ['首页', '订单', '我的'];
    return tabs.map((e, index) => {
      return (
        <div key={index} className="btn-item">
          <div className='tab-icon' />
          <div className='btn-name'>{e}</div>
        </div>
      )
    })
  };

  render() {
    return (
      <div className="bottom-bar">{this.renderItems()}</div>
    )
  }

}