import React from 'react';
// import { WingBlank } from 'antd-mobile';
import { connect } from 'react-redux';
import './index.scss';

class Index extends React.Component {

  addToCart = (item: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'addOrderedProd',
      payload: { item }
    })
  }

  minusFromCart = (item: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'minusOrderedProd',
      payload: { item }
    })
  }

  getRealListLength = () => {
    const { orderedProd } = this.props;
    console.log(Object.values(orderedProd).filter((e: any) => e.orderedNum))
    return Object.values(orderedProd).filter((e: any) => e.orderedNum).length
  }

  render() {
    const { orderedProd, showOrderList } = this.props;
    return showOrderList ? (
      <div className="orderWrapper">
        <div className="discountNum">
          <span>折扣已减65元</span>
        </div>
        <div className="orderList">
        {
          Object.values(orderedProd).map((obj: any, index) => {
            return obj.orderedNum ? (
              <div key={obj.id} className="item-container" style={index < this.getRealListLength() ? {borderBottom: 'thin #00000014 solid'} : {}}>
                <div style={{ display: 'flex', padding: '15px 0' }}>
                  <div>
                    <img className="item-img" src={obj.picture} alt="" />
                  </div>
                  <div className="item-desc">
                    <div className="item-title">{obj.name || ''}</div>
                    <div className="operate">
                      <div className="price"><span className="currency">￥</span><span className="number">{obj.min_price && obj.orderedNum ? obj.min_price * obj.orderedNum : 0}</span></div>
                      <div className="plus">
                        <img src={require('@/static/img/minus.png')} alt="" onClick={() => this.minusFromCart(obj)} />
                        <span>&nbsp;&nbsp;{obj.orderedNum}&nbsp;&nbsp;</span>
                        <img src={require('@/static/img/plus.png')} alt="" onClick={() => this.addToCart(obj)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null
          })
        }
        </div>
      </div>
    ) : null
  }

}

export default connect(
  state => ({
    orderedProd: state.tabReducer.orderedProd,
    showOrderList: state.tabReducer.showOrderList
  })
)(Index)