import React from 'react';
import { connect } from 'react-redux';
import { List } from 'antd-mobile';
import './index.scss';
import axios from 'axios';

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.fetchData();
  }

  fetchData = async () => {
    const { dispatch } = this.props;
    const { data: { data } } = await axios({
      url: '/json/filter.json',
      method: 'get'
    });
    dispatch({
      type: 'saveFilterData',
      payload: data,
    })
  }

  handleHeadClick = tabKey => {
    const { dispatch } = this.props;
    dispatch({
      type: 'changeHeaderTabKey',
      tabKey,
    })
  }

  handleTagClick = (item, lv1, lv2) => {
    const { dispatch, handleFilter } = this.props;
    dispatch({
      type: 'setActiveTag',
      payload: {
        activeKey: this.props.activeKey,
        name: item.name,
        lv1, 
        lv2
      }
    });
    dispatch({
      type: 'changeHeaderTabKey',
      tabKey: '',
    });
    handleFilter && handleFilter(item.name);
  }

  isActiveTag = (lv1, lv2) => {
    const { tabs, activeKey } = this.props;
    if(activeKey) {
      const { obj } = tabs[activeKey];
      if(obj.lv1 === lv1 && obj.lv2 === lv2) {
        return ' active';
      }
    }
    return '';
  }

  renderTag = (data, lv1) => {
    return Array.isArray(data) && data.length ? data.map((e, index) => (
      <div onClick={() => this.handleTagClick(e, lv1, index)} className={`tag${this.isActiveTag(lv1, index)}`} key={index}>{e.name || ''} {`(${e.quantity || 0})`}</div>
    )) : null
  };

  renderCateContent = data => {
    return (
      <div className="content-wrapper">
        {
          Array.isArray(data) && data.length ? data.map((e, index) => (
            <div key={index}>
              <div className="cate-title">
                <span>{e.name || ''} {e.quantity || ''}</span>
              </div>
              <div className="cate-tags">
                {this.renderTag(e.sub_category_list, index)}
              </div>
            </div>
          )) : null
        }
      </div>
    )
  };

  isActiveList = (index) => {
    const { tabs, activeKey } = this.props;
    if(activeKey) {
      const { obj } = tabs[activeKey];
      if(obj.lv1 === index) {
        return ' active';
      }
    }
    return '';
  }

  renderTypeContent = data => {
    return Array.isArray(data) && data.length ? data.map((e, index) => (
      <List className="type-list" key={index}>
        <List.Item className={`type-list-item${this.isActiveList(index)}`} onClick={() => this.handleTagClick(e, index)}>{e.name}</List.Item>
      </List>
    )) : null
  };

  renderFilterContent = data => {
    return (
      <div className="content-wrapper">
        {
          Array.isArray(data) && data.length ? data.map((e, index) => (
            <div key={index}>
              {
                e.group_title && (
                  <div className="cate-title">
                    <span>{e.group_title}</span>
                  </div>
                )
              }
              <div className="cate-tags">
                {this.renderTag(e.items, index)}
              </div>
            </div>
          )) : null
        }
      </div>
    )
  };

  renderContent = () => {
    const { activeKey, headerData: { activity_filter_list, category_filter_list, sort_type_list} } = this.props;
    return (
      <React.Fragment>
        {
          activeKey === 'cate' ? this.renderCateContent(category_filter_list)
           : activeKey === 'type' ? this.renderTypeContent(sort_type_list) 
           : activeKey === 'filter' ? this.renderFilterContent(activity_filter_list) 
           : null
        }
      </React.Fragment>
    )
  }

  preventDefault = e => {
    e.preventDefault();
    e.stopPropagation();
  }

  render () {
    const { tabs, activeKey } = this.props;
    return (
      <div className="header-wrapper">
        <div className="header" onClick={this.preventDefault}>
          {
            Object.keys(tabs).map((e, index) => {
              const obj = Object.values(tabs)[index]
              return (
                <div
                  key={index}
                  style={index < 2 ? {borderRight: 'thin #ddd solid'} : {}}
                  className={`${obj.key} item${obj.key === activeKey ? ' active' : ''}`}
                  onClick={() => this.handleHeadClick(e)}
                >
                  {obj.text}
                  {
                    index === 2 ? (
                      <img src={require('@/static/img/filter.png')} alt="" />
                    ) : null
                  }
                </div>
              )
            })
          }
        </div>
        <div className={`filter_panel${activeKey ? ' active' : ''}`}>
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    tabs: state.headerReducer.tabs,
    activeKey: state.headerReducer.activeKey,
    headerData: state.headerReducer.headerData,
  })
)(Index)