import React, { useEffect}from "react";
import { Link } from "react-router-dom";
import "./Appointments.css";
import BASE_URL from "../../constraints/URL";
import AppointmentCard from "./AppointmentCard"

function Appointments({user, appointments, setAppoinements}){


  useEffect(() => {
    fetch( user.role === "patient" ? `${BASE_URL }/patients/${user.id}/appointments`: `${BASE_URL }/appointments`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
           setAppoinements(data)
        });
      } 
    });
  }, [user.role, user.id, setAppoinements]);

  function deleteAppointment(id){
    fetch(BASE_URL + `/appointments/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const newAppointmentsList = appointments.filter((appointment) => appointment.id !== id);
    setAppoinements(newAppointmentsList);
  }
  

  if (!appointments) return null;

    return (
    <div className="row mainAppointmentContainer">
        <div className="col col-md-4 col-sm-12 docSearchDiv">
          <form>
            <input
              type="number"
              className="form-control"
              placeholder="Date"
            />
            <button className="btn btn-primary searchBtn">Search</button>
            <div className="serchFilter">
              <h6>Narrow Your Results</h6>
              <ul>
                <li className="serchTearms">
                  <label>Sort By Appointment Time</label>
                  <div>
                    <input type="checkbox" />
                  </div>
                </li>
              </ul>
              <h6>More</h6>
              <ul>
                <li className="serchTearms">
                  <label>Appointments Count</label>
                  <div>
                    <p>{appointments.length}</p>
                  </div>
                </li>
              </ul>
            </div>
          </form>
          <Link to="/newappointment"><button className="btn createAppointmentBtn">Schedule an Appointment</button></Link>
        </div>
        <div className="col col-md-8 col-sm-12 appointmentMainDiv">
          
            <div className="appointmentCardHead">
            {appointments.length !== 0 ? 
              <h4>All Appointments</h4>
            :<div><h4>You do not have any Appointments</h4>
            <Link to="/newappointment"><button className="btn createAppointmentBtn">Schedule an Appointment</button></Link>
            </div>}
            </div>
     
     {appointments.map((card)=><AppointmentCard key={card.id} card={card} deleteAppointment={deleteAppointment}/>)}
     </div>
    </div>
    )
}

export default Appointments