import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./Maindiv.css";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import Doctors from "./Doctors/Doctors";
import Home from "./Home/Home"
import DoctorLogin from "./Login/DoctorLogin/DoctorLogin";
import BASE_URL from "../constraints/URL";
import Locations from "./Locations/Locations";
import DoctorProfile from "./Doctors/DoctorProfile";
import Patients from "./Patients/Patients";
import PatientLogin from "./Login/PatientLogin/PatientLogin";
import Appointments from "./Appointments/Appointments";
import NewAppiontment from "./Appointments/NewAppointment"

function MainContainer() {
  const [user,setUser]=useState(null)
  const [doctors, setDoctors] = useState(null);

  useEffect(() => {
    fetch(BASE_URL + `/doctors`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setDoctors(data);
        });
      }
    });
  }, []);

 //LOGOUT

  function logout() {
    fetch(BASE_URL + `/logout`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => setUser(null));
  }


  return (
    <Router>
      <div className="mainDiv">
        <NavBar logout={logout} user={user}/>
        <div className="covidWarnning">
          <div>
            All Locations are open,{" "}
            <a href="!#">
              see covid restrictions
              <img src="../close.png" alt="close" />
            </a>
          </div>
        </div>

        <Switch>
          <Route path="/doctorlogin" exact>
            <DoctorLogin setUser={setUser}/>
          </Route>
          <Route path="/patientlogin" exact>
            <PatientLogin setUser={setUser}/>
          </Route>
          <Route path="/locations" exact>
            <Locations />
          </Route>
          <Route path="/doctors" exact>
            <Doctors doctors={doctors}/>
          </Route>
          <Route path="/doctors/:id" exact>
            <DoctorProfile />
          </Route>
          <Route path="/patients" exact>
            <Patients />
          </Route>
          <Route path="/newappointment" exact>
            <NewAppiontment doctors={doctors} user={user}/>
          </Route>
          <Route path="/appointments" exact>
            <Appointments user={user}/>
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default MainContainer;
