import React, { useState } from "react";
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
//   InfoWindow
// } from "react-google-maps";
import "./Locations.css";
import Gmap from "./Map"


//GoogleMap--------------------------------
// function Map() {
//   const[selectedPlace,setSelectedPlace]=useState(null)

//   const locate=[{latitude: 38.713894216893614, longitude: -90.30208583616161},
//     {latitude: 38.67118615958442,longitude: -90.21846271745149}]
//   return (
//     <GoogleMap
//       defaultZoom={10}
//       defaultCenter={{ lat: 38.63217176910362, lng: -90.19383204054196 }}
//     >
//       {locate.map((card)=> 
      
//       <Marker
//       onClick={()=>
//         setSelectedPlace(card)}
//       key={card.id} 
//       icon={{url:'/hospital logo.png',
//       scaledSize: new window.google.maps.Size(25,25)
//     }}
//       position={{lat: card.latitude,lng: card.longitude }}/>)}

//       {selectedPlace && (<InfoWindow
//       position={{lat: selectedPlace.latitude,lng: selectedPlace.longitude }}
//       onCloseClick={()=>setSelectedPlace(null)}
//       >
//         <div>
//           <h6>Location Name</h6>
//           <p>Clinic</p></div>
//       </InfoWindow>)}
//     </GoogleMap>
//   );
// }

// const WrappedMap = withScriptjs(withGoogleMap(Map));


function Locations({ locations }) {
  const [searchTearm, setSearchTearm] = useState("");


  //supportive functions---------------------
  function activeSearch(e) {
    e.preventDefault();
    setSearchTearm(e.target.value);
  }

  return (
    <div>
      <div className="row locationDiv">
        <div className="col col-sm-12 col-md-6 mapDiv">
          <div>
            {/* <WrappedMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
              loadingElement={<div style={{ height: "100%" }} />}
              containerElement={<div style={{ height: "400px" }} />}
              mapElement={<div style={{ height: "100%" }} />}
            /> */}
             <Gmap />
          </div>
        </div>
        <div className="col col-sm-12 col-md-6 locationInnerDiv">
          <div className="serchLocation">
            <form>
              <input
                type="text"
                className="form-control"
                placeholder="Search Location by City Name"
                onChange={activeSearch}
              />
            </form>
          </div>
          {locations
            ? locations
                .filter((card) =>
                  card.name.toLowerCase().includes(searchTearm.toLowerCase())
                )
                .map((location) => (
                  <div key={location.id}>
                    <div className="row locationDetails">
                      <div className="col col-sm-6 col-md-4 locationImage">
                        <img
                          src="https://icon-library.com/images/image-icon/image-icon-16.jpg"
                          alt="location"
                        />
                        <div className="vl"></div>
                      </div>
                      <div className="col col-sm-12 col-md-4 locationAddress">
                        <h6>{location.name}</h6>
                        <p>{location.address_line_one}</p>
                        <p>{location.address_line_two}</p>
                        <span>{location.city} ,</span>
                        <span>{location.zipcode}</span>
                      </div>
                      <div className="col col-sm-12 col-md-4 locationContactDetls">
                        <p>Tel. : {location.contact_number}</p>
                      </div>
                    </div>
                  </div>
                ))
            : ""}
        </div>
      </div>
    </div>
  );
}

export default Locations;
