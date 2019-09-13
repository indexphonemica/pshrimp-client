import React from 'react';

function SourceCell(props) {
	return (
		<button className='link-button' onClick={() => props.detailFn(props.language.inventory_id)}>
			{props.language.inventory_id}		
		</button>
	);
}

function SourcePanel(props) {		
  // Note 'doculect' here - this is correct; the rest of the code is lacking zhengming (TODO)		
  const doculect = props.doculect;		
  // Format author list		
  // If there are multiple authors, use the format Lastname(, Lastname...) & Lastname.		
  // If there's only one author, use Lastname, Firstname.		
  const authors_arr = doculect.source_author.split(';');		
  const authors = (		
    (authors_arr.length > 1) ? 		
      (authors_arr.slice(0, authors_arr.length-1).map(x => x.split(',')[0]).join(', ') 		
        + ' & ' 		
        + authors_arr[authors_arr.length-1].split(',')[0])		
      : authors_arr[0])		
  const source_string = `${doculect.source_title}. ${authors}. ${doculect.source_year}`		
  const source_bibkey_url = `https://glottolog.org/resource/reference/id/${ doculect.source_bibkey }`		
  return (		
      <div>	
      	<h3> { doculect.name } </h3>	
        <p>		
          { source_string }		
        </p>		
        <p>		
          <a href={source_bibkey_url}>		
            {doculect.source_bibkey}		
          </a>		
          <a href={doculect.source_url}>		
            { doculect.source_url ? '🔗' : '' }		
          </a>		
        </p>		
      </div>		
  )		
}

export { SourceCell, SourcePanel }