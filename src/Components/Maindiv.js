import React, { useState, useEffect, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./Maindiv.css";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import Doctors from "./Doctors/Doctors";
import Home from "./Home/Home";
import DoctorLogin from "./Login/DoctorLogin/DoctorLogin";
import BASE_URL from "../constraints/URL";
import Locations from "./Locations/Locations";
import DoctorProfile from "./Doctors/DoctorProfile";
import Patients from "./Patients/Patients";
import PatientLogin from "./Login/PatientLogin/PatientLogin";
import Appointments from "./Appointments/Appointments";
import NewAppiontment from "./Appointments/NewAppointment";
import SignUp from "./SignUp/SignUp";
import PatientProfile from "./Profile/PatientProfile";
import DocProfile from "./Profile/DocProfile";
import Covid19 from "./Covid19/Covid19";
import ClinicGidlines from "./Covid19/ClinicGuidlines";
import BackendUnavailabilityMainPage from "./BackendUnavailability/BackendUnavailabilityMainPage.js"

export const UserContext = createContext();
function MainContainer() {
  const [user, setUser] = useState(null);
  const [appointments, setAppoinements] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [locations, setLocations] = useState(null);
  const [getAddress, setAddress] = useState("");

  // auto-login----------------------

  useEffect(() => {
    let userRole = localStorage.getItem("role");
    fetch(userRole === "patient" ? BASE_URL + `/me` : BASE_URL + `/doc`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
        });
      }
    });
  }, []);

  // LOGOUT-----------------------

  function logout() {
    fetch(BASE_URL + `/logout`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      setUser(null);
      setAddress("");
    });
  }
  // GET Locations-------------------

  useEffect(() => {
    fetch(BASE_URL + "/locations", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => setLocations(data));
  }, []);

  // GET Doctors------------------------

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

  return (
    <div className="mainDiv">
      <UserContext.Provider value={user}>
        <NavBar
          logout={logout}
          getAddress={getAddress}
          setAddress={setAddress}
        />
        <div className="covidWarnning">
          <ClinicGidlines />
          <BackendUnavailabilityMainPage/>
        </div>

        <Routes>
          <Route path="/covid19" element={<Covid19 />} />
          <Route
            path="/doctorlogin"
            element={<DoctorLogin setUser={setUser} />}
          />
          <Route
            path="/patientlogin"
            element={<PatientLogin setUser={setUser} />}
          />
          <Route
            path="/locations"
            element={<Locations locations={locations} />}
          />
          <Route
            path="/doctors"
            element={<Doctors doctors={doctors} user={user} />}
          />
          <Route path="/doctors/:id" element={<DoctorProfile user={user} />} />
          <Route
            path="/patients"
            element={<Patients locations={locations} user={user} />}
          />
          <Route
            path="/signup"
            element={<SignUp locations={locations} setUser={setUser} />}
          />
          <Route
            path="/profile"
            element={
              user?.role === "patient" ? (
                <PatientProfile
                  user={user}
                  appointments={appointments}
                  locations={locations}
                  setUser={setUser}
                />
              ) : (
                <DocProfile
                  user={user}
                  appointments={appointments}
                  locations={locations}
                  setUser={setUser}
                />
              )
            }
          />
          <Route
            path="/newappointment"
            element={
              <NewAppiontment
                doctors={doctors}
                user={user}
                setAppoinements={setAppoinements}
                appointments={appointments}
              />
            }
          />
          <Route
            path="/appointments"
            element={
              <Appointments
                user={user}
                setAppoinements={setAppoinements}
                appointments={appointments}
                doctors={doctors}
                setUser={setUser}
              />
            }
          />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </UserContext.Provider>
    </div>
  );
}
export default MainContainer;
