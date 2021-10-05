import React, { useEffect, useState } from "react";
import BASE_URL from "../../constraints/URL"
import "./Doctors.css";
import Doctor from "./Doctor"
import LoadingDoctors from "./LoadingDoctors"

function Doctors() {
const [doctors, setDoctors]=useState(null)

    useEffect(()=>{
        fetch(BASE_URL + `/doctors`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }).then((res) => {
            if (res.ok) {
              res.json().then((data) => {
                  console.log(data);
                // setisloggedin(true);
                return setDoctors(data);
              });
            }else{
                console.log(res);
            //   setLogin(!login)
            }
          });
    },[])
  return (
    <div>
      <div className="row doctorMainDiv">
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
                    <li className="serchTearms"><label>Accepting New Patients</label><div><input type="checkbox"/></div></li>
                    <li className="serchTearms"><label>Video Visits</label><div><input type="checkbox"/></div></li>
                </ul>
                <p>Speciality</p>
                <ul>
                    <li className="serchTearms"><label>Dermatalogist</label><div><input type="checkbox"/></div></li>
                    <li className="serchTearms"><label>Family Medicine</label><div><input type="checkbox"/></div></li>
                    <li className="serchTearms"><label>Pediatric</label><div><input type="checkbox"/></div></li>
                    <li className="serchTearms"><label>Internal Medicine</label><div><input type="checkbox"/></div></li>
                    <li className="serchTearms"><label>Gynecology</label><div><input type="checkbox"/></div></li>
                </ul>
                
             </div>
          </form>
        </div>
        <div className="col col-sm-12 col-md-9 formInput">
            {doctors ? <Doctor/>: <LoadingDoctors />}
        </div>
      </div>
    </div>
  );
}
export default Doctors;
