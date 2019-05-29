import React from 'react';
import { SearchBar } from 'antd-mobile';
import './SearchBar.scss';

/**
 * @constructor <SearchBar />
 * @description 顶部搜索框
 */

export default class Index extends React.Component {

  render() {
    return (
      <div className="search-bar">
        <div className="bar-location">
          <div className="location-icon" />
          <div className="location-text">郑州市</div>
        </div>
        <SearchBar />
        {/*<div className="search-btn">*/}
          {/*<SearchBar />*/}
          {/*<p className="place-holder">鸡翅</p>*/}
        {/*</div>*/}
      </div>
    )
  }
}