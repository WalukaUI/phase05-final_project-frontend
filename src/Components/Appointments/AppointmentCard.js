import React from "react";
import { useState } from "react/cjs/react.development";
import "./Appointments.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AppointmentCard({
  card,
  deleteAppointment,
  editAppointment,
  doctors,
}) {
  const [updatedAppointment, setUpdatedAppointment] = useState(null);
  const [display, setDisplay] = useState(true);
  const [selecteddate, setSelectedDate] = useState(null);
  const [docName,setDocname]=useState({})

  function  filterDoctorName() {
    let bb=doctors.filter((doc)=> doc.id == card.doctor_id )
     let fname=bb[0].first_name
     let lname=bb[0].last_name
     return fname +" "+ lname
     
  }
  function handleDelete(e) {
    e.preventDefault();
    deleteAppointment(card.id);
  }

  function handleEditAppointment(e) {
    e.preventDefault();
    setDisplay(!display);
    setUpdatedAppointment(card);
  }
  function handleChange(e) {
    e.preventDefault();
    let newData = { ...updatedAppointment, [e.target.name]: e.target.value };
    setUpdatedAppointment(newData);
  }

  function handleEdit(e) {
    e.preventDefault();
    setDisplay(!display);
    console.log(updatedAppointment);
    // editAppointment(card);
  }

  return display ? (
    <div>
      <div className=" row appointmentCard">
        <div className="col col-md-6 col-sm-12">
          <h4>Date: {card.date}</h4>
          <h6>Time: {card.time}</h6>
          <h6> Doctor Name: {filterDoctorName()}</h6>
        </div>
        <div className="col col-md-6 col-sm-12">
          <button
            className="btn patientDetlsBtn"
            onClick={handleEditAppointment}
          >
            Change Appointment
          </button>
          <button
            className="btn btn-danger cardDeleteBtn"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="btn btn-danger cardDeleteBtn"
            onClick={filterDoctorName}
          >
            Degdgdg
          </button>
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className="popup-box">
        <div className="popup-inner">
          <div className="formDiv div1">
            <form onSubmit={handleEdit}>
              <div className="form-group newAppointmentForm">
                <h4>Update Appointment</h4>
                <label>Select a Doctor</label>
                <select
                  className="form-select"
                  name="doctor_id"
                  value={updatedAppointment.doctor_id}
                  aria-label="Default select example"
                  onChange={handleChange}
                >
                  {doctors.map((card) => (
                    <option value={card.id}>
                      {card.first_name} {card.last_name}
                    </option>
                  ))}
                </select>
                <label>Select a Date</label>
                <div>
                  <DatePicker
                    name="date"
                    className="form-select"
                    selected={selecteddate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd/MM/yy"
                    filterDate={(date) =>
                      date.getDay() !== 6 && date.getDay() !== 0
                    }
                  />
                </div>
                <label>Time</label>
                <select
                  className="form-select"
                  name="time"
                  aria-label="Default select example"
                  onChange={handleChange}
                >
                  <option value="0900">9.00 am - 10.00 am</option>
                  <option value="1000">10.00 am - 11.00 am</option>
                  <option value="1100">11.00 am - 12.00 pm</option>
                  <option value="1300">1.00 pm - 2.00 pm</option>
                </select>
                <div>
                  <button type="submit" className="btn btn-success formSubBtn">
                    Update
                  </button>
                  <button
                    className="btn btn-warning formSubBtn"
                    onClick={() => setDisplay(!display)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppointmentCard;
