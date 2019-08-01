import React from 'react';
import Header from '../Header'
import NavHeader from '@/components/NavHeader';

export default class Index extends React.Component {

  render() {
    return (
      <div>
        <NavHeader title='分类' />
        <Header />
      </div>
    )
  }
}