import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../constraints/URL";
import "./DoctorCard.css";

function Doctor({ user, card }) {
  const [comment, setComment] = useState(null);

  useEffect(() => {
    fetch(BASE_URL + `/doctors/${card.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setComment(data.comment);
        });
      }
    });
  }, [card.id]);

  function rating(array) {
    let points = [];
    if (array !== null) {
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
    <div>
      <Link to={`/doctors/${card.id}`}>
        <div className="row doctorCrad">
          <div className="col col-sm-12 col-md-4 docImagediv">
            <img
              src={card.image}
              alt="doctor"
              className="docImage"
            />
          </div>
          <div className="col col-sm-12 col-md-4">
            <h5>
              {card.first_name} {card.last_name}
            </h5>
            <p>{card.education}</p>
            <p>{card.speciality}</p>
          </div>
          <div className="col col-sm-12 col-md-4 doctorMoreDetails">
            <p>
              <img
                src="./contact.svg"
                alt="contact"
                style={{ paddingRight: "10px", width:"10%" }}
              />
              {card.email}
            </p>
            {card.isaccept_newpatients ? 
                        <p>
                        <img
                          src="./accept.svg"
                          alt="contact"
                          style={{ paddingRight: "10px", width:"10%" }}
                        />
                        Accept new Patients
                      </p>
          :""}
                      {card.video_vistits ? 
                        <p>
                        <img
                          src="./video.svg"
                          alt="contact"
                          style={{ paddingRight: "10px", width:"10%" }}
                        />
                        Accept video visits
                      </p>
          :""}
          </div>
        </div>
      </Link>
      <div className="row commentRow">
        <div className="col col-sm-12 col-md-6">
          <p>Ratings: {rating(comment)}</p>
          <p>{ratingStars(rating(comment))}</p>
        </div>
        <div className="col col-sm-12 col-md-6 commentRowDiv2">
          <Link to={user?"/newappointment":"/patientlogin"}>
            <button className="btn docCardBtn">Schedule an Appointment</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Doctor;
