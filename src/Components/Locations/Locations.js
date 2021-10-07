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
      <div className="row">
        <div className="col col-sm-12 col-md-6">
          <div>
            <h3>google Map</h3>
          </div>
        </div>
        <div className="col col-sm-12 col-md-6">
        
          {locations
            ? locations.map((location) => (
                <div>
               <div className="row locationDetails">
                  <div  className="col col-sm-6 col-md-6 div1">
                    <img src="https://icon-library.com/images/image-icon/image-icon-16.jpg" />
                  </div>
                  <div  className="col col-sm-12 col-md-6 div2">
                    <h6>{location.name}</h6>
                    <p>{location.address_line_one}</p>
                    <p>{location.address_line_two}</p>
                    <p>{location.city}</p>
                    <p>{location.zipcode}</p>
                    <p>{location.contact_number}</p>
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
