import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BASE_URL from "../../constraints/URL";
import "./DocProfile.css";

function DoctorProfile() {
  const [docProfile, setDocProfile] = useState([]);
  const [docLocations, setDocLocation] = useState([]);
  const params = useParams();

  //-----------------GET Doctor----------------

  useEffect(() => {
    fetch(BASE_URL + `/doctors/${params.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => setDocProfile(data));
  }, [params.id]);

  //------------------GET Locations-------------

  useEffect(() => {
    fetch(BASE_URL + `/doctors/${params.id}/locations`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => setDocLocation(data));
  }, [params.id]);

  //---------------Rating calculator------------

  function rating(array) {
    let points = [];
    if (array?.length > 0) {
      array.forEach((e) => points.push(e.points));
      let pointSum = points.reduce((a, b) => a + b, 0);
      let pointaverage = (pointSum / points.length).toFixed(2);
      let roundNum = Math.floor(pointaverage);
      return roundNum;
    } else {
      return "N/A";
    }
  }

  //-------------------emoji--------------------
  function ratingStars(rate) {
    let emoji = "⭐";
    let emojis = "";
    for (let i = 0; i < rate; i++) {
      emojis += emoji;
    }
    return emojis;
  }

  return (
    <>
      <div className="profile row">
        <div className="row profileTopDiv">
          <div className="col col-sm-12 col-md-4 imageContainer">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPPYSMvGn6iF_kZQs8YyU1jm4VczEPSx2Lpw&usqp=CAU"
              alt="doctor"
            />
          </div>
          <div className="col col-sm-12 col-md-4 aboutDoctor">
            <h5>
              {docProfile.first_name} {docProfile.last_name}
            </h5>
            <p>Speciality: {docProfile.speciality}</p>
            <div>
              <h6>Average Ratings: {rating(docProfile.comment)}</h6>
              <p>{ratingStars(rating(docProfile.comment))}</p>
              <a href="#patientRatings">Comments & Ratings</a>
            </div>
          </div>
          <div className="col col-sm-12 col-md-4 appointmentBtnDiv">
            <Link to="/newappointment">
              <button className="btn profileBtn">
                Schedule an Appointment
              </button>
            </Link>
          </div>
        </div>
        <div className="row profileLinksDiv">
          <div className="col col-sm-12 col-md-6">
            <a href="#about">About</a>
          </div>
          <div className="col col-sm-12 col-md-6">
            <a href="#patientRatings">Ratings and Comments</a>
          </div>
        </div>
        <div className="row profileAboutDiv" id="about">
          <h5>Location and Contact Information</h5>
          <hr />

          {docLocations?.length > 0
            ? docLocations.map((location) => (
                <div className="row docAddressContactInfo">
                  <div className="col col-sm-12 col-md-4">
                    <p><b>{location.name}</b></p>
                    <p>{location.address_line_one}</p>
                    <p>{location.address_line_two}</p>
                    <p>{location.city}</p>
                    <p>{location.zipcode}</p>
                  </div>
                  <div className="col col-sm-12 col-md-4">
                    <div className="telephoneNum">
                    <img src="/telephone.svg" alt="call"/><p>{location.contact_number}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="col col-sm-12 col-md-4"></div>
                </div>
              ))
            : <p>N/A</p>}
        </div>
        <div className="row" style={{ backgroundColor: "#D6DFC6" }}>
          <h5 id="patientRatings">Patient Ratings and Comments</h5>
          <hr />
          {docProfile.comment?.length > 0
            ? docProfile.comment.map((card) => (
                <div>
                  <div>
                    <h6>Rating</h6>
                    <p>{ratingStars(card.points)}</p>
                  </div>
                  <div>
                    <h6>Comments</h6>
                    <p>{card.comment}</p>
                  </div>
                </div>
              ))
            : <p>N/A</p>}
        </div>
      </div>
    </>
  );
}

export default DoctorProfile;
