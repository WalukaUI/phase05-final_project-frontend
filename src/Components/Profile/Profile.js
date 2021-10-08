import React from "react";
import { Link } from "react-router-dom";

function Profile({ user, appointments }) {
  function showUserAppointments(id) {
    let appointment = appointments?.map((card) => card.patient_id === id);
    //return appointment ? appointment.length : "N/A"
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

  return (
    <div>
      <div className="row">
        <div className="col col-sm-12 col-md-6">
          <p>First Name: {user.first_name}</p>
          <p>First Name: {user.last_name}</p>
          <p>User name: {user.username}</p>
          <p>Clinic Location: {user.clinic_location}</p>
        </div>
        <div className="col col-sm-12 col-md-6">
          <p>Contact Number: {user.contact_number}</p>
          <p>Email Address: {user.email}</p>
        </div>
      </div>
      <div className="row">
          <h6>Appointments</h6>
        {showUserAppointments(user.id)}
        <Link to="/newappointment">
            <button className="btn profileNewAppointment">Schedule an Appointment</button>
          </Link>
      </div>
    </div>
  );
}

export default Profile;
