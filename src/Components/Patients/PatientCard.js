import React from "react";
import "./PatientCard.css";

function PatientCard({ card, deletePatient }) {
  function handleDelete(e) {
    e.preventDefault();
    deletePatient(card.id)
  }

  return (
    <div className="personsCard">
      <div>
        <button className="btn btn-primary">Edit</button>
        <button className="btn btn-info">More...</button>
        <p>First Name: {card.first_name}</p>
        <p>Last Name: {card.last_name}</p>
        <p>Clinic: {card.clinic_location}</p>
      </div>
      <div>
        <h6>Contact Details</h6>
        <p>Email: {card.email}</p>
        <p>Telephone Home/Mobile: {card.contact_number}</p>
      </div>

      <br />
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default PatientCard;
