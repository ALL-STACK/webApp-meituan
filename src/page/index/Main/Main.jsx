import React from 'react';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import BottomBar from '../BottomBar/index.jsx';
import { Route, withRouter } from 'react-router-dom';
import Home from '../Home/Home';
import Category from '../Home/Category/Category';
import ContentList from '../Home/ContentList';
import Loading from './Loading';

// 懒加载
const My = Loadable({
  loader: () => import(/* webpackChunkName: "my" */'../My'),
  loading: Loading,
});

// 懒加载
const Order = Loadable({
  loader: () => import(/* webpackChunkName: "order" */'../Order'),
  loading: Loading,
});

class Index extends React.Component {

  render() {
    return (
      <div>
        <Route 
          exact 
          path='/home' 
          component={
            () => (
              <React.Fragment>
                <Home />
                <Category />
                <ContentList />
              </React.Fragment>
            )
          }
        />
        <Route path='/order' component={Order} />
        <Route path='/my' component={My}/>
        <BottomBar />
      </div>
    )
  }
}

export default withRouter(
  connect(
    state => ({
      num: state.tabReducer.num
    })
  )(Index)
);