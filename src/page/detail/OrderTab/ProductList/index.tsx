import React from 'react';
// import { connect } from 'react-redux';
import ListView from '@/components/ListView';
import './index.scss';
import { IProps } from './interface.ts';

/**
 * @constructor <ContentList />
 * @description 商品列表
 */

class Index extends React.Component<IProps> {

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

  render() {
    const { dataSource } = this.props;
    const data = dataSource;
    console.log('data:', data)
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div key={rowID} className="item-container">
          <div style={{ display: 'flex', padding: '15px 0' }}>
            <div style={{width: '35%'}}>
              <img className="item-img" src={obj.picture} alt="" />
            </div>
            <div className="item-desc">
              <div className="item-title">{obj.name || ''}</div>
              <p className="desc">{obj.description || ''}</p>
              <div className="praise">{obj.praise_content || ''}</div>
              <div className="operate">
                <div className="price"><span className="currency">￥</span><span className="number">{obj.min_price || 0}</span><span className="unit"> /{obj.unit || ''}</span></div>
                <div className="plus"><img src={require('@/static/img/plus.png')} alt=""/></div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    return (
      <div className="list-content">
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
              {isLoading ? '加载中...' : '到底了...'}
            </div>
          )}
          renderBodyComponent={() => <div />}
        />
      </div>
    )
  }
}

export default Index;