import React from 'react';
import Header from '../Header'
import NavHeader from '@/components/NavHeader';
import Body from '../Body';

export default class Index extends React.Component {

  render() {
    return (
      <React.Fragment>
        <NavHeader title='分类' />
        <Header />
        <Body />
      </React.Fragment>
    )
  }
}