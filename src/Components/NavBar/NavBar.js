import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
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
                  <a href="!#">Curabitur</a>
                </li>
                <li>
                  <span>
                    Suspendisse vel <i className="arrow"></i>
                  </span>
                  <ul className="dropdown">
                    <li>
                      <a href="!#">Etiam vestibulum</a>
                    </li>
                    <li>
                      <a href="!#">Integer efficitur</a>
                    </li>
                    <li>
                      <a href="!#">Finibus nibh</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>
                    Eget
                    <i className="arrow"></i>
                  </span>
                  <ul className="dropdown">
                    <li>
                      <a href="!#">Nam elementum</a>
                    </li>
                    <li>
                      <a href="!#">Magna pharetra</a>
                    </li>
                    <li>
                      <a href="!#">Pulvinar mi eget</a>
                    </li>
                    <li>
                      <a href="!#">Tincidunt orci</a>
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
         <div><Link to="/appointments">Make an Appointment</Link></div>
         <Link className="btn btn-outline-primary" to="/doctorlogin">Doctor Log in</Link>
         <Link className="btn btn-primary" to="/patientlogin">Patient Log in</Link>

      </div>

      <div className="loginLogoutDiv">
        <a href="!#">You are serching from</a>
        <div>Search</div>
      </div>
    </div>
  );
}

export default NavBar;
