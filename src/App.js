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
    this.state = {value: '', searchResults: []};

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
    }).then(res => res.json()).then(res => this.setState({searchResults: res}));
  }

  handleData(event) {
    event.preventDefault();
  }

  render () {
    return (
      <section id="search">
        <div id="input-wrapper">
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            <input type="submit" value="submit" />
          </form>
        </div>
        
        <div id="res">
          <SearchResults value={this.state.searchResults} />
        </div>
      </section>
    );
  }
}

function SearchResults(props) {
  return (
    <table>
      <tbody>
        {props.value.map(language => <SearchResult key={language.id} language={language}/>)}
      </tbody>
    </table>
  );
}

function SearchResult(props) {
  return (
    <tr>
      <td>{props.language.language_name}</td>
    </tr>
  );
}

export default App;
