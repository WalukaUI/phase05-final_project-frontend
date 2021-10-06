import React from "react";
import "./Appointments.css"

function AppointmentCard({card}){

    return(<div className="appointmentCard">
        <h4>Date: {card.date}</h4>
        <h6>Time: {card.time}</h6>
        </div>
    )
}

export default AppointmentCard