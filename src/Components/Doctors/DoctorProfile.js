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
      <div className="profile">
        <div className="row profileTopDiv">
          <div className="col col-sm-12 col-md-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPPYSMvGn6iF_kZQs8YyU1jm4VczEPSx2Lpw&usqp=CAU"
            alt="doctor"
          />
          </div>
          <div className="col col-sm-12 col-md-4 aboutDoctor">
            <h5>{docProfile.first_name} {docProfile.last_name}</h5>
            <p>Speciality: {docProfile.speciality}</p>
            <div>
              <h6>Average Ratings</h6>
               <p>⭐⭐⭐⭐⭐</p>
               <a href="!#">Comments & Ratings</a>
            </div>
          </div>
          <div className="col col-sm-12 col-md-4 appointmentBtnDiv">
          <button className="btn profileBtn">Schedule Appointment</button>
          </div>
        </div>
        <div className="row profileLinksDiv">
          <div className="col col-sm-12 col-md-4"><a href="!#">About</a></div>
          <div className="col col-sm-12 col-md-4"><a href="!#">Ratings and Comments</a></div>
          <div className="col col-sm-12 col-md-4"><a href="!#">Make an Appointment</a></div>
        </div>
        <div className="row profileAboutDiv">
          <div className="col col-sm-12 col-md-4">Location and Contact Information</div>
          <div className="col col-sm-12 col-md-4">{docProfile.first_name} {docProfile.last_name}, MD</div>
          <div className="col col-sm-12 col-md-4">Make an Appointment</div>
        </div>
        <h4>Patient Ratings and Comments</h4>
      <div style={{backgroundColor: "#00586F", height: "100px"}}>Rating</div>
      <div style={{backgroundColor: "#00586F", height: "100px"}}>Comments</div>
      <div className="row profileCommentsDiv">
        <div className="col">L</div>
        <div className="col">she is ggod</div>
      </div>
      </div>
    </>
}

export default DoctorProfile;
