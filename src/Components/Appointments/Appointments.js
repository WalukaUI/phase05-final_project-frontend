import React, {useState, useEffect}from "react";
import "./Appointments.css";
import BASE_URL from "../../constraints/URL";
import AppointmentCard from "./AppointmentCard"

function Appointments({user}){

    const [appointments, setAppoinements] = useState(null);

  useEffect(() => {
    fetch( user.role === "patient" ? `${BASE_URL }/patients/4/appointments`: `${BASE_URL }/appointments`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
            console.log(user.role);
            console.log(user);
            console.log(data)
           setAppoinements(data)
        });
      } 
    });
  }, []);
    return (
    <div>
     {user.role === "patient"? <h4>You have {appointments.length} appointments</h4>: <h4>All Appointments</h4>}
     {appointments.map((card)=><AppointmentCard key={card.id} card={card}/>)}
    </div>
    )
}

export default Appointments