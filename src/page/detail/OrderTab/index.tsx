import React from 'react';
import { WingBlank, WhiteSpace } from 'antd-mobile';
import { connect } from 'react-redux';
import './index.scss';

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categoryList: ['kkkkkkkkkkkk',2,3,4,5,6,7,8,9,1,2,3,2,3,2,1,1,2],
      menuList: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'changeCateActive',
      payload: {
        activeCate: {index: 0, name: this.state.categoryList[0]}
      }
    })
  }

  handleCateClick = (item: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'changeCateActive',
      payload: {
        activeCate: item
      }
    })
  }

  renderCategory = () => {
    const { activeCate } = this.props;
    return this.state.categoryList.map((item, index) => (
      <div 
        className={`cate-item${activeCate.index === index ? ' active' : ''}`}
        key={index}
        onClick={() => this.handleCateClick({index, name: item})}
       >
        <span>{item}</span>
      </div>
    ))
  }

  render() {
    const { activeCate } = this.props;
    return (
      <div className="list-wrapper">
        <div className="cate-list">
          {this.renderCategory()}
        </div>
        <div className="menu-list">
          <WhiteSpace />
          <WingBlank>
            <div>{activeCate.name || ''}</div>
          </WingBlank>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    activeCate: state.tabReducer.activeCate,
  })
)(Index)