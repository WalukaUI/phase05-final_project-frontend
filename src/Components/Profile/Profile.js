import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile({ user, appointments, locations, setUser }) {
  const [popup, setPopup] = useState(false);
  const [updateUserData,setUpdateUserData]=useState(null)

  //PATCH User-------------------------------

 function triggerEdit(e) {
  e.preventDefault();
  setPopup(!popup);
 }

  //show user appointments--------------------

  function showUserAppointments(id) {
    let appointment = appointments?.map((card) => card.patient_id === id);
    return appointment ? (
      <div>
        <p>
          {appointment.length > 1
            ? `You have ${appointment.length} appointments `
            : "You have 1 appointment"}
        </p>
      </div>
    ) : (
      <p>You do not have any appointments</p>
    );
  }

  //show users clinic location---------------

  function showUserClinicName(id) {
    let nn = [];
    locations.map((card) => (card.id == id ? nn.push(card.name) : null));
    return nn[0];
  }
  //Supportive Functions------------------------

  function triggerEditWindow(e) {
    e.preventDefault();
    setPopup(!popup);
  }

  return (
    <div className="profile">
      <div className="row profileDetails">
        <h5>Your Profile</h5>
        <hr />
        <div className="col col-sm-12 col-md-5">
          <p>
            <b>First Name:</b> {popup ?
            <input value={user.first_name} 
            name="first_name"
            />
            :user.first_name} 
          </p>
          <p>
            <b>First Name:</b> {popup ?<input  value={user.last_name} name="last_name"/>:user.last_name}
          </p>
          <p>
            <b>User name:</b> {popup ?<input  value={user.username} name="username"/>:user.username}
          </p>
          <p>
            <b>Clinic Location:</b> {popup ?<input />:showUserClinicName(user.clinic_location)}
          </p>
        </div>
        <div className="col col-sm-12 col-md-5">
          <p>
            <b>Contact Number:</b> {popup ?<input value={user.contact_number} name="contact_number"/>:user.contact_number}
          </p>
          <p>
            <b>Email Address:</b> {popup ?<input value={user.email} name="email"/>:user.email}
          </p>
        </div>
        <div className="col col-sm-12 col-md-2 editProfileDiv">
          <button className="btn profileEditBtn" onClick={popup ? triggerEdit:triggerEditWindow}>
            {popup ? "Save":"Edit profile"}
          </button>
        </div>
      </div>
      <hr />
      <div className="row profileAppointments">
        <h5>Appointments</h5>
        {showUserAppointments(user.id)}
        <Link to="/appointments">
          <button className="btn profileNewAppointmentBtn btn-info">
            Your Appointments
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
