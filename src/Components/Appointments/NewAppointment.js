import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./NewAppointment.css";
import BASE_URL from "../../constraints/URL";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function NewAppiontment({ doctors, user , setAppoinements, appointments}) {
  const [newAppointment, setNewAppointment] = useState({});
  const [errors, setErrors] = useState(null);
  const [selecteddate, setSelectedDate]=useState(null)
  const[searchTearm,setSearchTearm]=useState("")

  const history = useHistory();

//POST Appointment------------------------

  function handleSubmit(e) {
     e.preventDefault();
    fetch(BASE_URL + `/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newAppointment),
    }).then((res) => {
      if (res.ok) {
        res.json().then((booking) => {
            console.log(booking);
        setAppoinements([...appointments,booking])
        history.push("/appointments")
        });
      } else {
        res.json().then((err) => {
            console.log(err.errors);
          setErrors(err.errors);
        });
      }
    });
  }

  //Supportive Functions----------------------
  
  function handleNewAppointment(e) {
    e.preventDefault();
    let newBooking = { ...newAppointment, 
        "patient_id": user.id, 
        "status": "open",
        "date":selecteddate, 
        [e.target.name]: e.target.value };
    
    setNewAppointment(newBooking);
  }

  function activeSearch(e) {
    e.preventDefault()
    setSearchTearm(e.target.value)
  }

  return (
    <div className="row">
      <div className="col col-sm-12 col-md-6">
        <div className="serchDoctor">
        <form>
            <input
              type="text"
              className="form-control"
              placeholder="Search Doctors By Last Name"
              onChange={activeSearch}
            />
          </form>
        </div>

        {doctors.filter((card)=>card.last_name.toLowerCase().includes(searchTearm.toLowerCase()))
        .map((doctor) => (
          <div key={doctor.id}>
            <div>
              <div className="row doctorCrad">
                  <div className="col col-sm-12 col-md-4 docImage">
                    <img
                      className="doccardImage"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPPYSMvGn6iF_kZQs8YyU1jm4VczEPSx2Lpw&usqp=CAU"
                      alt="doctor"
                    />
                  </div>
                  <div className="col col-md-4">
                    <h5>
                      {doctor.first_name} {doctor.last_name}
                    </h5>
                    <p>{doctor.speciality}</p>
                    <p>{doctor.education}</p>
                  </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="col col-sm-12 col-md-6">
        <form onSubmit={handleSubmit}>
          <div className="form-group newAppointmentForm">
            <h4>Create a new Appointment</h4>
            <label>Select a Doctor</label>
            <select
                    className="form-select"
                    name="doctor_id"
                    aria-label="Default select example"
                    onChange={handleNewAppointment}
                  >
                 {doctors.map((card)=> <option value={card.id} key={card.id}>{card.first_name} {card.last_name}</option>)}

                  </select>
            <label>Select a Date</label>
            <div>
            <DatePicker 
            name="date"
            className="form-select"
            selected={selecteddate} 
            onChange={(date) => setSelectedDate(date)} 
            dateFormat="dd/MM/yy"
            filterDate={date => date.getDay() !== 6 && date.getDay() !== 0}
            />
            </div>
            <label>Time</label>
                  <select
                    className="form-select"
                    name="time"
                    aria-label="Default select example"
                    onChange={handleNewAppointment}
                  >
                    <option value="0900">9.00 am - 10.00 am</option>
                    <option value="1000">10.00 am - 11.00 am</option>
                    <option value="1100">11.00 am - 12.00 pm</option>
                    <option value="1300">1.00 pm - 2.00 pm</option>
                  </select>
                  <button type="submit" className="btn btn-primary formSubBtn">
              Submit
            </button>
          </div>
        </form>
        <div>
            {errors ? <p style={{ color: "red", marginTop: "10px" }}>Please fill all lines of the form</p>:null }
          {/* {errors 
            ? errors.map((e) => (
                <p style={{ color: "red", marginTop: "10px" }}>{e}</p>
              ))
            : null} */}
        </div>
      </div>
    </div>
  );
}

export default NewAppiontment;
