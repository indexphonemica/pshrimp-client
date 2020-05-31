import React from 'react';

function SourceCell(props) {
  return (
    <a href={"http://phoible.org/inventories/view/" + props.language.inventory_id}>
      {props.language.source.toUpperCase()}
    </a>
  );
}

function SourceTableHead(props) {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Source</th>
        <th>Results</th>
      </tr>
    </thead>
  )
}

function SourcePanel(props) {
  const doculect = props.doculect;
  return (
    <div>
      <h3> { doculect.language_name } ({ doculect.source.toUpperCase() }) </h3>
      <a href={ "https://phoible.org/inventories/view/" + doculect.id }>View on phoible.org</a>
      <div>
        Glottocode: <a href={"https://glottolog.org/resource/languoid/id/" + doculect.glottocode}>
          {doculect.glottocode}
        </a>
      </div>
      <div>
        Family: { doculect.family || 'Isolate' } {doculect.genus ? '(' + doculect.genus + ')' : '' }
      </div>
    </div>
  );
}

function AllophonicRulePanel(props) {
  const rules = props.rules;

  if (rules.length === 0) return (<div></div>);

  return (<div>
      <h4>Allophones</h4>
      <table key={JSON.stringify(rules)}>
      <thead>
        <tr>
          <th>Phoneme</th>
          <th>Allophones</th>
        </tr>
      </thead>
      <tbody>
        { rules.map(rule => <AllophonicRule key={JSON.stringify(rule)} rule={rule} />) }
      </tbody>
    </table>
  </div>)
}
function AllophonicRule(props) {
  const phoneme = props.rule[0];
  const allophones = props.rule[1];

  return (
    <tr>
      <td>{ phoneme }</td>
      <td>{ allophones.join(', ') }</td>
    </tr>
  )
}

function HelpText(props) {
  return (<div id='help'><h3>About</h3>

                    <p>This is an unofficial search tool for <a href="https://phoible.org/">PHOIBLE</a>.</p>

                    <h3>Searching</h3>

                    <p>A search query is minimally composed of a <em>search term</em>. There are four types of search term.</p>

                    <p>A <em>phoneme term</em> consists of a phoneme enclosed in forward slashes, optionally preceded by "no". This will find all doculects that have (or don't have, if there's a preceding "no") the given phoneme.</p>

                    <p>For example, <code>/t̪ʙ/</code> will return all doculects that contain the phoneme represented in PHOIBLE by the text string <code>t̪ʙ</code>, and <code>no /m/</code> will return all doculects that do not contain the phoneme represented in PHOIBLE by the text string <code>/m/</code>.</p>

                    <p>A <em>feature term</em> consists of a number (optionally preceded by a <code>&lt;</code> or <code>&gt;</code> sign), a space, and a string of pluses and minuses followed (with no intervening space) by the name of the feature to search. For example, <code>2 +coronal</code> will return all doculects with exactly two [+coronal] segments, and <code>&gt;30 +syllabic</code> will return all doculects with more than thirty vowels.</p>

                    <p>For the numeric component of the feature term, <code>no</code> can be used to mean <code>0</code>, and <code>any</code> can be used to mean <code>+0</code>.</p>

                    <p>To search for multiple feature values on the same phoneme, separate the feature components with a semicolon. For example, <code>any +syllabic;+consonantal</code> will return a list of doculects with syllabic consonants.</p>

                    <p>To ignore phonemes marked as marginal, use <code>-m</code> immediately following the search term in question. For example, <code>no /p/ -m /p/ and</code> will return all and only the doculects in which /p/ is marked as marginal.</p>

                    <p>A <em>property term</em> searches for languages with specific properties, and are of the form <code>field:value</code>. To limit the search to languages without specific properties, use <code>!field:value</code>. Values are case-insensitive. For example, <code>country:australia</code> will return all doculects of languages that PHOIBLE lists as spoken in Australia. Spaces in the value must be replaced with underscores, as in <code>country:united_states</code>. See below for a full list of properties.</p>

                    <p>An <em>allophone term</em> searches allophonic rules. Allophone terms consist of a phoneme or feature bundle followed by a <code>&gt;</code> and a phoneme. (Both phonemes must be enclosed in slashes.) For example, <code>/t/ > /ɾ/</code> finds doculects in which /ɾ/ is listed as an allophone of /t/, and <code>+coronal > /ɾ/</code> finds doculects in which /ɾ/ is listed as an allophone of any coronal segment. (Feature bundles can only appear in the left-hand side of an allophone term.)</p>

                    <p>Search terms may be joined by the logical operators <code>and</code> and <code>or</code>. These are postfix.</p>

                    <h3>Examples</h3>

                    <p className='example-text'>Find doculects with only two coronals:</p>
                    <code className='example'>2 +coronal</code>
                    <p className='example-text'>Find doculects with three or fewer vowels:</p>
                    <code className='example'>&lt;4 +syllabic</code>
                    <p className='example-text'>Find doculects with three or fewer vowels or the phoneme /d/:</p>
                    <code className='example'>&lt;4 +syllabic /d/ or</code>
                    <p className='example-text'>Find doculects with no rounded segments:</p>
                    <code className='example'>no +round</code>
                    <p className='example-text'>Find doculects with /d/ and no /m/:</p>
                    <code className='example'>/d/ no /m/ and</code>

                    <h3>List of features</h3>
                    <p>The names of PHOIBLE's features have been cconverted from camelCase to snake_case, and 'raisedLarynxEjective' and 'loweredLarynxImplosive' have been renamed to <code>ejective</code> and <code>implosive</code>.</p>
                    <code><ul>
                        <li>tone
                        </li><li>stress
                        </li><li>syllabic
                        </li><li>short
                        </li><li>long
                        </li><li>consonantal
                        </li><li>sonorant
                        </li><li>continuant
                        </li><li>delayed_release
                        </li><li>approximant
                        </li><li>tap
                        </li><li>trill
                        </li><li>nasal
                        </li><li>lateral
                        </li><li>labial
                        </li><li>round
                        </li><li>labiodental
                        </li><li>coronal
                        </li><li>anterior
                        </li><li>distributed
                        </li><li>strident
                        </li><li>dorsal
                        </li><li>high
                        </li><li>low
                        </li><li>front
                        </li><li>back
                        </li><li>tense
                        </li><li>retracted_tongue_root
                        </li><li>advanced_tongue_root
                        </li><li>periodic_glottal_source
                        </li><li>epilaryngeal_source
                        </li><li>spread_glottis
                        </li><li>constricted_glottis
                        </li><li>fortis
                        </li><li>ejective
                        </li><li>implosive
                        </li><li>click</li>
                    </ul></code>

                    <h3>List of properties</h3>
                    <ul>
                      <li><code>id</code>
                      </li><li><code>source</code>
                      </li><li><code>glottocode</code>
                      </li><li><code>iso6393</code>
                      </li><li><code>language_name</code>
                      </li><li><code>family</code>
                      </li><li><code>genus</code>
                      </li><li><code>country_id</code>
                      </li><li><code>country</code></li>
                    </ul>
                </div>)
}

export { SourceCell, SourcePanel, SourceTableHead, AllophonicRulePanel, HelpText }