import React from "react";
import "./DoctorCard.css";

function Doctor({ card }) {
  return <div>
      <div className="row doctorCrad">
        <div className="col col-sm-12 col-md-4 docImage">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPPYSMvGn6iF_kZQs8YyU1jm4VczEPSx2Lpw&usqp=CAU" alt="doctor"/>
        </div>
        <div className="col col-sm-12 col-md-4" >
          <h6>{card.first_name} {card.last_name}</h6>
          <p>{card.speciality}</p>
          
        </div>
        <div className="col col-sm-12 col-md-4">
        <p>Location: {card.clinic_location}</p>
        <p><img src="./contact"alt="contact"/>{card.contact_number}</p>
        </div>  
      </div>
    </div>

}

export default Doctor;
