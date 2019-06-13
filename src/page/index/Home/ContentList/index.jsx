import React from 'react';
import axios from 'axios';
import { ListView } from 'antd-mobile';
import './index.scss';

const NUM_ROWS = 20;
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
 * @constructor <ContentList />
 * @description 附近商家列表
 */

export default class Index extends React.Component {

  constructor(props) {
    super(props);
    this.fetchContentList();
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
      data: [],
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

  fetchContentList = () => {
    axios({
      method: 'get',
      url: '/json/list.json'
    }).then((res) => {
      const data = res.data.data.poilist;
      const newData = data.map(e => {
        return {
          ...e,
          img: e.pic_url,
          desc: e.name,
        }
      });
      this.setState({data: newData});
    })
  };

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

  renderOthers(data) {
    let array = data.discounts2;
    return array.map((item, index)=>{
      return (
        <div key={index} className="other-info">
          <img src={item.icon_url} className="other-tag"/>
          <div className="other-content">{item.info}</div>
        </div>
      )
    });
  }

  render() {
    const { data } = this.state;
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div key={rowID} style={{ padding: '0 15px' }}>
          <div style={{ display: 'flex', padding: '15px 0' }}>
            <div style={{position: 'relative'}}>
              <img className="item-img" src={obj.img} alt="" />
              <div style={{position: 'absolute', left: 0, top: 0}}>
                {
                  obj.brand_type ? (
                    <div className="brand brand-pin">品牌</div>
                  ) : (
                    <div className="brand brand-xin">新到</div>
                  )
                }
              </div>
            </div>
            <div style={{ lineHeight: 1, width: '100%' }}>
              <div className="item-title">{obj.desc || ''}</div>
              <div className="item-desc">
                <div>月售 {obj.month_sale_num > 999 ? '999+' : obj.month_sale_num}</div>
                <div>{obj.mt_delivery_time || ''} | {obj.distance || ''}</div>
              </div>
              <div className="item-price">
                {obj.min_price_tip || ''}
              </div>
              <div>
                {this.renderOthers(obj)}
              </div>
            </div>
          </div>
        </div>
      );
    };
    return (
      <div className="list-content">
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderHeader={() => (
            <h4 className="list-title">
              <span className="title-line" />
              <span>附近商家</span>
              <span className="title-line" />
            </h4>
          )}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? '加载中...' : '加载完成'}
          </div>)}
          renderRow={row}
          renderSeparator={(sectionID, rowID) => (
            <div
              className="item-separator"
              key={`${sectionID}-${rowID}`}
            />
          )}
          className="am-list"
          pageSize={4}
          useBodyScroll
          // onScroll={() => { console.log('scroll'); }}
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    )
  }
}