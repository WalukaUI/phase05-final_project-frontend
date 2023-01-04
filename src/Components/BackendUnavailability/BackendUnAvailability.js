import "./backendUnAvailability.css"

function BackendUnAvailability(){
    return<><div className="errorPopupbox">
        <div className="errorPopupinner">
            <div className="confirmNumDiv">
                <div className="errorContent">
                <h3>Sorry for the inconvenience, Site under maintenance since Heroku free account is no longer support for the postgres</h3>
                <img  alt="Heroku_error" src="../HerokuError/Heroku.jpg" style={{paddingTop: "20px"}}/>
                </div>
         
        </div>
        </div>
        </div></>
}
export default BackendUnAvailability;

