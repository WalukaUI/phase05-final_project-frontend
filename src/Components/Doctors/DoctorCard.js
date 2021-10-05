import React from "react";
import { Link } from "react-router-dom";
import "./DoctorCard.css";

function Doctor({ card }) {
  return (
    <div>
      <Link to={`/doctors/${card.id}`} style={{ textDecoration: 'none' }}>
      <div className="row doctorCrad">
        <div className="col col-sm-12 col-md-4 docImage">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPPYSMvGn6iF_kZQs8YyU1jm4VczEPSx2Lpw&usqp=CAU"
            alt="doctor"
          />
        </div>
        <div className="col col-sm-12 col-md-4">
          <h5>
            {card.first_name} {card.last_name}
          </h5>
          <p>{card.speciality}</p>
          <p>Ratings</p>
        </div>
        <div className="col col-sm-12 col-md-4">
          <p>Location: {card.clinic_location}</p>
          <p>
            <img src="./contact.svg" alt="contact" />
            {card.contact_number}
          </p>
          <button className="btn cardBtn">Schedule Appointment</button>
        </div>
      </div>
      </Link>
    </div>
  );
}

export default Doctor;
