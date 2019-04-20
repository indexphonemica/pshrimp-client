import React from 'react';

function HelpText(props) {
	return (<div id='help'><h3>About</h3>

                    <p>This is an unofficial search frontend for PHOIBLE.</p>

                    <h3>Searching</h3>

                    <p>A search query is minimally composed of a <em>search term</em>. There are two types of search term.</p>

                    <p>A <em>phoneme term</em> consists of a phoneme enclosed in forward slashes, optionally preceded by "no". This will find all doculects that have (or don't have, if there's a preceding "no") the given phoneme.</p>

                    <p>For example, <code>/t̪ʙ/</code> will return all doculects that contain the phoneme represented in PHOIBLE by the text string <code>t̪ʙ</code>, and <code>no /m/</code> will return all doculects that do not contain the phoneme represented in PHOIBLE by the text string <code>/m/</code>.</p>

                    <p>A <em>feature term</em> consists of a number (optionally preceded by a <code>&lt;</code> or <code>&gt;</code> sign), a space, and a string of pluses and minuses followed (with no intervening space) by the name of the feature to search. For example, <code>2 +coronal</code> will return all doculects with exactly two [+coronal] segments, and <code>&gt;30 +syllabic</code> will return all doculects with more than thirty vowels.</p>

                    <p>For the numeric component of the feature term, <code>no</code> can be used to mean <code>0</code>, and <code>any</code> can be used to mean <code>+0</code>.</p>

                    <p>To search for multiple feature values on the same phoneme, separate the feature components with a semicolon. For example, <code>any +syllabic;+consonantal</code> will return a list of doculects with syllabic consonants.</p>

                    <p>Search terms may be joined by the logical operators <code>and</code> and <code>or</code>. These are postfix.</p>

                    <h3>Examples</h3>

                    <p className='example-text'>Find doculects with only two coronal consonants:</p>
                    <code className='example'>2 +coronal<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;HAWAIIAN<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;PIRAHA<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;ROTOKAS<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;Pirahã</code>
                    <p className='example-text'>Find doculects with two or fewer vowels:</p>
                    <code className='example'>&lt;3 +syllabic<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;zulgo<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;Cuvok<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;Buwal</code>
                    <p className='example-text'>Find doculects with two or fewer vowels or the phoneme /ʰd/:</p>
                    <code className='example'>&lt;3 +syllabic /ʰd/ or<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;zulgo<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;Cuvok<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;Buwal<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;Günün Yajich<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;Hoti</code>
                    <p className='example-text'>Find doculects with no rounded segments:</p>
                    <code className='example'>no +round<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;Oneida<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;NIMBORAN<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;Gu'de</code>
                    <p className='example-text'>Find doculects with /ʰd/ and no /m/:</p>
                    <code className='example'>/ʰd/ no /m/ and<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;Hoti</code>

                    <h3>List of features</h3>
                    <p>These are taken directly from PHOIBLE's featural decomposition, except the names of the features have been converted from camelCase to snake_case and 'raisedLarynxEjective' and 'loweredLarynxImplosive' have been renamed to <code>ejective</code> and <code>implosive</code>.</p><code>
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
                </div>)
}

export {HelpText};