import React from "react";

function RegistrationForm({
  handleValidity,
  handleAddPatient,
  errors,
  sendEmail,
  confirmationNumber,
  locations,
  isValiedEmail,
}) {
  return (
    <div className="signupContainer">
      <h4>Create your account</h4>
      <form onSubmit={sendEmail}>
        <div className="row signupInnerContainer">
          <div className="col col-sm-12 col-md-6 signUpformInnerDiv1">
            <input
              name="message"
              id="confirmEmail"
              type="number"
              style={{ display: "none" }}
              value={confirmationNumber}
              onChange={handleAddPatient}
            />

            <label>
              Select a Clinic Location
              <select
                className="form-select"
                id="clinicSelection"
                name="clinic_location"
                aria-label="Default select example"
                onChange={(e) => {
                  handleAddPatient(e);
                  let clinicmessage =
                    document.getElementById("clinicTagMesssage");
                  clinicmessage.innerHTML = "Clinc Selected";
                  clinicmessage.style.color = "green";
                }}
                required
              >
                {locations?.map((loc) => (
                  <option value={loc.id} key={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
              <p id="clinicTagMesssage" style={{ color: "red" }}>
                Please select a clinic location
              </p>
            </label>

            <label>
              First Name
              <input
                className="form-control form-control-sm newData"
                type="text"
                name="first_name"
                maxLength="20"
                placeholder="First Name"
                onChange={handleValidity}
                required
              />
              <p className="messageTag"></p>
            </label>

            <label>
              Last Name
              <input
                className="form-control form-control-sm newData"
                type="text"
                name="last_name"
                maxLength="20"
                placeholder="Last Name"
                onChange={handleValidity}
                required
              />
              <p className="messageTag"></p>
            </label>
            <label>
              Email
              <input
                className="form-control form-control-sm newData"
                type="text"
                name="email"
                maxLength="50"
                placeholder="Email"
                onChange={handleValidity}
                required
              />
              <p className="messageTag"></p>
            </label>
          </div>

          <div className="col col-sm-12 col-md-6 signUpformInnerDiv2">
            <label>
              Username
              <input
                className="form-control form-control-sm newData"
                name="username"
                maxLength="30"
                placeholder="Username"
                onChange={handleValidity}
                required
              />
              <p className="messageTag"></p>
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                autoComplete="on"
                maxLength="50"
                minLength="3"
                className="form-control"
                onChange={handleAddPatient}
                placeholder="Password"
                required
              />
            </label>
            <label>
              Password Verification
              <input
                type="password"
                name="password_confirmation"
                autoComplete="on"
                maxLength="50"
                minLength="3"
                className="form-control"
                onChange={handleAddPatient}
                placeholder="Re-enter your Password"
                required
              />
            </label>
            {isValiedEmail ? (
              <button
                className=" btn btn-success createPatientBtn"
                type="submit"
              >
                Submit
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </form>
      <div>
        {errors
          ? errors.map((e) => (
              <p style={{ color: "red", marginBottom: "10px" }} key={e}>
                {e}
              </p>
            ))
          : null}
      </div>
    </div>
  );
}

export default RegistrationForm;
