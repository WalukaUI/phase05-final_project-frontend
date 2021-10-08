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
  const [updatedAppointment, setUpdatedAppointment] = useState({});
  const [display, setDisplay] = useState(true);
  const [selecteddate, setSelectedDate] = useState(null);

  function handleDelete(e) {
    e.preventDefault();
    deleteAppointment(card.id);
  }

  function handleChange(e) {
    e.preventDefault();
    let newData = { ...updatedAppointment, [e.target.name]: e.target.value };
    setUpdatedAppointment(newData);
  }

  function handleEdit(e) {
    e.preventDefault();
    editAppointment(card);
  }

  return display ? (
    <div>
      <div className=" row appointmentCard">
        <div className="col col-md-6 col-sm-12">
          <h4>Date: {card.date}</h4>
          <h6>Time: {card.time}</h6>
        </div>
        <div className="col col-md-6 col-sm-12">
          <button
            className="btn patientDetlsBtn"
            onClick={() => setDisplay(!display)}
          >
            Change Appointment
          </button>
          <button
            className="btn btn-danger cardDeleteBtn"
            onClick={handleDelete}
          >
            Delete
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
                  <option value="0900" deaault>
                    9.00 am - 10.00 am
                  </option>
                  <option value="1000">10.00 am - 11.00 am</option>
                  <option value="1100">11.00 am - 12.00 pm</option>
                  <option value="1300">1.00 pm - 2.00 pm</option>
                </select>
                <button type="submit" className="btn btn-primary formSubBtn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppointmentCard;
