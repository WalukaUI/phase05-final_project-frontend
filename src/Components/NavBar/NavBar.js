import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./NavBar.css";
import UserLocation from "../Locations/UserLoaction";

function NavBar({ logout, user, getAddress, setAddress }) {
  const history = useHistory();
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
                  style={{ width: "30px", marginRight: "5px" }}
                />
                Menu<i className="arrow"></i>
              </span>
              <ul className="dropdown">
                <li>
                  <Link to="/doctors">Doctors</Link>
                </li>
                <li>
                  <Link to="/locations">Locations</Link>
                </li>
                {user ? (
                  <li>
                    <span>
                      Appointments <i className="arrow"></i>
                    </span>
                    <ul className="dropdown">
                      <li>
                        <Link to="/appointments">All Apointments</Link>
                      </li>
                      <li>
                        {user.role === "patient" ? (
                          <Link to="/newappointment">New Appointment</Link>
                        ) : (
                          ""
                        )}
                      </li>
                    </ul>
                  </li>
                ) : (
                  ""
                )}
                <li>
                  <span>
                    Other
                    <i className="arrow"></i>
                  </span>
                  <ul className="dropdown">
                    <li>
                      <Link to="/">About us</Link>
                    </li>
                    <li>
                      <Link to="/">Careers</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div>
          <Link to="/">
            <img
              src="../hospital logo.png"
              alt="Logo"
              style={{ width: "80px", marginLeft: "10px" }}
            />
          </Link>
        </div>
      </div>
      <div className="mainLinksDiv">
        <div>
          <Link to="/doctors">Doctors</Link>
        </div>
        <div>
          <Link to="/locations">Locations</Link>
        </div>
        {user ? (
          user.role === "doctor" ? (
            <>
              <div>
                <Link to="/appointments">Appointments</Link>
              </div>
              <div>
                <Link to="/patients">Patients</Link>
              </div>
            </>
          ) : (
            <div>
              <Link to="/appointments">Appointments</Link>
            </div>
          )
        ) : (
          ""
        )}

        {user ? (
          <Link
            className="btn btn-warning"
            to="/doctorlogin"
            onClick={handlelogout}
          >
            Log Out
          </Link>
        ) : (
          <Link className="btn btn-outline-primary" to="/doctorlogin">
            Doctor Log in
          </Link>
        )}
        <Link
          className={user ? "changeDisplay" : "btn btn-primary"}
          to="/patientlogin"
        >
          Patient Log in
        </Link>
      </div>

      <div className="loginLogoutDiv">
        <div className="loggedUsername">
          <h6>
            {user
              ? `You are logged in as ${user.first_name}`
              : "🔑 Login to make an Appointment"}
          </h6>
          {/* <UserLocation getAddress={getAddress} setAddress={setAddress} /> */}
        </div>
        <div style={{ textAlign: "center" }} className="accountSettingsDiv">
          {user ? (
            <Link to="/profile" className="btn">
              🔐 Account Settings
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
