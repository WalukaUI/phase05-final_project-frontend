import React, { useEffect, useState } from "react";
import BASE_URL from "../../constraints/URL";
import "./Locations.css"

function Locations() {
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    fetch(BASE_URL + "/locations", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => setLocations(data));
  }, []);

  return (
    <div>
      <div className="row locationDiv">
        <div className="col col-sm-12 col-md-6 mapDiv">
          <div>
            <h3>google Map</h3>
          </div>
        </div>
        <div className="col col-sm-12 col-md-6 locationInnerDiv">
        
          {locations
            ? locations.map((location) => (
                <div>
               <div className="row locationDetails">
                  <div  className="col col-sm-6 col-md-4 locationImage">
                    <img src="https://icon-library.com/images/image-icon/image-icon-16.jpg" />
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
