import React, { Component } from 'react';
import './App.css';
const API_URL = 'http://localhost:1337/query/';

function encode(thing) {
  return encodeURIComponent(thing.replace(/\\/g,'\\\\').replace(/&/g,'\\+').replace(/=/g,'\\e'));
}

class App extends Component {
  render() {
    return (
      <SearchForm />
    );
  }
}

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleData = this.handleData.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const queryURL = API_URL + encode(this.state.value);

    fetch(queryURL, {
      method: "GET"
    }).then(function (res) {
      return res.json();
    }).then(function (res) {
      console.log(res);
    })
  }

  handleData(event) {
    event.preventDefault();
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="submit" />
      </form>
    );
  }
}

export default App;
