import React from 'react';
import { Grid } from 'antd-mobile';
import axios from 'axios';
import './Category.scss';

/**
 * @constructor <Category />
 * @description 外卖类别
 */

export default class Category extends React.Component {

  constructor(props) {
    super(props);
    this.fetchData();
    this.state = {
      categoryList: [],
    }
  }

  fetchData = () => {
    axios({
      method: 'get',
      url: '/json/head.json'
    }).then(res => {
      const data = res.data.data.primary_filter;
      this.setState({categoryList: data});
    }).catch(() => {
      new Error('请求失败！')
    })
  };

  goCategory = () => {
    // window.location.href = './category.html';
  };

  render() {
    const { categoryList } = this.state;
    return (
      <Grid
        data={categoryList}
        activeStyle={false}
        hasLine={false}
        isCarousel={true}
        carouselMaxRow={2}
        renderItem={(item) => (
          <div className="category-item" onClick={this.goCategory}>
            <img className="item-icon" src={item.url} />
            <p className="item-name">{item.name}</p>
          </div>
        )}
      />
    )
  }
}