import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { HelpText } from './HelpText';
import { MarkersMap } from './MarkersMap';
import './App.css';

const API_URL = window.location.protocol + '//pshrimp.herokuapp.com/';

function encode(thing) {
  return encodeURIComponent(thing.replace(/\\/g,'\\\\').replace(/&/g,'\\+').replace(/=/g,'\\e'));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '', 
      searchResults: [], 
      shouldHaveSearchResults: false, // don't display 'no results' on load
      searchError: false,
      detailResults: false,
      detailError: false,
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

    this.search(this.state.value);
  }

  fetchJSON(queryURL) {
    return fetch(queryURL, {
      method: "GET"
    }).then(
      res => res.json()
    ).then(res => {
      if (res.hasOwnProperty('error')) {
        throw new Error(res.error);
      } else {
        return res;
      }
    });
  }

  search(str) {
    const queryURL = API_URL + 'query/' + encode(str);
    this.fetchJSON(queryURL, {
      method: "GET"
    }).then(
      res => this.setState({
        searchResults: res, 
        shouldHaveSearchResults: true,
        searchError: false
      })
    ).catch(
      err => this.setState({
        searchResults: [],
        shouldHaveSearchResults: false,
        searchError: err
      })
    );
  }

  detail(id) {
    const queryURL = API_URL + 'language/' + id;

    fetch(queryURL, {
      method: "GET"
    }).then(
      res => res.json()
    ).then(res => { // add the ID so we can use that to make keys
      res.id = id;
      return res
    }).then(
      res => this.setState({detailResults: res, detailError: false, tabIndex: 1})
    ).catch(
      err => this.setState({detailResults: false, detailError: err, tabIndex: 1})
    );
  }

  render () {
    const markersMapDataFn = function (d) {
      return {'position': [d.latitude || 0, d.longitude || 0], 'popupText': `${d.language_name} (${d.source})`}
    }

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
              <ErrorDialog err={this.state.searchError}/>
              {this.state.shouldHaveSearchResults ? <SearchResults value={this.state.searchResults} detailFn={this.detail}/> : ''}
            </div>
          </section>

          <section id="tabnav" className="col-sm">
            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
              <TabList>
                <Tab>Help</Tab>
                <Tab disabled={!this.state.detailResults}>Detail</Tab>
                <Tab disabled={!this.state.searchResults}>Map</Tab>
              </TabList>
              <TabPanel>
                <HelpText/>
              </TabPanel>
              <TabPanel>
                {
                  this.state.detailError ? <ErrorDialog err={this.state.detailError}/> 
                    : <DetailPanel language={this.state.detailResults} /> 
                }
              </TabPanel>
              <TabPanel>
                <MarkersMap dataFn={markersMapDataFn} data={this.state.searchResults} />
              </TabPanel>
            </Tabs>
          </section>
        </div>
      </main>
    );
  }
}

// ----------------
// -- Components --
// ----------------

function ErrorDialog(props) {
  if (!props.err) return (<div></div>);
  var errTxt = props.err.toString();

  // make sure there's only one Error: before the text
  if (!/[A-Za-z]*Error: /.test(errTxt)) errTxt = 'Error: ' + errTxt;
  if (/Error: Error:/.test(errTxt)) errTxt = errTxt.slice(7);
  return (
    <div className='error'>
      {errTxt}
    </div>
  );
}

function SearchResults(props) {
  if (props.value == false) return (<div>No results</div>);
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
        <button className='link-button' onClick={() => props.detailFn(props.language.id)}>
          {props.language.language_name}
        </button>
      </td>
      <td>
        <a href={"http://phoible.org/inventories/view/" + props.language.id}>
          {props.language.source.toUpperCase()}
        </a>  
      </td>
      <td>
        {props.language.phonemes ? props.language.phonemes.join(' ') : ''}
      </td>
    </tr>
  );
}

function DetailPanel(props) {
  const language = props.language;
  return (
  <div className='sticky-wrapper-wrapper'>
    <div className='sticky-wrapper'>
      <div className='sticky-panel'>
        <div>
          <h3>{ language.language_name } ({ language.source.toUpperCase() })</h3>
          <a href={ "https://phoible.org/inventories/view/" + language.id }>View on phoible.org</a>
          <div>Glottocode: <a href={"https://glottolog.org/resource/languoid/id/" + props.language.glottocode}>
              {props.language.glottocode}
            </a></div>
          <div>Family: { language.family || 'Isolate' } {language.genus ? '(' + language.genus + ')' : '' }</div>
        </div>
        <PhonemeMatrix name='Consonants' inv={ language.consonants } inv_id={ language.id } />
        <PhonemeMatrix name='Clicks' inv={ language.clicks } inv_id={ language.id } />
        <PhonemeMatrix name='Vowels' inv={ language.vowels } inv_id={ language.id } />
        <PhonemeMatrix name='Diphthongs' inv= { language.diphthongs } inv_id={ language.id } />
        <PhonemeArray name='Syllabic consonants' inv={ language.syllabic_consonants } inv_id={ language.id } />
        <PhonemeArray name='Tones' inv={ language.tones } inv_id={ language.id } />
      </div>
    </div>
  </div>);
}

function PhonemeMatrix(props) {
  const size = props.inv.size;
  if (size === 0) return (<div></div>);
  const contents = props.inv.contents;

  // TODO this is pretty hairy - there must be a better way!
  return (<div>
    <h4 className='language-segments'>{ props.name } ({ size })</h4>
    <table className='inventory'><tbody>
      {contents.map((y, i) => 
        <tr key={`${props.inv_id}-${i}`}>
          {y.map((x, j) => 
            <td key={`${props.inv_id}-${i}-${j}}`}>
              { x.join(' ') }
            </td>)}
        </tr>)}
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
