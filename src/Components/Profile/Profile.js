import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css"

function Profile({ user, appointments, locations }) {

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
    let location = locations?.map((card) => card.id === id);
    return location ? location.name: "You have not selected any location"

  }

  return (
    <div className="profile">
      <div className="row profileDetails">
          <h5>Your Profile</h5>
          <hr/>
        <div className="col col-sm-12 col-md-5">
          <p><b>First Name:</b> {user.first_name}</p>
          <p><b>First Name:</b> {user.last_name}</p>
          <p><b>User name:</b> {user.username}</p>
          <p><b>Clinic Location:</b> {showUserClinicName(user.clinic_location)}</p>
        </div>
        <div className="col col-sm-12 col-md-5">
          <p><b>Contact Number:</b> {user.contact_number}</p>
          <p><b>Email Address:</b> {user.email}</p>
        </div>
        <div className="col col-sm-12 col-md-2 editProfileDiv">
        <button className="btn profileEditBtn">Edit profile</button>
        </div>
      </div>
      <hr />
      <div className="row profileAppointments">
          <h5>Appointments</h5>
        {showUserAppointments(user.id)}
        <Link to="/appointments">
            <button className="btn profileNewAppointmentBtn btn-info">Your Appointments</button>
          </Link>
      </div>
    </div>
  );
}

export default Profile;
