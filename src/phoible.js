import React from 'react';

function SourceCell(props) {
  return (
    <a href={"http://phoible.org/inventories/view" + props.language.inventory_id}>
      {props.language.source.toUpperCase()}
    </a>
  );
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

function HelpText(props) {
  return (<div id='help'><h3>About</h3>

                    <p>This is a search tool for the Index Phonemica database.</p>

                    <h3>Searching</h3>

                    <p>A search query is minimally composed of a <em>search term</em>. There are two types of search term.</p>

                    <p>A <em>phoneme term</em> consists of a phoneme enclosed in forward slashes, optionally preceded by "no". This will find all doculects that have (or don't have, if there's a preceding "no") the given phoneme.</p>

                    <p>For example, <code>/t̪ʙ/</code> will return all doculects that contain the phoneme represented in Index Phonemica by the text string <code>t̪ʙ</code>, and <code>no /m/</code> will return all doculects that do not contain the phoneme represented in Index Phonemica by the text string <code>/m/</code>.</p>

                    <p>A <em>feature term</em> consists of a number (optionally preceded by a <code>&lt;</code> or <code>&gt;</code> sign), a space, and a string of pluses and minuses followed (with no intervening space) by the name of the feature to search. For example, <code>2 +coronal</code> will return all doculects with exactly two [+coronal] segments, and <code>&gt;30 +syllabic</code> will return all doculects with more than thirty vowels.</p>

                    <p>For the numeric component of the feature term, <code>no</code> can be used to mean <code>0</code>, and <code>any</code> can be used to mean <code>+0</code>.</p>

                    <p>To search for multiple feature values on the same phoneme, separate the feature components with a semicolon. For example, <code>any +syllabic;+consonantal</code> will return a list of doculects with syllabic consonants.</p>

                    <p>To ignore phonemes marked as marginal, use <code>-m</code> immediately following the search term in question. For example, <code>no /p/ -m /p/ and</code> will return all and only the doculects in which /p/ is marked as marginal.</p>

                    <p>Search terms may be joined by the logical operators <code>and</code> and <code>or</code>. These are postfix.</p>

                    <p>To limit the search to languages with specific properties, use <code>field:value</code>. To limit the search to languages without specific properties, use <code>!field:value</code>. Values are case-insensitive, and properties of languages are taken from <a href="https://glottolog.org">Glottolog</a>. For example, <code>country:australia</code> will return all doculects of languages that Glottolog lists as spoken in Australia. Spaces in the value must be replaced with underscores, as in <code>country:united_states</code>. See below for a full list of properties.</p>



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
                    <p>Index Phonemica's feature system is currently derived from <a href="https://phoible.org/">PHOIBLE</a>'s, but the names of the features have been converted from camelCase to snake_case, and 'raisedLarynxEjective' and 'loweredLarynxImplosive' have been renamed to <code>ejective</code> and <code>implosive</code>.</p><code>
                    <ul>
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
                      </li><li><code>macroarea</code> (eurasia, northamerica, southamerica, africa, australia, pacific)
                      </li><li><code>country_id</code>
                      </li><li><code>country</code></li>
                    </ul>
                </div>)
}

export { SourceCell, SourcePanel, HelpText }