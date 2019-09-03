import React from 'react';
import Header from '../Header';
import { connect } from 'react-redux';
import NavHeader from '@/components/NavHeader';
import ContentList from '../ContentList/index.tsx';
import { IProps, IState } from './interface.ts';

class Index extends React.Component<IProps, IState> {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }
  
  handleFilter = (name: string) => {
    if(name !== this.state.name) {
      this.setState({name});
    }
  }

  render() {
    const { activeKey } = this.props;
    return (
      <div style={activeKey ? {overflow: 'hidden', height: '100%'} : {}}>
        <NavHeader title='分类' />
        <Header handleFilter={this.handleFilter} />
        <ContentList filterData={this.state.name} />
      </div>
    )
  }
}

export default connect(
  state => ({
    activeKey: state.headerReducer.activeKey,
  })
)(Index)