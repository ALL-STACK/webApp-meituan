import React from 'react';
import './index.scss';

/**
 * @constructor <StarScore />
 * @description 星形评分
 */

export default class Index extends React.Component {

  renderStar = num => {
    const score = (num || '').toString();
    const scoreArr = score.split('.');
    const fullStar = parseInt(scoreArr[0], 10);
    const halfStar = parseInt(scoreArr[1]) >= 5 ? 1 : 0;
    const nullStar = 5 - fullStar - halfStar;
    const domArr = [];
    if(fullStar) {
      for(let i = 0; i < fullStar; i++) {
        domArr.push(<img src={require("@/static/img/fullstar.png")} alt="" className="star"/>)
      }
    }
    if(halfStar) {
      for(let i = 0; i < halfStar; i++) {
        domArr.push(<img src={require("@/static/img/halfstar.png")} alt="" className="star"/>)
      }
    }
    if(nullStar) {
      for(let i = 0; i < nullStar; i++) {
        domArr.push(<img src={require("@/static/img/nullstar.png")} alt="" className="star"/>)
      }
    }
    return domArr.map((e, index) => (<div key={index}>{e}</div>))
  };

  render() {
    const { num } = this.props;
    return (
      <div className="star-container">
        {this.renderStar(num)}
      </div>
    )
  }
}