import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./DocLogin.css";
import BASE_URL from "../../../constraints/URL";

function DoctorLogin({ setUser }) {
  const [docEmail, setDocEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const history = useHistory();
  
  function handleSubmit(e) {
    
    e.preventDefault();
    
    //login

    fetch(BASE_URL + `/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: docEmail,
        password: password,
        patient: true
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
           //console.log(user);
          // setLogin(!login);
          // setisloggedin(true);
          setUser(user);
          setDocEmail("")
          setPassword("")
          setErrors(null)
          history.push("/");
        });
      } else {
        res.json().then((err) => {
           //console.log(err);
          // setisloggedin(false);
          setErrors(err.error);
        });
      }
    });
  }

  return (
    <div className="row docloginMain">
      <div className="sidenav col col-md-6 col-sm-12">
        <div className="login-main-text">
          <h2>
            Doctor
            <br /> Login Page
          </h2>
          <p>Login or register from here to access.</p>
        </div>
      </div>
      <div className="main col col-md-6 col-sm-12">
        {
          <div>
            {errors ? (
              <p style={{ color: "red", marginTop: "10px" }}>{errors}</p>
            ) : null}
          </div>
        }
        <form onSubmit={handleSubmit}>
          <div>
            <label>email</label>
            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={docEmail}
              onChange={(e) => setDocEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
export default DoctorLogin;
