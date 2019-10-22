import React from 'react';
import { connect } from 'react-redux';
import './index.scss';

class Index extends React.Component {

  hideMask = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'showMask'
    })
    dispatch({
      type: 'showOrderList'
    })
  }

  render() {
    const { showMask } = this.props;
    return showMask ? (
      <div className="mask" onClick={this.hideMask} />
    ) : null
  }

}

export default connect(
  state => ({
    showMask: state.tabReducer.showMask,
  })
)(Index)