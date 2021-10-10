import React, { useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import "./Locations.css";


//GoogleMap--------------------------------
function Map() {
  const[selectedPlace,setSelectedPlace]=useState(null)

  const locate=[{latitude: 38.713894216893614, longitude: -90.30208583616161},
    {latitude: 38.67118615958442,longitude: -90.21846271745149}]
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 38.63217176910362, lng: -90.19383204054196 }}
    >
      {locate.map((card)=> 
      
      <Marker
      onClick={()=>
        setSelectedPlace(card)}
      key={card.id} 
      icon={{url:'/hospital logo.png',
      scaledSize: new window.google.maps.Size(25,25)
    }}
      position={{lat: card.latitude,lng: card.longitude }}/>)}

      {selectedPlace && (<InfoWindow
      position={{lat: selectedPlace.latitude,lng: selectedPlace.longitude }}
      onCloseClick={()=>setSelectedPlace(null)}
      >
        <div>
          <h6>Location Name</h6>
          <p>Clinic</p></div>
      </InfoWindow>)}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map()));


export default function Gmap() {
  return (
    <div style={{height: "500px", width: "600px"}}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_GOOGLE_KEY
        }`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}