import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import { TextField, FormGroup, Button } from '@material-ui/core';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        SEmail:'',
        REmail:'',
        subject:'',
        text:'',
        SPNumber:'',
        RPNumber:'',
        body:'',
        
    };
    
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    return (
      <div className="App">
        <div style={styles.form}>
          <div><h1>SEND EMAIL</h1></div>
          <form onSubmit={this.handleSubmit1}>
            <FormGroup row='true'>
              <TextField color="primary" helperText="Sender Email" floatingLabelText="Sender Email" type="email" name='SEmail' onChange={this.handleChange} required/>
              <TextField color="primary" helperText="Receiver Email" floatingLabelText="Receiver Email" type="email" name='REmail' onChange={this.handleChange} required/>
            </FormGroup>
            <FormGroup row='true'>
              <TextField color="secondary" helperText="Subject" type="text" name='subject' inputProps={{maxLength: 50}} onChange={this.handleChange} />
              <TextField color="secondary" helperText="Body" type="text" name='text' inputProps={{maxLength: 480}} onChange={this.handleChange} required/>
            </FormGroup>
            <Button variant="contained" color="primary" type="submit">
              submit
            </Button>
          </form>
        </div>
        <hr/>
        <div style={styles.form}>
          <div><h1>SEND SMS</h1></div>
          <form onSubmit={this.handleSubmit2}>
            <FormGroup row='true'>
              <TextField color="primary" helperText="Sender number" type="text" name='SPNumber' onChange={this.handleChange} required/>
              <TextField color="primary" helperText="Receiver number" type="text" name='RPNumber' onChange={this.handleChange} required/>
            </FormGroup>
            <FormGroup row='true'>
              <TextField color="secondary" helperText="Body" type="text" name='body' onChange={this.handleChange} inputProps={{maxLength: 480}} required/>
            </FormGroup>
            <Button variant="contained" color="primary" type="submit">
              submit
            </Button>
          </form>
        </div>
      </div>
    );
  }
  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });

    return true;
  }
  handleSubmit1 = (event) => {
    event.preventDefault();
    this.sendEmail(this.state)
    //event.target.reset();
  }
  handleSubmit2 = (event) => {
    event.preventDefault();
    this.sendMessage(this.state)
    //event.target.reset();
  }
  sendEmail = (data) => {
      //
      var qs = require('qs');
      var data = qs.stringify({
        'SEmail': data.SEmail,
        'REmail': data.REmail,
        'subject': data.subject,
        'text': data.text,
      });
      var config = {
        method: 'post',
        url: 'http://localhost:3001/emails',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  sendMessage = (data) => {
    //
    var qs = require('qs');
    var data = qs.stringify({
      'SPNumber': data.SPNumber,
      'RPNumber': data.RPNumber,
      'body': data.body,
    });
    var config = {
      method: 'post',
      url: 'http://localhost:3001/messages',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}
}
export default App;

let styles = {
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop:'10px'
  },
}