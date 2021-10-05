import React from "react";
import "./DoctorCard.css"

function Doctor({doctors}){

    return (
    <div>
        {doctors.map((card)=>
        <div className="row">
          <div className="col">

          </div>
          <div className="col">
            <h4>{card.firsname} {card.lastname}</h4>
            <p>card displaying</p>
         </div>
        </div>)}
    </div>
    )
}

export default Doctor