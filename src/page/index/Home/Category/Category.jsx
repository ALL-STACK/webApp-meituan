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
      if(Array.isArray(data) || data.length) {
        const categoryList = data.map(e => {
          return {
            icon: e.url,
            text: e.name,
            code: e.code,
          }
        });
        this.setState({categoryList});
      }
    }).catch(() => {
      new Error('请求失败！')
    })
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
      />
    )
  }
}