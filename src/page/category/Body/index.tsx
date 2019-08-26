import React from 'react';
import './index.scss';
// import CustomizedComponent from './memo';

export default class Index extends React.Component {

  constructor(props) {
    super(props);
  }

  handleChange = () => {
    console.log('你好呀')
  }

  render() {
    return (
      <div className="body-wrapper">
        ddd
      </div>
    )
  }
}