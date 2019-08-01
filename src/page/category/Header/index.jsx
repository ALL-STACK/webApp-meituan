import React from 'react';
import { connect } from 'react-redux';
import './index.scss';

class Index extends React.Component {

  handleHeadClick = tabKey => {
    const { dispatch } = this.props;
    dispatch({
      type: 'changeHeaderTabKey',
      tabKey,
    })
  }

  render () {
    const { tabs, activeKey } = this.props;
    return (
      <div className="header-wrapper">
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
    )
  }
}

export default connect(
  state => ({
    tabs: state.headerReducer.tabs,
    activeKey: state.headerReducer.activeKey,
  })
)(Index)