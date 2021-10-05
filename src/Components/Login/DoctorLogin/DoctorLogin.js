import React, { useState } from "react";
import "./DocLogin.css";

function DoctorLogin() {
 const [docEmail,setDocEmail]=useState("")
 const [password, setPassword] = useState("");

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
        <form>
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
          <button type="submit" className="btn btn-warning">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
export default DoctorLogin;
