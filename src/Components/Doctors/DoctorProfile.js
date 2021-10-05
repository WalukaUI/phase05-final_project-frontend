import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../../constraints/URL"

function DoctorProfile(){

    const [doctorProfile, setDoctorProfile] = useState(null);

  const params = useParams();
  useEffect(() => {
    fetch(BASE_URL + `/doctors/${params.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => setDoctorProfile(data));
  }, [params.id]);


    return(
        <div><p>fhdhf</p></div>
    )
}

export default DoctorProfile