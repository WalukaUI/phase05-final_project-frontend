import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../../constraints/URL";
import "./DocProfile.css"

function DoctorProfile() {
  const [docProfile, setDocProfile] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetch(BASE_URL + `/doctors/${params.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => setDocProfile(data));
  }, [params.id]);

  return <>
      <div>
        <div className="row profileTopDiv">
          <div className="col col-sm-12 col-md-4"></div>
          <div className="col col-sm-12 col-md-8"></div>
        </div>
        <div className="row proLinksDiv">
          <div className="col col-sm-12 col-md-4">About</div>
          <div className="col col-sm-12 col-md-4">Ratings and Comments {docProfile.first_name}</div>
          <div className="col col-sm-12 col-md-4">Make an Appointment</div>
        </div>
        <div className="row profileAboutDiv">
          <div className="col col-sm-12 col-md-4">Location and Contact Information</div>
          <div className="col col-sm-12 col-md-4">{docProfile.first_name} {docProfile.last_name}, MD</div>
          <div className="col col-sm-12 col-md-4">Make an Appointment</div>
        </div>
      </div>
      <h4>Patient Ratings and Comments</h4>
      <div style={{backgroundColor: "#00586F", height: "100px"}}>Rating</div>
      <div style={{backgroundColor: "#00586F", height: "100px"}}>Comments</div>
      <div className="row profileCommentsDiv">
        <div className="col">L</div>
        <div className="col">she is ggod</div>
      </div>
    </>
}

export default DoctorProfile;
