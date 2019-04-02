import React from 'react';
import 'leaflet/dist/leaflet.css';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

// fix react-leaflet markers - see https://github.com/PaulLeCam/react-leaflet/issues/453#issuecomment-410450387
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

function MarkerWithPopup(props) {
  const popupText = props.popupText;
  const position = props.position;

  if (popupText) {
    return (
      <Marker position={position}>
        <Popup>
          {popupText}
        </Popup>
      </Marker>
    ) 
  }

  return <Marker position={position}/>
}

function MarkersMap(props) {
  const center = [0,0];
  const zoom = 1;

  // dataFunc should return {position: [lat, long], popupText: 'foo'}
  const markerData = props.data.map(d => props.dataFn(d));

  const markers = markerData.map(m => <MarkerWithPopup position={m.position} popupText={m.popupText} />);

  return (
    <LeafletMap center={[0,0]} zoom='1'>
      <TileLayer
        attribution='Thunderforest'
        url='https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=7ee1e377fdd34773b610a69bd8e96e6f'
      />
      {markers}
    </LeafletMap>
  );
}

export {MarkersMap};