import React, { useState } from "react";
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
import DoctorLogin from "./Login/DoctorLogin/DoctorLogin"
import BASE_URL from "../constraints/URL";
import Locations from "./Locations/Locations";
import DoctorProfile from "./Doctors/DoctorProfile"

function MainContainer() {
  const [user,setUser]=useState(null)

 //LOGOUT

  function logout() {
    fetch(BASE_URL + `/logout`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => setUser(null));
    //setisloggedin(false);
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
          <Route path="/locations" exact>
            <Locations />
          </Route>
          <Route path="/doctors" exact>
            <Doctors />
          </Route>
          <Route path="/doctors/:id" exact>
            <DoctorProfile />
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
