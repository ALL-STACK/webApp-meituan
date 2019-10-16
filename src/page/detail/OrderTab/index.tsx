import React from 'react';
import { WingBlank, WhiteSpace } from 'antd-mobile';
import axios from 'axios';
import { connect } from 'react-redux';
import BottomBar from '../BottomBar';
import ProductList from './ProductList';
import OrderList from '../OrderList';
import './index.scss';

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      menuList: [],
    };
    this.queryListData();
  }

  queryListData = async () => {
    let { data: { data }} = await axios({
      method: 'get',
      url: './json/food.json',
    });
    this.setState({categoryList: data.food_spu_tags}, () => {
      const { dispatch } = this.props;
      dispatch({
        type: 'changeCateActive',
        payload: {
          activeCate: {index: 0, name: this.state.categoryList[0].name}
        }
      })
    });
  }

  handleCateClick = (item: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'changeCateActive',
      payload: {
        activeCate: item
      }
    })
  }

  renderCategory = () => {
    const { activeCate } = this.props;
    return this.state.categoryList.map((item, index) => (
      <div 
        className={`cate-item${activeCate.index === index ? ' active' : ''}`}
        key={index}
        onClick={() => this.handleCateClick({index, name: item.name})}
       >
        <span>{item.name}</span>
      </div>
    ))
  }

  render() {
    const { activeCate } = this.props;
    const { categoryList } = this.state;
    return (
      <div className="list-wrapper">
        <div className="cate-list">
          {this.renderCategory()}
        </div>
        <div className="menu-list">
          <WhiteSpace />
          <WingBlank>
            <div className="title">{activeCate.name || ''}</div>
            <ProductList dataSource={Array.isArray(categoryList) && categoryList.length ? categoryList[activeCate.index].spus : []} />
          </WingBlank>
        </div>
        <OrderList />
        <BottomBar />
      </div>
    )
  }
}

export default connect(
  state => ({
    activeCate: state.tabReducer.activeCate,
  })
)(Index)