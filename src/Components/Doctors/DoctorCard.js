import React from "react";
import "./DoctorCard.css";

function Doctor({ card }) {
  return <div>
      <div className="row">
      <h1>{card.email}</h1>
        <p>{card.last_name}</p>
      </div>
    </div>

}

export default Doctor;
