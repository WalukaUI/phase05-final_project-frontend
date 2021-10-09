import React, { useState }  from "react";
import "./Doctors.css";
import Doctor from "./DoctorCard";
import CardLoadAnimation from "./DocCardLoading";

function Doctors({doctors, user}) {
  const[searchTearm,setSearchTearm]=useState("")
  const[dermatalogist,setDermatalogist]=useState(false)
  const[familyMd, setFamilyMd]=useState(false)
  const[anesthesiology,setAnesthesiology]=useState(false)

  function activeSearch(e) {
    e.preventDefault()
    setSearchTearm(e.target.value)
  }

  return (
    <div>
      <div className="row doctorMainDiv">
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
                    <input type="checkbox" onChange={()=>setDermatalogist(!dermatalogist)}/>

                  </div>
                </li>
                <li className="serchTearms">
                  <label>Family Medicine</label>
                  <div>
                    <input type="checkbox" onChange={()=>setFamilyMd(!familyMd)}/>
                  </div>
                </li>
                <li className="serchTearms">
                  <label>Anesthesiology</label>
                  <div>
                    <input type="checkbox" onChange={()=>setAnesthesiology(!anesthesiology)}/>
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
          {doctors === null ? (
            <CardLoadAnimation />
          ) : (

            doctors.filter((card)=>card.last_name.toLowerCase().includes(searchTearm.toLowerCase()))
            .filter((card)=> familyMd ? card.speciality === "Family medicine":card)
            .filter((card)=> dermatalogist ? card.speciality === "Dermatology":card)
            .filter((card)=>anesthesiology ? card.speciality === "Anesthesiology":card)
            //.filter((card)=>card.isacceptnewpatients === true)
            .map((card) => <Doctor key={card.id} card={card} user={user}/>)
          )}
        </div>
      </div>
    </div>
  );
}
export default Doctors;
