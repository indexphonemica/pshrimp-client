import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import './App.css';
const API_URL = 'http://localhost:1337/';

function encode(thing) {
  return encodeURIComponent(thing.replace(/\\/g,'\\\\').replace(/&/g,'\\+').replace(/=/g,'\\e'));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '', 
      searchResults: [], 
      detailResults: {},
      tabIndex: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.detail = this.detail.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSearch(event) {
    event.preventDefault();

    const queryURL = API_URL + 'query/' + encode(this.state.value);

    fetch(queryURL, {
      method: "GET"
    }).then(res => res.json()).then(res => this.setState({searchResults: res}));
  }

  detail(id) {
    const queryURL = API_URL + 'language/' + id;
    console.log(id);

    fetch(queryURL, {
      method: "GET"
    }).then(res => res.json()).then(res => this.setState({detailResults: res, tabIndex: 1}));
  }

  render () {
    return (
      <main className="container">
        <div className="row">
          <section id="search" className="col-sm">
            <form onSubmit={this.handleSearch}>
              <div id="input-wrapper">
                <input id="in" type="text" value={this.state.value} onChange={this.handleChange} />
              </div>
              <input id="submit" type="submit" value="Search" />
            </form>
            
            <div id="res">
              <SearchResults value={this.state.searchResults} detailFn={this.detail}/>
            </div>
          </section>
          <section id="tabnav" className="col-sm">
            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
              <TabList>
                <Tab>Help</Tab>
                <Tab>Detail</Tab>
              </TabList>
              <TabPanel>
                TODO: add Psmith help text
              </TabPanel>
              <TabPanel>
                <DetailPanel language={this.state.detailResults} />
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
        {props.value.map(language => <SearchResult key={language.id} language={language} detailFn={props.detailFn} />)}
      </tbody>
    </table>
  );
}

function SearchResult(props) {
  return (
    <tr>
      <td>
        <button onClick={() => props.detailFn(props.language.id)}>
          {props.language.language_name}
        </button>
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

function DetailPanel(props) {
  const language = props.language;
  return (<div>
    <PhonemeMatrix name='Consonants' inv={ language.consonants } />
    <PhonemeMatrix name='Clicks' inv={ language.clicks } />
    <PhonemeMatrix name='Vowels' inv={ language.vowels } />
    <PhonemeArray name='Syllabic consonants' inv={ language.syllabic_consonants } />
    <PhonemeArray name='Tones' inv={ language.tones } />
  </div>);
}

function PhonemeMatrix(props) {
  const size = props.inv.size;
  if (size === 0) return (<div></div>);
  const contents = props.inv.contents;

  return (<div>
    <h4 className='language-segments'>{ props.name } ({ size })</h4>
    <table className='inventory'><tbody>
      {contents.map(y => <tr>{y.map(x => <td>{ x.join(' ') }</td>)}</tr>)}
    </tbody></table>
  </div>)
}

function PhonemeArray(props) {
  const size = props.inv.size;
  if (size === 0) return (<div></div>);
  const contents = props.inv.contents;

  return (<div>
    <h4 className='language-segments'>{ props.name } ({ size })</h4>
    <span>{ contents.join(' ') }</span>
  </div>)
}

export default App;
