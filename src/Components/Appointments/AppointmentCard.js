import React, { useState } from "react";
import "./Appointments.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loading from "../Doctors/DocCardLoading"

function AppointmentCard({
  card,
  bookingtime,
  deleteAppointment,
  editAppointment,
  doctors
}) {
  const [updatedAppointment, setUpdatedAppointment] = useState(null);
  const [display, setDisplay] = useState(true);
  const [selecteddate, setSelectedDate] = useState(null);

  function filterDoctorName() {
    let filteredDoc = doctors.filter((doc) => doc.id === card.doctor_id);
    let fname = filteredDoc[0].first_name;
    let lname = filteredDoc[0].last_name;
    return fname + " " + lname;
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
    editAppointment({ ...updatedAppointment, date: selecteddate });
  }
  if (card === null) return <Loading/> 

  //working on to fix card time using time() and time2() func's

  function taketime() {
    if(card.time){
      let ac=(card.time).toString().split('').slice(-2).join('')
      let aw=(card.time).toString().split('').slice(0,2).join('')
      let as=parseInt(aw)>12?"pm":"am"
      return `${aw}.${ac} ${as}`
    }
  }
  //---------------------------------
  // function taketime2(){
  //   var number= card.time
  //   var output = [];
  //   while (number) {
  //    output.push(number % 10);
  //    number = Math.floor(number/10);
  //   }
  //  let lasttwoNums=output.reverse().slice(-2).join('')
  //  let firstTwoNums=output.slice(0,2).join('')
  //  let hours=parseInt(firstTwoNums)
  //  let bookedtime=`${firstTwoNums}.${lasttwoNums} ${hours > 11? "pm": "am"}`
  //  return bookedtime
  // }

  return display ? (
    <div>
      <div className=" row appointmentCard">
        <div className="col col-md-6 col-sm-12">
          <p>
            <b>Date:</b> {card.date}
          </p>
          <p>
            <strong>Time: {card.time} am</strong>
            {typeof(card.time)}
            {bookingtime}
            {setTimeout(taketime,1000)}
{/*         
            {taketime()}
            {taketime2()}
            {card.time}{card.time > 1159? " pm":" am"} */}
         
            
            
          </p>
          <p>
            <strong> Doctor Name:</strong> {filterDoctorName()}
          </p>
        </div>
        <div className="col col-md-6 col-sm-12">
          <button className="btn chnageAppBtn" onClick={handleEditAppointment}>
            Change Appointment
          </button>
          <button className="btn deleteAppBtn" onClick={handleDelete}>
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
                  value={updatedAppointment.doctor_id}
                  aria-label="Default select example"
                  onChange={handleChange}
                >
                  {doctors.map((card) => (
                    <option value={card.id} key={card.id}>
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
