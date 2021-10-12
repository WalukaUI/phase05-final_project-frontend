

import React, { useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../constraints/URL";
import "./Profile.css";

function DocProfile({ user, appointments, locations, setUser }) {
  const [popup, setPopup] = useState(false);
  const [updateUserData, setUpdateUserData] = useState(null);

  //PATCH User-------------------------------
  
  function triggerEdit(e) {
    e.preventDefault();
    setPopup(!popup);
    fetch(BASE_URL + `/patients/${user.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updateUserData),
    })
      .then((res) => res.json())
      .then((patient) => setUser(patient));
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
    locations.map((card) => (card.id === id ? nn.push(card.name) : null));
    return nn[0];
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
        {editUser?.role === "patient"?

        //patient edit window----------------------------------
        <>
          <div className="col col-sm-12 col-md-5">
            <p>
              <b>First Name :</b>
              {popup ? (
                <input
                  value={editUser?.first_name ? editUser?.first_name : ""}
                  name="first_name"
                  onChange={handleChange}
                />
              ) : (
                editUser.first_name
              )}
            </p>
            <p>
              <b>Last Name :</b>
              {popup ? (
                <input
                  value={editUser?.last_name ? editUser?.last_name : ""}
                  name="last_name"
                  onChange={handleChange}
                />
              ) : (
                user.last_name
              )}
            </p>
            <p>
              <b>User name :</b>
              {popup ? (
                <input
                  value={editUser?.username ? editUser?.username: ""}
                  name="username"
                  onChange={handleChange}
                />
              ) : (
                user.username
              )}
            </p>
            <p>
              <b>Clinic Location :</b>
              {popup ? (
                <label>
                  <select
                    className="form-select"
                    name="clinic_location"
                    value={
                      editUser?.clinic_location ? editUser?.clinic_location : ""
                    }
                    aria-label="Default select example"
                    onChange={handleChange}
                  >
                    {locations.map((card) => (
                      <option value={card.id} key={card.id}>
                        {card.name}
                      </option>
                    ))}
                  </select>
                </label>
              ) : (
                showUserClinicName(parseInt(user.clinic_location))
              )}
            </p>
          </div>
          <div className="col col-sm-12 col-md-5">
            <p>
              <b>Contact Number:</b>{" "}
              {popup ? (
                <input
                  value={editUser?.contact_number ? editUser?.contact_number : ""}
                  name="contact_number"
                  onChange={handleChange}
                />
              ) : (
                user.contact_number
              )}
            </p>
            <p>
              <b>Email Address:</b>{" "}
              {popup ? (
                <input
                  value={editUser?.email}
                  name="email"
                  onChange={handleChange}
                />
              ) : (
                user.email
              )}
            </p>
          </div>
          </>
          :
""
          //doctor edit window---------------------------------------------

        //   <>
        //   <div className="col col-sm-12 col-md-5">
        //   <p>
        //     <b>First Name:</b>
        //     {popup ? (
        //       <input
        //         value={user.role==="doctor" ? editUser.first_name : ""}
        //         name="first_name"
        //         onChange={handleChange}
        //       />
        //     ) : (
        //       user.first_name
        //     )}
        //   </p>
        //   <p>
        //     <b>Last Name:</b>{" "}
        //     {popup ? (
        //       <input
        //         value={user.role==="doctor" ? editUser.last_name : ""}
        //         name="last_name"
        //         onChange={handleChange}
        //       />
        //     ) : (
        //       user.last_name
        //     )}
        //   </p>
        //   <p>
        //     <b>Education :</b>
        //     {popup ? (
        //       <input
        //         value={user.role==="doctor" ? editUser?.education: ""}
        //         name="education"
        //         onChange={handleChange}
        //       />
        //     ) : (user.education)}
        //   </p>
        //   <p>
        //   <b>Speciality :</b>
        //     {popup ?
        //      <select
        //             className="form-select"
        //             name="speciality"
        //             defaultValue={user.role==="doctor"? user.speciality:"" }
        //             aria-label="Default select example"
        //             onChange={handleChange}
        //           >
        //             <option value="Dermatology" >Dermatology</option>
        //             <option value="Family medicine" >Family medicine</option>
        //             <option value="Anesthesiology" >Anesthesiology</option>
        //             <option value="Pediatrics" >Pediatrics</option>
        //             <option value="Preventive medicine" >Preventive medicine</option>
        //           </select>
        //           :(editUser.speciality)}
        //   </p>
        // </div>
        // <div className="col col-sm-12 col-md-5">
        //   <p>
        //     <b>Username :</b>
        //     {popup ? (
        //       <input
        //         value={user.role==="doctor" ? editUser.username : ""}
        //         name="username"
        //         onChange={handleChange}
        //       />
        //     ) : (
        //       user.username 
        //     )}
        //   </p>
        //   <p>
        //     <b>Image URL :</b>
        //     {popup ? (
        //       <input
        //         value={editUser?.image}
        //         name="image"
        //         onChange={handleChange}
        //       />
        //     ) : (
        //       editUser?.image?"Available":"Not Available"
        //     )}
        //   </p>
        // </div>
        // </>
          
          
          }


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
