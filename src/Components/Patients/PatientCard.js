import React, { useState } from "react";
import "./PatientCard.css";

function PatientCard({ card, deletePatient, editPatient }) {
  const [editPanel, setEditPanel] = useState(false);

  function handleDelete(e) {
    e.preventDefault();
    deletePatient(card.id);
  }

  function handelEdit(e) {
    e.preventDefault();
    setEditPanel(!editPanel);
  }

  function triggerEdit(e) {
    e.preventDefault();
    editPatient(card.id);
  }

  return editPanel ? (
    <div className="personsCard patientForm">
      <form>
        <div>
          <p>First Name</p>
          <input name="first_name" />
          <p>Last Name</p>
          <input name="last_name" />
          <p>Clinic</p>
          <input name="Clinic" />
        </div>
        <div>
          <h6>Contact Details</h6>
          <p>Email</p>
          <input name="first_name" />
          <p>Telephone</p>
          <input name="last_name" />
        </div>

        <br />
        <button className="btn btn-success" type="submit" onClick={triggerEdit}>
          Save
        </button>
        <button
        className="btn btn-warning"
        onClick={() => setEditPanel(!editPanel)}
      >
        Cancel
      </button>
      </form>
    </div>
  ) : (
    <div className="personsCard">
      <div>
        <button className="btn btn-primary" onClick={handelEdit}>
          Edit
        </button>
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
