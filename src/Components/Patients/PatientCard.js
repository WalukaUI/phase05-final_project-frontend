import React from "react"
import "./PatientCard.css"

function PatientCard({card}){

    return(
        <div className="personsCard">
            <div>
                <p>First Name: {card.first_name}</p>
                <p>Last Name: {card.last_name}</p>
                <p>Clinic: {card.clinic_location}</p>
            </div>
            <div>
                <h6>Contact Details</h6>
                <p>Email: {card.email}</p>
                <p>Telephone Home/Mobile: {card.contact_number}</p>
            </div>

        </div>
    )
}

export default PatientCard