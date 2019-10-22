import React from 'react';
import NavHeader from '@/components/NavHeader/index.jsx';
import { connect } from 'react-redux';
import OrderList from '../OrderList';
import BottomBar from '../BottomBar';
import Mask from '../Mask';
import Content from '../Content';
import './Main.scss';
// import BottomBar from '../BottomBar';

class Index extends React.Component {

  render() {
    const { curTab } = this.props;
    return (
      <div className="container">
        <NavHeader title="某某某餐厅" />
        <Content />
        <Mask />
        {
          curTab === '1' ? (
            <React.Fragment>
              <OrderList />
              <BottomBar />
            </React.Fragment>
          ) : null
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    curTab: state.tabReducer.curTab,
  })
)(Index)