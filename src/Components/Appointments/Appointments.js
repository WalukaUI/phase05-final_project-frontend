import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Appointments.css";
import BASE_URL from "../../constraints/URL";
import AppointmentCard from "./AppointmentCard";

function Appointments({ user, appointments, setAppoinements, doctors}) {
  const[serchTearm,setSearchTearm]=useState(null)

  //GET Appointments-------------------------
  useEffect(() => {
    fetch(user?.role === "patient"? `${BASE_URL}/patients/${user?.id}/appointments`
        : `${BASE_URL}/doctors/${user?.id}/appointments`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setAppoinements(data);
        });
      }
    });
  }, [user?.role, user?.id, setAppoinements]);

  //DELETE Appointment-----------------------

  function deleteAppointment(id) {
    fetch(BASE_URL + `/appointments/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const newAppointmentsList = appointments.filter(
      (appointment) => appointment.id !== id
    );
    setAppoinements(newAppointmentsList);
  }

  //PATCH Appointment-------------------------

  function editAppointment(data) {
    fetch(BASE_URL + `/appointments/${data.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }).then((res)=>{
      if(res.ok){
        res.json().then((obj)=>{
          const newData = appointments.filter((app) => app.id !== data.id);
          setAppoinements([...newData, obj]);
        })
      }else{
        res.json().then((err) => {
          console.log(err.error);
        });
      }
    })
  }

  function handleSearch(e) {
    e.preventDefault();
    if(e.target.value === "All"){
      setSearchTearm(null)
    }else{
      let value=parseInt(e.target.value)
      setSearchTearm(value)
    }
  }

  
  if (!appointments) return null;

  return (
    <div className="row mainAppointmentContainer">
      <div className="col col-md-4 col-sm-12 docSearchDiv">
        <h6>Search appointments by Doctor name</h6>
             <label>Select a Doctor
        <select
          className="form-select"
          name="doctor_id"
          aria-label="Default select example"
          onChange={handleSearch}
        >
           <option value="All">All </option>
          {doctors.map((card) => (
            <option value={card.id} key={card.id+66}>
              {card.first_name} {card.last_name}
            </option>
          ))}
        </select></label>

        <div className="serchFilter" style={{marginTop: "20px"}}>
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
        {user?.role === "patient" ?
        <Link to="/newappointment">
          <button className="btn createAppointmentBtn">
            Schedule an Appointment
          </button>
        </Link> : ""}
      </div>
      <div className="col col-md-8 col-sm-12 appointmentMainDiv">
        <div className="appointmentCardHead">
          {appointments?.length !== 0 ? ( 
             user?.role === "patient" ?<h4>Your All Appointments</h4>:<h4>Appointments</h4>
            
          ) : (
            <div>
              <h4>You do not have any Appointments</h4> 
              {user?.role === "patient" ? 
              <Link to="/newappointment">
                <button className="btn createAppointmentBtn">
                  Schedule an Appointment
                </button>
              </Link>: ""}
            </div>
          )}
        </div>

        {appointments?.filter((card)=> serchTearm !== null ? card.doctor_id === parseInt(serchTearm): card)
        .map((card) => {

             var number= card.time
             var output = [];
             while (number) {
              output.push(number % 10);
              number = Math.floor(number/10);
             }

            let aa=output.reverse().slice(-2).join('')
            let bb=output.slice(0,2).join('')
            let dd=parseInt(bb)
            let bookingtime=`${bb}.${aa} ${dd > 11? "pm": "am"}`

          return <AppointmentCard
            key={card.id+85}
            card={card}
            bookingtime={card.time}
            deleteAppointment={deleteAppointment}
            doctors={doctors}
            editAppointment={editAppointment}
          />
})}
      </div>
    </div>
  );
}

export default Appointments;
