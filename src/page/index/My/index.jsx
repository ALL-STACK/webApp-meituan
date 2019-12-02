import React from 'react';
import { List } from 'antd-mobile';
import './index.scss';

const Item = List.Item;

/**
 * @constructor <My />
 * @description 我的
 */

export default class Index extends React.Component {

  render() {
    return (
      <div>
        <div style={{backgroundImage: `url("${require('@/static/img/my_background.png')}")`}} className="avatar">
          <div className="img-container">
            <div className="img" style={{backgroundImage: `url("${require('@/static/img/kongyiji.jpg')}")`}} />
          </div>
          <div className="nickname">一颗茴香豆 &gt;</div>
        </div>
        <List>
          <Item
            thumb={require("@/static/img/location.png")}
            arrow="horizontal"
            onClick={() => {}}
          >
            收货地址管理
          </Item>
          <Item
            thumb={require("@/static/img/money.png")}
            onClick={() => {}}
            arrow="horizontal"
          >
            商家代金券
          </Item>
        </List>
        <List className="list">
          <Item
            thumb={require("@/static/img/email.png")}
            arrow="horizontal"
            onClick={() => {}}
          >
            意见反馈
          </Item>
          <Item
            thumb={require("@/static/img/question.png")}
            onClick={() => {}}
            arrow="horizontal"
          >
            常见问题
          </Item>
        </List>
        <List className="list">
          <Item><div style={{textAlign: 'center', color: 'rgb(255,200,76)'}}>客服电话：800-820-08820</div></Item>
        </List>
        <List className="list">
          <Item><div style={{textAlign: 'center', color: 'rgb(255,200,76)'}}><input type="file" accept="image/*" capture="camera"/></div></Item>
        </List>
        <div className="service-time list">服务时间：9:00 - 23:00</div>
      </div>
    )
  }
}