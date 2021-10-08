import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../constraints/URL";
import "./DoctorCard.css";

function Doctor({ card }) {
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
      <div className="row doctorCrad">
      <Link to={`/doctors/${card.id}`}>
      </Link>
        <div className="col col-sm-12 col-md-4 docImagediv">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPPYSMvGn6iF_kZQs8YyU1jm4VczEPSx2Lpw&usqp=CAU"
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
              style={{ paddingRight: "10px" }}
            />
            {card.email}
          </p>
          <Link to={`/doctors/${card.id}`}>
            <button className="btn btn-outline-primary">See more ...</button>
          </Link>

        </div>
      </div>
      <div className="row commentRow">
        <div className="col col-sm-12 col-md-6">
        <p>Ratings: {rating(comment)}</p>
          <p>{ratingStars(rating(comment))}</p>
        </div>
        <div className="col col-sm-12 col-md-6">
        <Link to="/newappointment">
            <button className="btn docCardBtn">Schedule Appointment</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Doctor;
