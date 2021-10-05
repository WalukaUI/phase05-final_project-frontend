import React, { useState } from "react";
import "./DocLogin.css";
import BASE_URL from "../../../constraints/URL";

function DoctorLogin({ setUser }) {
  const [docEmail, setDocEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    //login

    fetch(BASE_URL + `/doctorlogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: docEmail,
        password: password,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          // setLogin(!login);
          // setisloggedin(true);
          setUser(user);
        });
      } else {
        res.json().then((err) => {
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
          <button className="btn btn-warning">Register</button>
        </form>
      </div>
    </div>
  );
}
export default DoctorLogin;
