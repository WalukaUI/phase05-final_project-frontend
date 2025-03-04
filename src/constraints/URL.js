
// const BASE_URL=
// process.env.NODE_ENV === "development"
// ?"http://localhost:3000"
// :"https://twodbsin1bkend.onrender.com"

const BASE_URL=
process.env.NODE_ENV === "development"
?"http://localhost:3000"
:"http://rails-api-balancer-456754264.us-east-2.elb.amazonaws.com"

export default BASE_URL


//"https://guarded-hamlet-25175.herokuapp.com"
//https://doc-appointment-booking-app.onrender.com
//https://cnc-and-docapp-webservice.onrender.com
