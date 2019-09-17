import React from 'react';
import './index.scss';
import { primaryColor } from '@/defaultSetting';

export default class Index extends React.Component {
  render() {
    return (
      <div className="bar-wrapper">
        <div className="cart-img">
          <img src={require('@/static/img/shop-icon.png')} alt=""/>
        </div>
        <div className="bar-content">
          <div className="order-desc">
            <div className="desc">
              <p><span className="currency">￥</span><span className="price">0</span></p>
              <p className="remark">另需配送费 ￥9</p>
            </div>
          </div>
          <div className="buy" style={{backgroundColor: primaryColor}}><span>去结算</span></div>
        </div>
      </div>
    )
  }
}