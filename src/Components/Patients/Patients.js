import React, { useEffect, useState } from "react";
import BASE_URL from "../../constraints/URL";
import PatientCard from "./PatientCard"
import CardLoadAnimation from "../Doctors/DocCardLoading"
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
    <div>
      <div className="row">
        <div className="col col-sm-12 col-md-3 docSearchDiv">
          <form>
            <input
              type="text"
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
              <p>Speciality</p>
              <ul>
                <li className="serchTearms">
                  <label>Dermatalogist</label>
                  <div>
                    <input type="checkbox" />
                  </div>
                </li>
                <li className="serchTearms">
                  <label>Family Medicine</label>
                  <div>
                    <input type="checkbox" />
                  </div>
                </li>
                <li className="serchTearms">
                  <label>Pediatric</label>
                  <div>
                    <input type="checkbox" />
                  </div>
                </li>
                <li className="serchTearms">
                  <label>Internal Medicine</label>
                  <div>
                    <input type="checkbox" />
                  </div>
                </li>
                <li className="serchTearms">
                  <label>Gynecology</label>
                  <div>
                    <input type="checkbox" />
                  </div>
                </li>
              </ul>
            </div>
          </form>
        </div>
        <div className="col col-sm-12 col-md-9 formnput">
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
