import React from 'react';
import axios from 'axios';
import { WingBlank } from 'antd-mobile';
import { connect } from 'react-redux';
import ListView from '@/components/ListView';
import StarScore from '@/components/StarScore';
import './index.scss';
import { IProps } from './interface.ts';

/**
 * @constructor <ContentList />
 * @description 商家列表
 */

class Index extends React.Component<IProps> {

  constructor(props) {
    super(props);
    this.fetchContentList();
    this.state = {
      data: [],
    };
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if(this.props.filterData !== newProps.filterData) {
      axios({
        method: 'get',
        url: '/json/listparams.json'
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
    }
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

  renderOthers = data => {
    let array = data.discounts2;
    return array.map((item, index)=>{
      return (
        <div key={index} className="other-info">
          <img src={item.icon_url} className="other-tag"/>
          <div className="other-content">{item.info}</div>
        </div>
      )
    });
  };

  hideMask = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'changeHeaderTabKey',
      tabKey: '',
    })
  }

  goDetail = (item: any) => {
    window.location.href = './detail.html?id=' + item.id;
  }

  render() {
    const { activeKey } = this.props;
    const { data } = this.state;
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div key={rowID} style={{ padding: '0 15px' }} className="item-container" onClick={() => this.goDetail(obj)}>
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
                <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                  <StarScore num={obj.wm_poi_score}/>
                  <div>月售 {obj.month_sale_num > 999 ? '999+' : obj.month_sale_num}</div>
                </div>
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
        <div className={`mask${activeKey ? ' active' : ''}`} onClick={this.hideMask} />
        <WingBlank>
          <ListView
            renderRow={row}
            renderSeparator={(sectionID, rowID) => (
              <div
                className="item-separator"
                key={`${sectionID}-${rowID}`}
              />
            )}
            renderFooter={isLoading => (
              <div style={{ paddingBottom: 30, textAlign: 'center' }}>
                {isLoading ? '加载中...' : '加载完成'}
              </div>
            )}
            renderBodyComponent={() => <div />}
          />
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({
    activeKey: state.headerReducer.activeKey,
  })
)(Index)