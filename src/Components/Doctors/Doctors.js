import React, { useState } from "react";
import "./Doctors.css";
import Doctor from "./DoctorCard";
import CardLoadAnimation from "./DocCardLoading";
import  BackendUnAvailability  from "../BackendUnavailability/BackendUnAvailability";

function Doctors({ doctors }) {
  const [searchTearm, setSearchTearm] = useState("");
  const [docSpeciality, setSpeciality] = useState("");
  const [acceptNewPatients, setAcceptNewPatients] = useState(false);
  const [videoVisits, setVideoVisits] = useState(false);

  function activeSearch(e) {
    e.preventDefault();
    setSearchTearm(e.target.value);
  }

  return (
    <div>
      <div className="row doctorMainDiv" style={{ marginRight: "0" }}>
        <div className="col col-sm-12 col-md-3 docSearchDiv">
          <form>
            <input
              type="text"
              onChange={activeSearch}
              className="form-control"
              placeholder="Last name"
            />
            <button className="btn btn-primary searchBtn">Search</button>
            <div className="serchFilter">
              <h6>Narrow Your Results</h6>
              <ul>
                <li className="serchTearms">
                  <label>Accepting New Patients</label>
                  <div>
                    <input
                      type="checkbox"
                      onChange={() => setAcceptNewPatients(!acceptNewPatients)}
                    />
                  </div>
                </li>
                <li className="serchTearms">
                  <label>Video Visits</label>
                  <div>
                    <input
                      type="checkbox"
                      onChange={() => setVideoVisits(!videoVisits)}
                    />
                  </div>
                </li>
              </ul>
              <div className="filterBySpeciality">
                <p>
                  <strong>Speciality</strong>
                </p>
                <label>Select a Doctor by Speciality</label>
                <select
                  className="form-select"
                  name="speciality"
                  aria-label="Default select example"
                  onChange={(e) => setSpeciality(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Family medicine">Family medicine</option>
                  <option value="Anesthesiology">Anesthesiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Preventive medicine">
                    Preventive medicine
                  </option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div className="col col-sm-12 col-md-9 formnput">
          {doctors === null ? (
            <div>
             <BackendUnAvailability/>
            <CardLoadAnimation />
            </div>
          ) : (
            doctors
              .filter((card) =>
                card.last_name.toLowerCase().includes(searchTearm.toLowerCase())
              )
              .filter((card) =>
                acceptNewPatients ? card.isaccept_newpatients === true : card
              )
              .filter((card) =>
                videoVisits ? card.video_vistits === true : card
              )
              .filter((card) => {
                switch (docSpeciality) {
                  case "Dermatology":
                    return card.speciality === "Dermatology";
                  case "Family medicine":
                    return card.speciality === "Family medicine";
                  case "Anesthesiology":
                    return card.speciality === "Anesthesiology";
                  case "Preventive medicine":
                    return card.speciality === "Preventive medicine";
                  case "Pediatrics":
                    return card.speciality === "Pediatrics";
                  default:
                    return card;
                }
              })
              .map((card) => <Doctor key={card.id} card={card} />)
          )}
        </div>
      </div>
    </div>
  );
}
export default Doctors;
