import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NewAppointment.css";
import BASE_URL from "../../constraints/URL";

function NewAppiontment({ doctors, user }) {
  const [newAppointment, setNewAppointment] = useState({});
  const [errors, setErrors] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(BASE_URL + `/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newAppointment),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {});
      } else {
        res.json().then((err) => {
          setErrors(err.error);
        });
      }
    });
  }

  function handleNewAppointment(e) {
    e.preventDefault();
    let newBooking = { ...newAppointment, [e.target.name]: e.target.value };
    let newAppointmentData={...newBooking, "patient_id": user.id, "status": "open"}
    setNewAppointment(newBooking);
  }

  return (
    <div className="row">
      <div className="col col-sm-12 col-md-6">
        {doctors.map((doctor) => (
          <div>
            <div>
              <div className="row doctorCrad">
                <Link
                  to={`/doctors/${doctor.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="col col-sm-12 col-md-4 docImage">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPPYSMvGn6iF_kZQs8YyU1jm4VczEPSx2Lpw&usqp=CAU"
                      alt="doctor"
                    />
                  </div>
                  <div className="col col-md-4">
                    <h5>
                      {doctor.first_name} {doctor.last_name}
                    </h5>
                    <p>{doctor.speciality}</p>
                    <p>Ratings</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="col col-sm-12 col-md-6">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h4>Create a new Appointment</h4>
            <label>Doctor name</label>
            <input
              type="text"
              name="doctor_id"
              className="form-control"
              onChange={handleNewAppointment}
              placeholder="Enter Your First Name"
            />
            <label>Date</label>
            <input
              type="text"
              name="date"
              className="form-control"
              onChange={handleNewAppointment}
              placeholder="Enter Your First Name"
            />
            <label>Time</label>
                  <select
                    className="form-select"
                    name="time"
                    aria-label="Default select example"
                    onChange={handleNewAppointment}
                  >
                    <option value="0900" deaault>9.00 am - 10.00 am</option>
                    <option value="1000">10.00 am - 11.00 am</option>
                    <option value="1100">11.00 am - 12.00 pm</option>
                    <option value="1300">1.00 pm - 2.00 pm</option>
                  </select>
            <small className="form-text text-muted">
              Please select desired time slot.
            </small>
          </div>

          <Link to="/appointments">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </Link>
        </form>
        <div>
          {errors
            ? errors.map((e) => (
                <p style={{ color: "red", marginTop: "10px" }}>{e}</p>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default NewAppiontment;
