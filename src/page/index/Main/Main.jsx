import React from 'react';
import { connect } from 'react-redux';
import BottomBar from '../BottomBar/index.jsx'
import Home from '../Home/Home';
import Category from '../Home/Category/Category';
import ContentList from '../Home/ContentList'

class Index extends React.Component {

  render() {
    return (
      <div>
        <Home />
        <BottomBar />
        <Category />
        <ContentList />
      </div>
    )
  }
}

export default connect(
  state => ({
    num: state.tabReducer.num
  })
)(Index);