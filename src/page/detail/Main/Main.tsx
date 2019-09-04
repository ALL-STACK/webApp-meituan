import React from 'react';
import NavHeader from '@/components/NavHeader/index.jsx';
import Content from '../Content';
import './Main.scss';
import BottomBar from '../BottomBar';

export default class Index extends React.Component {

  render() {
    return (
      <div className="container">
        <NavHeader title="某某某餐厅" />
        <Content />
        <BottomBar />
      </div>
    )
  }
}