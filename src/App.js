import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import './App.css';
const API_URL = 'http://localhost:1337/query/';

function encode(thing) {
  return encodeURIComponent(thing.replace(/\\/g,'\\\\').replace(/&/g,'\\+').replace(/=/g,'\\e'));
}

class App extends Component {
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
      <main className="container">
        <div className="row">
          <section id="search" className="col-sm">
            <form onSubmit={this.handleSubmit}>
              <div id="input-wrapper">
                <input id="in" type="text" value={this.state.value} onChange={this.handleChange} />
              </div>
              <input id="submit" type="submit" value="Search" />
            </form>
            
            <div id="res">
              <SearchResults value={this.state.searchResults} />
            </div>
          </section>
          <section id="tabnav" className="col-sm">
            <Tabs>
              <TabList>
                <Tab>Help</Tab>
                <Tab>Detail</Tab>
              </TabList>
              <TabPanel>
                TODO: add Psmith help text
              </TabPanel>
              <TabPanel>
                No detail yet
              </TabPanel>
            </Tabs>
          </section>
        </div>
      </main>
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
      <td>
        {props.language.language_name}
      </td>
      <td>
        <a href={"http://phoible.org/inventories/view/" + props.language.id}>
          {props.language.source}
        </a>  
      </td>
      <td>
        <a href={"http://ethnologue.com/language/" + props.language.language_code}>
          ({props.language.language_code})
        </a>
      </td>
      <td>
        {props.language.phonemes.join(' ')}
      </td>
    </tr>
  );
}

export default App;
