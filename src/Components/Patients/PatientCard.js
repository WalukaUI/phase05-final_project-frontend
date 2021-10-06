import React, { useState } from "react";
import "./PatientCard.css";

function PatientCard({ card, deletePatient, updatePatient, editBtn, setEditBtn }) {
 const [editPanel, setEditPanel] = useState(false);
 const [updateData, setUpdateData] = useState(null);

  function handleDelete(e) {
    e.preventDefault();
    deletePatient(card.id);
  }

  function handelEdit(e) {
    e.preventDefault();
    setEditBtn(!editBtn)
    setUpdateData(card)
    setEditPanel(!editPanel);
  }
  function handleCancel(e){
    e.preventDefault();
    setEditBtn(!editBtn)
    setEditPanel(!editPanel)
  }
  function triggerEdit(e) {
    e.preventDefault();
    updatePatient(updateData, card.id);
    setEditBtn(!editBtn)
    setEditPanel(!editPanel)
  }

  function handleChangeData(e) {
    e.preventDefault();
    let newData = { ...updateData, [e.target.name]: e.target.value };
    setUpdateData(newData);
  }

  const editPatient = updateData;
  

  return editPanel ? (
    <div className="personsCard patientForm">
      <form>
        <div>
          <p>First Name</p>
          <input name="first_name" value={editPatient.first_name} onChange={handleChangeData}/>
          <p>Last Name</p>
          <input name="last_name"  value={editPatient.last_name} onChange={handleChangeData}/>
          <p>Clinic</p>
          <input name="clinic_location" value={editPatient.clinic_location} onChange={handleChangeData}/>
        </div>
        <div>
          <h6>Contact Details</h6>
          <p>Email</p>
          <input name="email" value={editPatient.email} onChange={handleChangeData}/>
          <p>Telephone</p>
          <input name="contact_number" value={editPatient.contact_number} onChange={handleChangeData}/>
        </div>

        <br />
        <button className="btn btn-success" type="submit" onClick={triggerEdit} >
          Save
        </button>
        <button
        className="btn btn-warning"
        onClick={handleCancel}
      >
        Cancel
      </button>
      </form>
    </div>
  ) : (
    <div className="personsCard">
      <div>{editBtn === false ?
              <button className="btn btn-primary" onClick={handelEdit}>
              Edit
            </button>
      :""}

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
