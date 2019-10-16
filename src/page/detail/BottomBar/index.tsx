import React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { primaryColor } from '@/defaultSetting';

class Index extends React.PureComponent {

  showOrderList = () => {
    if(!this.getListNum()) return;
    const { dispatch } = this.props;
    dispatch({
      type: 'showOrderList'
    })
  }

  getListNum = () => {
    const { orderedProd } = this.props;
    let num = 0;
    Object.values(orderedProd).forEach((e: any) => {
      num = num + e.orderedNum
    })
    return num;
  }

  render() {
    return (
      <div className="bar-wrapper">
        <div className="cart-img">
          <img src={require('@/static/img/shop-icon.png')} alt="" onClick={this.showOrderList}/>
          {
            this.getListNum() ? (
              <div className="prodNum"><span>{this.getListNum()}</span></div>
            ) : null
          }
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

export default connect(
  state => ({
    orderedProd: state.tabReducer.orderedProd,
  })
)(Index)