import React, { useEffect } from "react";

function UserLocation({getAddress,setAddress}) {


   useEffect(() => {
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, handleLocationError);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    
      async function showPosition(pars) {

          let latitude= pars.coords.latitude
          let longitude= pars.coords.longitude
       
        await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false&key=${process.env.REACT_APP_GOOGLE_KEY}`)
          .then((res) => res.json())
          .then((data) => setAddress(data.results[0].formatted_address));
      }
    
  }, []);



  function handleLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("An error occurred");
    }
  }

  return getAddress? <p>Searching from {getAddress} </p>: <p></p>
}

export default UserLocation;
