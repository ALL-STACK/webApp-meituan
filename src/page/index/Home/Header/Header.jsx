import React from 'react';
import './Header.scss';
import SearchBar from '../SearchBar/SearchBar';

/**
 * @constructor <Header />
 * @description 顶部banner
 */

export default class Index extends React.Component {

  render() {
    return (
      <div className="header">
        <SearchBar />
        <img className="banner-img" src={require('@/static/img/meituan.jpg')} />
      </div>
    )
  }
}