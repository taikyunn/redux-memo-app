import React, { Component } from 'react';
import { connect } from 'react-redux';
import pstore from '../index.js';

class PersistForm extends Component {
  check = {
    margin: '5px 0px'
  };

  label = {
    fontSize: '12pt',
    color: '#006',
    padding: '2px 10px'
  };

  constructor(props){
    super(props);
    this.state = {
      check: 'on',
    }
    this.doChange = this.doChange.bind(this);
  }

  doChange(e) {
    let f = e.target.checked;
    this.setState({
      check: f ? 'on' : ''
    });

    if (f) {
      // 永続化を開始
      pstore.persist();
      pstore.flush();
    } else {
      // 永続化一時停止
      pstore.pause();
    }
  }

  render(){
    return(
      <div>
        <label style={this.label}>
          <input type="checkbox" id="check" size="40" onChange={this.doChange} style={this.check} checked={this.state.check} />
          Persist
        </label>
      </div>
    )
  }
}

export default connect((state)=>state)(PersistForm);
