
const BASE_URL=
process.env.NODE_ENV === "development"
?"http://localhost:3000"
:"https://guarded-hamlet-25175.herokuapp.com"

export default BASE_URL
