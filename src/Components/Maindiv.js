import React from "react";
import NavBar from "./NavBar/NavBar";
import "./Maindiv.css";

function MainContainer() {
  return (
    <div>
      <NavBar />
      <div className="covidWarnning">
        <div>
          All Locations are open, <a>see covid restrictions<img src="../close.png"/></a>
        </div>
       
      </div>
    </div>
  );
}

export default MainContainer;
