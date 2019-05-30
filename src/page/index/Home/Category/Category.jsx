import React from 'react';
import { Grid } from 'antd-mobile';
import './Category.scss';

/**
 * @constructor <Category />
 * @description 外卖类别
 */
const data = Array.from(new Array(8)).map((_val, i) => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
  text: `name${i}`,
}));

export default class Category extends React.Component {

  render() {
    return (
      <Grid data={data} activeStyle={false} />
    )
  }
}