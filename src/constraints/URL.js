
const BASE_URL=
process.env.NODE_ENV === "development"
?"http://localhost:3000"
:"https://doctorbookingapp.herokuapp.com"

export default BASE_URL