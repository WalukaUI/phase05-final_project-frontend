import React, { useEffect, useState } from "react";
import BASE_URL from "../../constraints/URL";
import PatientCard from "./PatientCard";
import CardLoadAnimation from "../Doctors/DocCardLoading";
import "./Patients.css";

function Patients() {
  const [patients, setPatients] = useState(null);

  useEffect(() => {
    fetch(BASE_URL + `/patients`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setPatients(data);
        });
      } else {
        //console.log(res);
        //   setLogin(!login)
      }
    });
  }, []);

  return (
    <div className="patientMainDiv">
    <div className="patientInnerDiv">
      <form className="patientSearchForm">
        <div className="row">
          <div className="col col-sm-12 col-md-3 all">
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
            />
          </div>
          <div className="col col-sm-12 col-md-3">
          <button className="btn btn-primary searchBtn">Search</button>
          </div>
          <div className="col col-sm-12 col-md-3">
            <h6>Narrow Your Results</h6>
          </div>
          <div className="col col-sm-12 col-md-3">
            <ul>
              <li className="serchTearms">
                <label>Clinic Location</label>
                <div>
                  <input type="checkbox" />
                </div>
              </li>
              <li className="serchTearms">
                <label>Video Visits</label>
                <div>
                  <input type="checkbox" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </form>
      <div className="patientCardDiv">
        {patients === null ? (
          <CardLoadAnimation />
        ) : (
          patients.map((card) => <PatientCard key={card.id} card={card} />)
        )}
      </div>
    </div>
    </div>
  );
}

export default Patients;
