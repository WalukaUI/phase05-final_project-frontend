

import React, { useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../constraints/URL";
import "./Profile.css";

function DocProfile({ user, appointments, locations, setUser }) {
  const [popup, setPopup] = useState(false);
  const [updateUserData, setUpdateUserData] = useState(null);
  const [errors,setErrors]=useState(null)

  //PATCH User-------------------------------
  
  function triggerEdit(e) {
    e.preventDefault();
    setPopup(!popup);
    fetch(BASE_URL + `/doctors/${user.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updateUserData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((doc) => {
          setUser(doc)
        });
      } else {
        res.json().then((err) => {
          setErrors(err.error);
        });
      }
    });
  }

  //show user appointments--------------------

  function showUserAppointments(id) {
    let appointment = appointments?.map((card) => card.doctor_id === id);
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

  //Supportive Functions------------------------

  function triggerEditWindow(e) {
    e.preventDefault();
    setPopup(!popup);
    setUpdateUserData(user);
  }

  function handleChange(e) {
    e.preventDefault();
    let newData = { ...updateUserData, [e.target.name]: e.target.value };
    setUpdateUserData(newData);
  }

  const editUser = updateUserData;

  return (
    <div className="profile">
      <form onSubmit={triggerEdit}>
        <div className="row profileDetails">
          <h5>Your Profile</h5>
          <hr />
          <div className="col col-sm-12 col-md-5">
            <p>
              <b>First Name :</b>
              {popup ? (
                <input
                  value={editUser.first_name}
                  name="first_name"
                  onChange={handleChange}
                />
              ) : (
                user.first_name
              )}
            </p>
            <p>
              <b>Last Name :</b>
              {popup ? (
                <input
                  value={editUser.last_name }
                  name="last_name"
                  onChange={handleChange}
                />
              ) : (
                user.last_name
              )}
            </p>
            <p>
              <b>Email Address :</b>
              {popup ? (
                <input
                  value={user?.email}
                  name="email"
                  onChange={handleChange}
                />
              ) : (
                user.email ? user.email: "N/A"
              )}
            </p>
            <p>
              <b>Education :</b>
              {popup ? (
                <input
                  value={user?.education}
                  name="education"
                  onChange={handleChange}
                />
              ) : (
                user.education ? user.education: "N/A"
              )}
            </p>

          </div>
          <div className="col col-sm-12 col-md-5">
            <p>
              <b>Username:</b>{" "}
              {popup ? (
                <input
                  value={editUser?.username}
                  name="username"
                  onChange={handleChange}
                />
              ) : (
                user.username ? user.username :"N/A"
              )}
            </p>
            <p>
              <b>Speciality:</b>{" "}
              {popup ? (
                <select
                  className="form-select"
                  name="speciality"
                  value={editUser?.speciality}
                  aria-label="Default select example"
                  onChange={handleChange}
                >
                  <option value="All">All</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Family medicine">Family medicine</option>
                  <option value="Anesthesiology">Anesthesiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Preventive medicine">
                    Preventive medicine
                  </option>
                </select>
              ) : (
                user.speciality ? user.speciality: "N/A"
              )}
            </p>
            <p>
              <b>Profile Image:</b>{" "}
              {popup ? (
                <input
                  value={editUser?.image}
                  name="image"
                  onChange={handleChange}
                />
              ) : (
                user.image ? user.image: "N/A"
              )}
            </p>
          </div>
          <div className="col col-sm-12 col-md-2 editProfileDiv">
            {popup ? (
              <button className="btn profileSaveBtn" type="submit">
                Save
              </button>
            ) : (
              <button
                className="btn profileEditBtn"
                onClick={triggerEditWindow}
              >
                Edit profile
              </button>
            )}

            {popup ? (
              <button
                className="btn profileCancelBtn"
                onClick={triggerEditWindow}
              >
                Cancel
              </button>
            ) : (
              <Link to="/"><button className="btn profileCancelBtn">Cancel</button></Link>
            )}
          </div>
        </div>
      </form>
      <hr />
      <div style={{width: "100%", height: "200px", backgroundColor: "red"}}>
        {errors
          ? errors.map((e) => (
              <p style={{ color: "red", marginBottom: "10px" }} key={e}>{e}</p>
            ))
          : null}
      </div>
      <div className="row profileAppointments">
        <h5>Appointments</h5>
        {showUserAppointments(user?.id)}
        <Link to="/appointments">
          <button className="btn profileNewAppointmentBtn btn-info">
            Your Appointments
          </button>
        </Link>
      </div>
    </div>
  );
}

export default DocProfile;
