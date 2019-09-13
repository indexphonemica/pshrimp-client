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

export { SourceCell, SourcePanel }