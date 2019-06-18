import React from 'react';
import axios from "axios/index";
import { WingBlank } from 'antd-mobile';
import ListView from '@/components/ListView';
import './index.scss';

/**
 * @constructor <Order />
 * @description 订单列表
 */

export default class Index extends React.Component {

  constructor(props) {
    super(props);
    this.fetchOrderList();
    this.state = {
      data: [],
    };
  }

  fetchOrderList = () => {
    axios({
      method: 'get',
      url: '/json/orders.json'
    }).then((res) => {
      const data = res.data.data.digestlist;
      this.setState({data});
    })
  };

  /*
  * 渲染评价按钮
  * @param {*} data
  * */
  renderComment = data => {
    let evaluation = !data.is_comment;
    if (evaluation) {
      return (
        <div className="evaluation">
          <div className="evaluation-btn" onClick={this.goEval}>评价</div>
        </div>
      );
    }
    return null;
  };

  renderTotalPrice = (data, index) => {
    return (
      <div key={index} className="product-item">
        <span>...</span>
        <div className="p-total-count">
          总计{data.product_count}个菜，实付
          <span className="total-price">¥{data.total}</span>
        </div>
      </div>
    )
  };

  renderProduct = (data) => {
    let list = data.product_list;

    // 复制数组防止引用
    let _list = JSON.parse(JSON.stringify(list));
    // push一个用来计算总计的{type：more}
    _list.push({type: 'more'});

    return _list.map((item, index)=>{
      if (item.type === 'more') {
        return this.renderTotalPrice(data, index);
      }
      return <div className="product-item" key={index}>{item.product_name}<div className="p-count">x{item.product_count}</div></div>;
    })
  };

  goDetail = () => {
    // window.location.href = './detail.html';
  };

  render() {
    const { data } = this.state;
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div className="order-item" key={rowID}>
          <div className="order-item-inner">
            <img className="item-img" src={obj.poi_pic}/>
            <div className="item-right">
              <div className="item-top" onClick={this.goDetail}>
                <p className="order-name one-line">{obj.poi_name}</p>
                <div className="order-state">{obj.status_description}</div>
              </div>
              <div className="item-bottom">
                {this.renderProduct(obj)}
              </div>
            </div>
          </div>
          {this.renderComment(obj)}
        </div>
      );
    };
    return (
      <div style={{margin: '0 auto'}}>
        <div className="order-title">我的订单</div>
        <div className="order-title-empty">我的订单</div>
        <WingBlank>
          <ListView
            renderRow={row}
            renderSeparator={(sectionID, rowID) => (
              <div
                className="item-separator"
                key={`${sectionID}-${rowID}`}
              />
            )}
            renderFooter={isLoading => (
              <div style={{ padding: 30, textAlign: 'center' }}>
                {isLoading ? '加载中...' : '加载完成'}
              </div>
            )}
            renderBodyComponent={() => <div />}
          />
        </WingBlank>
      </div>
    )
  }
}