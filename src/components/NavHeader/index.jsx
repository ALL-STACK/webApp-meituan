import React from 'react';
import './index.scss';

/**
 *
 *
 * @class Index
 * @extends {React.Component}
 */
export default class Index extends React.Component {
    render() {
        return (
            <div className="head_wrapper">
                <img src={require('@/static/img/back.png')} className="img_back" onClick={() => window.history.back()} />
                <h4 className="head_title">{this.props.title || ''}</h4>
            </div>
        )
    }
}