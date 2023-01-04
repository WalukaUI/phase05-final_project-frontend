import "./backendUnAvailability.css"

function BackendUnavailabilityMainPage(){
    return<>
        <div className="errorPage">
            <div className="errorContent">
                <h6>Sorry for the inconvenience, Site under maintenance since Heroku free account is no longer support for the postgres</h6>
                <img  alt="Heroku_error" src="../HerokuError/Heroku.jpg" style={{paddingTop: "20px"}}/>
            </div>
        </div>
        </>
}
export default BackendUnavailabilityMainPage;