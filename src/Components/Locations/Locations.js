import React, { useState } from "react";
import MyComponent from "./Map"
import "./Locations.css";

function Locations({ locations }) {
  const [searchTearm, setSearchTearm] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);

  //GoogleMap--------------------------------

  // function Map() {
  //   return (
  //     <GoogleMap
  //       defaultZoom={selectedPlace?17:10}
  //       defaultCenter={ selectedPlace ? {lat: selectedPlace.latitude, lng: selectedPlace.longitude} 
  //       :{lat: 38.63217176910362, lng: -90.19383204054196} }
  //     >
  //       {locations.map((card) => (
  //         <Marker
  //           key={card.id}
  //           position={{ lat: card.latitude, lng: card.longitude }}
  //           onClick={() => setSelectedPlace(card)}
  //           icon={{
  //             url: "/hospital logo.png",
  //             scaledSize: new window.google.maps.Size(25, 25),
  //           }}
           
  //         />
  //       ))}

  //       {selectedPlace && (
  //         <InfoWindow
  //           position={{
  //             lat: selectedPlace.latitude,
  //             lng: selectedPlace.longitude,
  //           }}
  //           onCloseClick={() => setSelectedPlace(null)}
  //         >
  //           <div style={{height: "70px"}}>
  //             <h6>{selectedPlace.name}</h6>
  //             <p>Clinic</p>
  //           </div>
  //         </InfoWindow>
  //       )}
  //     </GoogleMap>
  //   );
  // }

  // const WrappedMap = withScriptjs(withGoogleMap(Map));

  //supportive functions---------------------

  function activateSearch(e) {
    e.preventDefault();
    setSearchTearm(e.target.value);
  }

  return (
    <div>
      <div className="row locationDiv">
        <div className="col col-sm-12 col-md-6 mapDiv">
          <div>
          <MyComponent locations={locations} selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace}/>
          </div>
        </div>
        <div className="col col-sm-12 col-md-6 locationInnerDiv">
          <div className="serchLocation">
            <form>
              <input
                type="text"
                className="form-control"
                placeholder="Search Location by City Name"
                onChange={activateSearch}
              />
            </form>
          </div>
          {locations
            ? locations
                .filter((card) =>
                  card.name.toLowerCase().includes(searchTearm.toLowerCase())
                )
                .map((location) => (
                  <div key={location.id} onClick={()=>setSelectedPlace(location)} className="locationCard">
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
