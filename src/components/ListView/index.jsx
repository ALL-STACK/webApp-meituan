import React from 'react';
import { ListView } from 'antd-mobile';
import CONSTANT from '@/constant';

const NUM_ROWS = CONSTANT.LIST_ROWS;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataBlob = {};
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = (pIndex * NUM_ROWS) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  return dataBlob;
}

/**
 * @constructor <ListView />
 * @description 列表
 */

export default class Index extends React.Component {

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
      isLoading: true,
    };
  }

  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    // simulate initial Ajax
    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 600);
  }

  onEndReached = () => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) return;
    // console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.rData = { ...this.rData, ...genData(++pageIndex) };
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  };


  render() {
    const { renderRow, renderHeader, renderSeparator, renderFooter } = this.props;
    return (
      <ListView
        {...this.props}
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderHeader={renderHeader ? () => renderHeader : null}
        renderFooter={renderFooter ? () => renderFooter(this.state.isLoading) : null}
        renderRow={renderRow || null}
        renderSeparator={renderSeparator || null}
        pageSize={4}
        useBodyScroll
        // onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    )
  }
}