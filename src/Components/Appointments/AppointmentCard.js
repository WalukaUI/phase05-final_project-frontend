import React from "react";
import "./Appointments.css"

function AppointmentCard({card}){

    return(<div className=" row appointmentCard">
        <div className="col col-md-6 col-sm-12">
        <h4>Date: {card.date}</h4>
        <h6>Time: {card.time}</h6>
        </div>
        <div className="col col-md-6 col-sm-12">
        <button className="btn patientDetlsBtn">Patient Details</button>
        <button className="btn btn-danger cardDeleteBtn">Delete</button>
        </div>
        </div>
    )
}

export default AppointmentCard