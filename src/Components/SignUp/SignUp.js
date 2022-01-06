import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import BASE_URL from "../../constraints/URL";
import emailjs from "emailjs-com";
import "./SignUp.css";
import "./Spinner.css";

function SignUp({ locations, setUser }) {
  const [newPatient, setNewPatient] = useState({});
  const [errors, setErrors] = useState(null);
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [confirmWindow, setConfirmWindow] = useState(false);

  const history = useHistory();
  let allInputs = document.querySelectorAll(".newData");
  let messageTags = document.querySelectorAll(".messageTag");

  //POST newpatient-----------------------

  function createNewPatient() {
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
          setUser(user);
        });
      } else {
        res.json().then((err) => {
          setErrors(err.error);
        });
      }
    });
  }

  //Send email------------------------------

  async function sendEmail(e) {
    e.preventDefault();
    console.log(newPatient);
    await emailjs
      .sendForm(
        "service_dchmott",
        "template_vq1x7nj",
        e.target,
        "user_lKVMUZPYGwUDtHBAdsLEn"
      )
      .then(
        (result) => {
          console.log(result.text);
          setConfirmWindow(!confirmWindow);
        },
        (error) => {
          console.log(error.text);
          for (let i = 0; i < messageTags.length; i++) {
            messageTags[i].innerHTML = "";
          }
        }
      );
    e.target.reset();
  }
  //Supportive functions------------------------------

  function handleAddPatient(e) {
    e.preventDefault();
    setConfirmationNumber(Math.floor(1000 + Math.random() * 9000));
    let newPatientObj = {
      ...newPatient,
      [e.target.name]: e.target.value,
      role: "patient",
    };
    setNewPatient(newPatientObj);
  }

  function handleConfirmation(e) {
    e.preventDefault();
    let enteredconfirmationNumber =
      document.getElementById("confirmNumber").value;
    let sentNumber = parseInt(confirmationNumber);
    let enteredNumber = parseInt(enteredconfirmationNumber);

    if (sentNumber === enteredNumber) {
      setConfirmWindow(!confirmWindow);
      setConfirmationNumber("");
      createNewPatient();
      history.push(`/`);
    } else {
      alert("Wrong Number, Please enter confirmation number again");
    }
  }
  //form validation----------------------------------------------------------

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function handleValidity(e) {
    e.preventDefault();

    for (let i = 0; i < allInputs.length; i++) {
      allInputs[i].addEventListener("input", (h) => {
        let str = h.target.value;
        let regex = /\d/; //check numbers in the input value

        if (h.target.name === "email") {
          if (h.target.checkValidity() && validateEmail(h.target.value)) {
            handleAddPatient(e);
            messageTags[i].innerHTML = "Email Address Accepted";
            messageTags[i].style.color = "green";
          } else {
            if (str.length > 0) {
              messageTags[i].innerHTML = "Please enter a valied email address";
              messageTags[i].style.color = "#d926cc";
            } else {
              messageTags[i].innerHTML = h.target.validationMessage;
              messageTags[i].style.color = "red";
            }
          }
        } else if (h.target.name === "username") {
          if (h.target.checkValidity()) {
            handleAddPatient(e);
            messageTags[i].innerHTML = "Accepted";
            messageTags[i].style.color = "green";
          } else {
            messageTags[i].innerHTML = h.target.validationMessage;
            messageTags[i].style.color = "red";
          }
        } else {
          if (h.target.checkValidity() && !regex.test(str)) {
            handleAddPatient(e);
            messageTags[i].innerHTML = "Accepted";
            messageTags[i].style.color = "green";
          } else {
            messageTags[i].innerHTML = h.target.validationMessage;
            messageTags[i].style.color = "red";
          }
        }
      });
    }
  }

  //--------------------------------------------------

  return confirmWindow ? (
    <>
      <div className="popupbox">
        <div className="popupinner">
          <div className="confirmNumDiv">
            <form onSubmit={handleConfirmation}>
              <div className="form-group">
                <h4>Please confirm your email </h4>
                <hr />
                <p>
                  Please check your emails.
                  <br />
                  We have sent you a <strong>Confirmation number</strong> to
                  your email address
                </p>
                <br />
                <hr />
                <label>Enter confirmation number : </label>
                <input id="confirmNumber" />

                <div className="spinner">
                  <div class="lds-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
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
            <button className=" btn btn-success createPatientBtn" type="submit">
              Submit
            </button>
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
export default SignUp;
