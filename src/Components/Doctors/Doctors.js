import React from "react";
import "./Doctors.css";

function Doctors() {

    return(
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
    )
}
export default Doctors