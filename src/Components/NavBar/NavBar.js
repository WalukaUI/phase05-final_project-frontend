import React from "react";
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

        <img
          src="../hospital logo.png"
          alt="Logo"
          style={{ width: "25%", marginLeft: "10px" }}
        />
      </div>

      <div className="mainLinksDiv"></div>

      <div className="loginLogoutDiv"></div>
    </div>
  );
}

export default NavBar;