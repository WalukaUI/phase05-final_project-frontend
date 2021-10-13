import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import {
  Link
 } from "react-router-dom";
import "./Covid19.css"

function CovidInfoByState() {
  const [data, setData] = useState(null);
  const [country, setCountry]=useState(null)

  useEffect(() => {
    fetch("https://api.covid19api.com/summary").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
          setData(data);
        });
      } else {
        alert("fetching failed");
      }
    });
  }, []);


  function handlecountry(e) {
    e.preventDefault()
    setCountry(e.target.value === "All" ? null : e.target.value)
  }


  if (data === null) return null;
  return (
    <>
    <div style={{paddingTop: "10px", display: "flex", justifyContent: "right"}}>
      <Link className="btn btn-danger" to="/" style={{width: "150px"}}>Close</Link>
      </div>
    <div style={{backgroundColor: "#f7e2c8"}}>
      <h5>Global covid Status by Today</h5>

      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">New Confirmed</th>
              <th scope="col">Total Confirmed</th>
              <th scope="col">New Deaths</th>
              <th scope="col">TotalDeaths</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{data.Global.NewConfirmed}</th>
              <td>{data?.Global.TotalConfirmed}</td>
              <td>{data?.Global.NewDeaths}</td>
              <td>{data?.Global.TotalDeaths}</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    <div style={{backgroundColor: "#faebd7"}}>
      <h5>Check Current covid status by Country </h5>
      <label>Select Country
      <select
        className="form-select"
        name="country"
        aria-label="Default select example"
        onChange={handlecountry}
      >
         <option value="All">All </option>
        {data.Countries?.map((card) => (
          <option value={card.Country} key={card.id}>
            {card.Country}
          </option>
        ))}
      </select></label>
      
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Country</th>
              <th scope="col">By Date</th>
              <th scope="col">New Confirmed</th>
              <th scope="col">Total Confirmed</th>
              <th scope="col">New Deaths</th>
              <th scope="col">Total Deaths</th>
            </tr>
          </thead>
          <tbody>
          {data.Countries.filter((card)=> country !== null ? card.Country === country: card ).map((card)=>{
              return <> <tr>
              <th style={{textAlign: "left", paddingLeft: "20px"}}>{card.Country}</th>
              <td>{card.date}</td>
              <td>{card.NewConfirmed}</td>
              <td>{card.TotalConfirmed}</td>
              <td>{card.NewDeaths}</td>
              <td>{card.TotalDeaths}</td>
            </tr>
            <hr/></>
            })}
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
}

export default CovidInfoByState;
