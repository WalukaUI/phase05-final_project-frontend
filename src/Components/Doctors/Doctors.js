import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Doctors.css";
import Doctor from "./DoctorCard";
import CardLoadAnimation from "./DocCardLoading";


function Doctors({ doctors }) {

  const [searchParams, setSearchParams]=useSearchParams({searchTearm: '',docSpeciality: '',acceptNewPatients: false, videoVisits: false })
  const [dragger,setDragger]=useState(false)



  
  const searchTerm=searchParams.get("searchTerm")
  const speciality=searchParams.get("speciality")
  const acceptNewPatients=false
  const videoVisits=false


  function activeSearch(e) {
    e.preventDefault();
    setSearchParams(prev=>{ prev.set("searchTerm", e.target.value)
    return prev
    }, {replace: true})
  }

  function setValues(keys,values){
    // setSearchParams(prev=>{
    //   prev.set(keys,values)
    //   return prev
    // }, {replace: true})
  }


const containers=document.querySelectorAll(".container");
const draggables=document.querySelectorAll(".draggable");
const maindraggableDiv=document.getElementById("dragAndDropMainDiv");

if(dragger){
  maindraggableDiv.addEventListener("mouseover", (e) => {
   let innetTxt=document.querySelector('.blankContainer').textContent
   if(innetTxt===""){

    setValues("acceptNewPatients",false)
    setValues("videoVisits",false)
   }else if(innetTxt==="Accepting Video Visits"){

    setValues("acceptNewPatients",false)
    setValues("videoVisits",true)
   }else if(innetTxt==="Accepting New Patients"){

    setValues("acceptNewPatients",true)
    setValues("videoVisits",false)
   }else{

    setValues("acceptNewPatients",true)
    setValues("videoVisits",true)
    }
   })
  }
draggables.forEach(draggable=> {
    draggable.addEventListener("dragstart" || "touchstart", ()=>{
        draggable.classList.add("dragging")
    })
    draggable.addEventListener("dragend" || "touchend", ()=>{
        draggable.classList.remove("dragging")
    })
})

containers.forEach(container =>{
    container.addEventListener("dragover" || "touchmove",(e)=>{
        e.preventDefault()
        let draggable=document.querySelector(".dragging")
        container.appendChild(draggable)
    })
})
  return (
    <div>
      <div className="row doctorMainDiv" style={{ marginRight: "0" }}>
        <div className="col col-sm-12 col-md-3 docSearchDiv">
          <form>
          <h6>Search Doctors by Name</h6>
            <input
              type="text"
              onChange={activeSearch}
              className="form-control"
              placeholder="Doctor name"
            />
                       <div className="filterBySpeciality">
                <br></br>
                <p>
                  <strong>Speciality</strong>
                </p>
                <label>Select a Doctor by Speciality</label>
                <select
                  className="form-select"
                  name="speciality"
                  aria-label="Default select example"
                  onChange={e=>setSearchParams(prev=>{prev.set("docSpeciality",e.target.value)
                  return prev
                  }, {replace: true})
                 }
                >
                  <option value="All">All</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Family medicine">Family medicine</option>
                  <option value="Anesthesiology">Anesthesiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Preventive medicine">
                    Preventive medicine
                  </option>
                </select>
              </div>
            <div className="serchFilter">
              <br></br>
              <h6>Narrow Your Results</h6>
              <p>Drag and drop filters to blank area</p>
              <div className="dragAndDropMainDiv" id="dragAndDropMainDiv" onMouseDown={()=>setDragger(true)} >
                <div className="container">
                  <p className="draggable btn btn-light" draggable="true" onTouchStart={()=>setDragger(true)}>Accepting New Patients</p>
                  <p className="draggable btn btn-light" draggable="true" onTouchStart={()=>setDragger(true)}>Accepting Video Visits</p>
                </div>
                <div className="excahngeIconDiv">
                <img className="excahngeIcon" src="exchange.png" alt="arrow" />
                </div>
                <div className="container blankContainer" id="blankContainer" data-text="Drag and drop filters">
                </div>
              </div>

            </div>
          </form>
        </div>
        <div className="col col-sm-12 col-md-9 formnput">
          {doctors === null ? (
            <div>
            <CardLoadAnimation />
            </div>
          ) : (
            doctors
              .filter((card) =>
                card.last_name.toLowerCase().includes(searchTerm?searchTerm.toLowerCase():"") || card.first_name.toLowerCase().includes(searchTerm?searchTerm.toLowerCase():"")
              )
              .filter((card) =>
                acceptNewPatients ? card.isaccept_newpatients === true : card
              )
              .filter((card) =>
                videoVisits ? card.video_vistits === true : card
              )
              .filter((card) => {
                switch (speciality) {
                  case "Dermatology":
                    return card.speciality === "Dermatology";
                  case "Family medicine":
                    return card.speciality === "Family medicine";
                  case "Anesthesiology":
                    return card.speciality === "Anesthesiology";
                  case "Preventive medicine":
                    return card.speciality === "Preventive medicine";
                  case "Pediatrics":
                    return card.speciality === "Pediatrics";
                  default:
                    return card;
                }
              })
              .map((card) => <Doctor key={card.id} card={card} />)
          )}
        </div>
      </div>
    </div>
  );
}
export default Doctors;