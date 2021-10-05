import React from "react";
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

function MainContainer() {
  return (
    <Router>
      <div className="mainDiv">
        <NavBar />
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
          <Route path="/doctors" exact>
            <Doctors />
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
