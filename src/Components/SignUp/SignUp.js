import React, { useState } from "react";
import "./SignUp.css";

function SignUp({ location }) {
  const [newPatient, setNewPatient] = useState({});

  function createNewPatient(e) {
    e.preventDefault();
  }

  function handleAddPatient(e) {
    e.preventDefault();
  }

  return (
    <div className="signupContainer">
        <h4>Create your account</h4>
      <form onSubmit={createNewPatient}>
        <div className="row signupInnerContainer">
          <div className="col col-sm-12 col-md-6 signUpformInnerDiv1">
            <label>
              First Name
              <input
                className="form-control form-control-sm"
                type="text"
                name="first_name"
                placeholder="First Name"
                onChange={handleAddPatient}
              />
            </label>
            <label>
              Last Name
              <input
                className="form-control form-control-sm"
                type="text"
                name="last_name"
                placeholder="Last Name"
                onChange={handleAddPatient}
              />
            </label>
            <label>
              Email
              <input
                className="form-control form-control-sm"
                type="text"
                name="email"
                placeholder="Name"
                onChange={handleAddPatient}
              />
            </label>
            <label>
              City
              <select
                className="form-select"
                name="city_id"
                aria-label="Default select example"
                onChange={handleAddPatient}
              >
                <option value="1">Curt</option>
                <option value="2">Leah</option>
                <option value="3">Vesta</option>
                <option value="4">NYC</option>
                <option value="5">Chicago</option>
                <option value="6">Indiana</option>
                <option value="7">Chuck</option>
                <option value="8">Nicolas</option>
                <option value="9">Trenton</option>
                <option value="10">Keli</option>
                <option value="11">Hyman</option>
              </select>
            </label>
          </div>

          <div className="col col-sm-12 col-md-6 signUpformInnerDiv2">
            <label>
              Username
              <input
                className="form-control form-control-sm"
                name="username"
                placeholder="Username"
                onChange={handleAddPatient}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                autocomplete="on"
                className="form-control"
                onChange={handleAddPatient}
                placeholder="Password"
              />
            </label>
            <label>
              Password Verification
              <input
                type="password"
                name="password_confirmation"
                autocomplete="on"
                className="form-control"
                onChange={handleAddPatient}
                placeholder="Veryfy your Password"
              />
            </label>
            <button className=" btn btn-success createPatientBtn" type="submit">
            Submit
          </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;

//https://serverless-stack.com/chapters/create-the-signup-form.html
