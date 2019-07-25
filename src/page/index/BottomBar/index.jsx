import React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

class Index extends React.Component {

  handleClick = key => {
    this.props.history.replace(`${key}`)
    const { dispatch } = this.props;
    dispatch({
      type: 'changeBottomBar',
      payload: key,
    })
  };

  renderItems = () => {
    const { tabs, activeKey } = this.props;
    return tabs.map(item => {
      return (
        <div key={item.key} className={item.key + " btn-item " + `${item.key === activeKey ? 'active' : ''}`}>
          <NavLink replace to={`/${item.key}`} activeClassName='active' onClick={() => this.handleClick(item.key)}>
            <div className='tab-icon' />
            <div className='btn-name'>{item.name}</div>
          </NavLink>
        </div>
      )
    })
  };

  render() {
    return (
      <div className="bottom-bar">{this.renderItems()}</div>
    )
  }

}

export default withRouter(
  connect(
    state => ({
      tabs: state.tabReducer.tabs,
      activeKey: state.tabReducer.activeKey
    })
  )(Index)
)