import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BASE_URL from "../../constraints/URL";
import "./DocProfile.css";

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

  function ratingStars(rate) {
    const emoji = "⭐";
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
          <div className="col col-sm-12 col-md-4">
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
              <a href="!#">Comments & Ratings</a>
            </div>
          </div>
          <div className="col col-sm-12 col-md-4 appointmentBtnDiv">
            <Link to="/newappointment">
              <button className="btn profileBtn">Schedule Appointment</button>
            </Link>
          </div>
        </div>
        <div className="row profileLinksDiv">
          <div className="col col-sm-12 col-md-4">
            <a href="!#">About</a>
          </div>
          <div className="col col-sm-12 col-md-4">
            <a href="!#">Ratings and Comments</a>
          </div>
          <div className="col col-sm-12 col-md-4">
            <a href="!#">Make an Appointment</a>
          </div>
        </div>
        <div className="row profileAboutDiv">
          <div className="col col-sm-12 col-md-4">
            Location and Contact Information
          </div>
          <div className="col col-sm-12 col-md-4">
            {docProfile.first_name} {docProfile.last_name}, MD
          </div>
          <div className="col col-sm-12 col-md-4">Make an Appointment</div>
        </div>
        <h4>Patient Ratings and Comments</h4>
        <div
          className="row"
          style={{ backgroundColor: "#D6DFC6" }}
        >
          {docProfile.comment?.length > 0 ? (
            docProfile.comment.map((card)=>
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
            )

          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default DoctorProfile;
