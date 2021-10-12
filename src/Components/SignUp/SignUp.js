import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import BASE_URL from "../../constraints/URL";
import emailjs from "emailjs-com";
import "./SignUp.css";
import "./Spinner.css"

function SignUp({ locations, setUser }) {
  const [newPatient, setNewPatient] = useState({});
  const [errors, setErrors] = useState(null);
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [confirmWindow, setConfirmWindow] = useState(false);
  const [userBeforConfirm,setUserBeforConfirm]=useState(null)

  const history = useHistory();
  //const form = useRef();
 
  function createNewPatient(e) {
    e.preventDefault();
    let emailConfirmationNumber = document.getElementById("confirmEmail").value;
    console.log(emailConfirmationNumber);
    setConfirmationNumber(emailConfirmationNumber);

    //POST newpatient-----------------------

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
          console.log("user created");
         sendEmail(user, e);
        });
      } else {
        res.json().then((err) => {
          console.log(err.error);
          setErrors(err.error);
        });
      }
    });
   }

  //Send email------------------------------

  function sendEmail(user, e) {
    console.log("email started")
    emailjs.sendForm(
        "service_dchmott",
        "template_vq1x7nj",
        e.target,
        "user_lKVMUZPYGwUDtHBAdsLEn"
      )
      .then(
        (result) => {
          console.log("email sent")
          console.log(result.text);
          setUserBeforConfirm(user)
          setConfirmWindow(!confirmWindow)
        },
        (error) => {
          console.log("email not sent")
          console.log(error.text);
        }
      );
      console.log("hit end")
    e.target.reset();
  }

//Supportive functions------------------------------

  function handleAddPatient(e) {
    e.preventDefault();
    console.log(confirmationNumber);
    let newPatientObj = {
      ...newPatient,
      [e.target.name]: e.target.value,
      role: "patient",
    };
    setNewPatient(newPatientObj);
  }

  function  handleConfirmation(e) {
    e.preventDefault();
    let enteredconfirmationNumber = document.getElementById("confirmNumber").value;
    let sentNumber=parseInt(confirmationNumber)
    let enteredNumber=parseInt(enteredconfirmationNumber)

    if (sentNumber === enteredNumber){
      setConfirmWindow(!confirmWindow)
      setUser(userBeforConfirm)
      setConfirmationNumber("")
      history.push(`/`);
    }else{
      alert("Wrong Number, Please enter confirmation number again")
    }
  }

  return confirmWindow ? (
    <>
      <div className="popupbox">
        <div className="popupinner">
          <div className="confirmNumDiv">
            <form onSubmit={handleConfirmation}>
              <div className="form-group">
                <h4>Please confirm your email </h4>
                <hr/>
                <p>Please check your emails.<br/>
                We have sent you a <strong>Confirmation number</strong> to your email address</p><br/><hr/>
                <label>Enter confirmation number : </label>
                <input id="confirmNumber"/>

                <div className="spinner">

                  <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div>
                 </div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                 </div> 

                <div>
                  <button type="submit" className="btn btn-success formSubBtn">
                    Confirm
                  </button>
                  <button
                    className="btn btn-warning formSubBtn"
                    onClick={() => setConfirmWindow(!confirmWindow)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="signupContainer">
      <h4>Create your account</h4>
      {/* ref={form} */}
      <form  onSubmit={createNewPatient}>
        <div className="row signupInnerContainer">
          <div className="col col-sm-12 col-md-6 signUpformInnerDiv1">
            <input
              name="message"
              id="confirmEmail"
              type="number"
              style={{ display: "none" }}
              value={Math.floor(1000 + Math.random() * 9000)}
            />
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
                {locations?.map((loc) => (
                  <option value={loc.id} key={loc.id}>
                    {loc.name}
                  </option>
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
              <p style={{ color: "red", marginBottom: "10px" }} key={e}>{e}</p>
            ))
          : null}
      </div>
    </div>
  );
}
export default SignUp;