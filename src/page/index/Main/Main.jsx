import React from 'react';
import { connect } from 'react-redux';
import BottomBar from '../BottomBar/index.jsx'

class Index extends React.Component {

  render() {
    return (
      <div>
        <BottomBar />
      </div>
    )
  }
}

export default connect(
  state => ({
    num: state.tabReducer.num
  })
)(Index);