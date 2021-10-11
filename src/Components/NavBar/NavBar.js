import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./NavBar.css";


function NavBar({logout, user}) {

 const history = useHistory()
 function handlelogout(e) {
   e.preventDefault();
   logout();
   localStorage.clear();
   history.push("/login");
 }

  return (
    <div className="navBarMainDiv">
      <div className="logoDiv">
        <div id="cssmenu">
          <ul>
            <li>
              <span>
                <img
                  src="../menu.png"
                  alt="Logo"
                  style={{ width: "25%", marginRight: "5px" }}
                />
                Menu<i className="arrow"></i>
              </span>
              <ul className="dropdown">
                <li>
                  <a href="/doctors">Doctors</a>
                </li>
                <li>
                  <a href="/locations">Locations</a>
                </li>
                <li>
                  <span>
                  Appointments <i className="arrow"></i>
                  </span>
                  <ul className="dropdown">
                    <li>
                      <a href="/appointments">All Apointments</a>
                    </li>
                    <li>
                      <a href="/newappointment">New Appointment</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>
                    Other
                    <i className="arrow"></i>
                  </span>
                  <ul className="dropdown">
                    <li>
                      <a href="/">About us</a>
                    </li>
                    <li>
                      <a href="/">Careers</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <Link to="/"><img
          src="../hospital logo.png"
          alt="Logo"
          style={{ width: "70%", marginLeft: "10px" }}
        /></Link>
      </div>

      <div className="mainLinksDiv">
        
         <div><Link to="/doctors">Doctors</Link></div>
         <div><Link to="/locations">Locations</Link></div>
          {user?
                   user.role === "doctor" ? <><div><Link to="/appointments">Appointments</Link></div> 
                   <div><Link to="/patients">Patients</Link></div></>: 
                   <div><Link to="/appointments">Appointments</Link></div> 
          :""}

         {user?
         <Link className="btn btn-warning" to="/doctorlogin" onClick={handlelogout}>Log Out</Link>:
         <Link className="btn btn-outline-primary" to="/doctorlogin">Doctor Log in</Link>}
         <Link className={user?"changeDisplay":"btn btn-primary"} to="/patientlogin">Patient Log in</Link>

      </div>

      <div className="loginLogoutDiv">
        <h6>{user ? `You are logged in as ${user.username}`: ""}</h6>
        <a href="!#">You are serching from</a>
        <div>
        {user ? <Link to="/patient-profile" className="btn btn-light">Account Settings</Link>: ""}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
