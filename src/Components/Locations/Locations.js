import React, { useState } from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps"
import "./Locations.css"

function Locations({locations}) {
  const[searchTearm,setSearchTearm]=useState("")

  //GoogleMap--------------------------------

  function Maps() {
    return(
      <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lng: -90.19383204054196, lat: 38.63217176910362 }} 
    />
    )
  }

  const Mapwrapper = withScriptjs(withGoogleMap(Maps));



  //supportive functions---------------------
  function activeSearch(e) {
    e.preventDefault()
    setSearchTearm(e.target.value)
  }

  return (
    <div>
      <div className="row locationDiv">
        <div className="col col-sm-12 col-md-6 mapDiv">
          <div>
          
            <Mapwrapper 
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
              process.env.REACT_APP_GOOGLE_KEY
            }`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            />


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
            ? locations.filter((card)=>card.name.toLowerCase().includes(searchTearm.toLowerCase()))
            .map((location) => (
                <div key={location.id}>
               <div className="row locationDetails">
                  <div  className="col col-sm-6 col-md-4 locationImage">
                    <img src="https://icon-library.com/images/image-icon/image-icon-16.jpg" alt="location"/>
                    <div className="vl"></div>
                  </div>
                  <div  className="col col-sm-12 col-md-4 locationAddress">
                    <h6>{location.name}</h6>
                    <p>{location.address_line_one}</p>
                    <p>{location.address_line_two}</p>
                    <span>{location.city} ,</span>
                    <span>{location.zipcode}</span>
                  </div>
                  <div  className="col col-sm-12 col-md-4 locationContactDetls">
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
