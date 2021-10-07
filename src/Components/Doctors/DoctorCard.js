import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../constraints/URL";
import "./DoctorCard.css";

function Doctor({ card }) {
  const[comment,setComment]=useState(null)

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
  }, []);

  function rating(array){
    // e.preventDefault()
    let points=[]
    if(array !== null){
      array.forEach(e =>points.push(e.points))
      let pointSum= points.reduce((a,b)=> a+b,0)
      let pointaverage=pointSum/points.length
      return pointaverage
    }else{
      return "N/A"
    }
  }
    
  

  return (
    <div>
     
      <div className="row doctorCrad">
        <div className="col col-sm-12 col-md-4 docImage">
        <Link to={`/doctors/${card.id}`} style={{ textDecoration: 'none' }}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPPYSMvGn6iF_kZQs8YyU1jm4VczEPSx2Lpw&usqp=CAU"
            alt="doctor"
          />
           </Link>
        </div>
        <div className="col col-sm-12 col-md-4">
          <h5>
            {card.first_name} {card.last_name}
          </h5>
          <p>{card.speciality}</p>
          <p>Ratings: {rating(comment)}</p>
        </div>
        <div className="col col-sm-12 col-md-4">
          <p>Location: {card.clinic_location}</p>
          <p>
            <img src="./contact.svg" alt="contact" />
            {card.contact_number}
          </p>
          <Link to="/newappointment"><button className="btn docCardBtn">Schedule Appointment</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Doctor;
