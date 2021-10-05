import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="row footerMainDiv">
      <div className="col col-sm-12 col-md-4 footerDiv1">
        <img
          src="../hospital logo.png"
          alt="Logo"
          style={{ width: "25%", marginLeft: "10px" }}
        />
        <p>Hospital</p>
        <p>615, Loies Street</p>
        <p>Saint Louis, Missouri 63341</p>
        <p>314-251-5000</p>
      </div>
      <div className="col col-sm-12 col-md-4 footerDiv2">
        <h6>USEFUL LINKS</h6>
        <p>About us</p>
        <p>Careers</p>
        <p>Health Information</p>
        <p>Schedule an Appointment</p>
        <p>Healthcare Education</p>
        <p>Schedule an Appointment</p>
      </div>
      <div className="col col-sm-12 col-md-4 footerDiv3">
        <h6>Follow us on Scial Media</h6>
       
        <img
          src="../facebook.svg"
          alt="Logo"
          style={{ width: "15%", marginLeft: "10px" }}
        />
        <img
          src="../twitter.svg"
          alt="Logo"
          style={{ width: "15%", marginLeft: "10px" }}
        />
        <img
          src="../instagram.svg"
          alt="Logo"
          style={{ width: "15%", marginLeft: "10px" }}
        />
      </div>
    </div>
  );
}

export default Footer;
