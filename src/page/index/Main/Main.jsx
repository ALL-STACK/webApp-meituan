import React from 'react';
import { connect } from 'react-redux';
import BottomBar from '../BottomBar/index.jsx'
// import Home from '../Home/Home';
// import Category from '../Home/Category/Category';
// import ContentList from '../Home/ContentList';
// import Order from '../Order';
import My from '../My';

// const homePage = [
//   <Home />,
//   <BottomBar />,
//   <Category />,
//   <ContentList />,
// ];
// const orderPage = [
//   <Order />,
//   <BottomBar />
// ];

class Index extends React.Component {

  render() {
    return (
      <div>
        <My />
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