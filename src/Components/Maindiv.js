import React from "react";
import NavBar from "./NavBar/NavBar";
import img from './lbb.jpg'
import "./Maindiv.css";

function MainContainer() {
  return (
    <div className="mainDiv" style={{
        backgroundImage: img,
        backgroundSize: "cover"
        }}>
      <NavBar />
      <div className="covidWarnning">
        <div>
          All Locations are open,{" "}
          <a href="!#">
            see covid restrictions
            <img src="../close.png" alt="close" />
          </a>
        </div>
      </div>

      <div className="searchBox" >
        <h2>The Care you Expected</h2>
        <div>
          <h6>How can we help you today?</h6>
          <div>
            <form>
              <div className="row">
                <div className="col formInput">
                  <select
                    className="form-select"
                    name="department_id"
                    // onChange={handleChangeData}
                  >
                    <option value="1">Doctors</option>
                    <option value="2">Locations</option>
                  </select>
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                  />
                </div>
                <div className="col formBtn">
                  <button className="btn btn-primary">Search</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      
        <div
          className="mainLowerSection"
        >

        </div>
     
    </div>
  );
}

export default MainContainer;
