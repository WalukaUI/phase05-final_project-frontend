import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import BASE_URL from "../../constraints/URL";
import emailjs from 'emailjs-com';
import "./SignUp.css";

function SignUp({ locations, setUser }) {
  const [newPatient, setNewPatient] = useState({});
  const [errors, setErrors] = useState(null);
  const [confirmationNumber,setConfirmationNumber]=useState("")
  const [userBeforeConfirm,setUserBeforeConfirm]=useState(null)

  const history = useHistory();
  const form = useRef();

  function createNewPatient(e) {
    e.preventDefault();

    let emailConfirmationNumber=document.getElementById("confirmEmail").value;
    setConfirmationNumber(emailConfirmationNumber)

    fetch(BASE_URL + `/patients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newPatient),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          console.log(user);
          sendEmail(user,e)
          //setUserBeforeConfirm(user);
          //history.push(`/`);
        });
      } else {
        res.json().then((err) => {
          console.log(err.error);
          setErrors(err.error);
        });
      }
    });
  }
//send email

function sendEmail(user,e) {
  console.log(e);
  console.log(user);
  // emailjs.sendForm('service_dchmott', 'template_vq1x7nj', form.current, 'user_lKVMUZPYGwUDtHBAdsLEn')
  // .then((result) => {
  //     console.log(result.text);
  // }, (error) => {
  //     console.log(error.text);
  // });
  e.target.reset()
}  



  





  function handleAddPatient(e) {
    e.preventDefault();
    let newPatientObj = {
      ...newPatient,
      [e.target.name]: e.target.value,
      role: "patient",
    };
    setNewPatient(newPatientObj);
  }


  return (
    <div className="signupContainer">
      <h4>Create your account</h4>
      <form ref={form} onSubmit={createNewPatient}>
        
        <div className="row signupInnerContainer">
          <div className="col col-sm-12 col-md-6 signUpformInnerDiv1">
            <input name="message" id="confirmEmail" style={{display: "none"}} value={Math.floor(1000 + Math.random() * 9000)}/>
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
                required
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
                required
              />
            </label>
            <label>
              Location
              <select
                className="form-select"
                name="clinic_location"
                aria-label="Default select example"
                onChange={handleAddPatient}
              >
                {locations.map((loc) => (
                  <option value={loc.id} key={loc.id}>{loc.name}</option>
                ))}
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
                autoComplete="on"
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
                autoComplete="on"
                className="form-control"
                onChange={handleAddPatient}
                placeholder="Re-enter your Password"
              />
            </label>
            <button className=" btn btn-success createPatientBtn" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
      <div>
        {errors
          ? errors.map((e) => (
              <p style={{ color: "red", marginBottom: "10px" }}>{e}</p>
            ))
          : null}
      </div>
    </div>
  );
}

export default SignUp;

//https://serverless-stack.com/chapters/create-the-signup-form.html
