import React from "react";
import { useState } from "react/cjs/react.development";
import "./Appointments.css"

function AppointmentCard({card, deleteAppointment, editAppointment}){
    const[updatedAppointment,setUpdatedAppointment]=useState({})

    function handleDelete(e){
        e.preventDefault()
        deleteAppointment(card.id)
    }

    function handleChange(e) {
        e.preventDefault()
       
    }

    function handleEdit(e) {
        e.preventDefault()
        editAppointment(card)
    }

    return(<div className=" row appointmentCard">
        <div className="col col-md-6 col-sm-12">
        <h4>Date: {card.date}</h4>
        <h6>Time: {card.time}</h6>
        </div>
        <div className="col col-md-6 col-sm-12">
        <button className="btn patientDetlsBtn">Change Appointment</button>
        <button className="btn btn-danger cardDeleteBtn" onClick={handleDelete}>Delete</button>
        </div>
        </div>
    )
}

export default AppointmentCard