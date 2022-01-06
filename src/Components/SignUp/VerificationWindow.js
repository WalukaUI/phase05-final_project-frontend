import React from "react";
import "./SignUp.css";
import "./Spinner.css";

export default function EmailVerificationWindow({
  handleConfirmation,
  setConfirmWindow,
  confirmWindow,
}) {
  return (
    <div className="popupbox">
      <div className="popupinner">
        <div className="confirmNumDiv">
          <form onSubmit={handleConfirmation}>
            <div className="form-group">
              <h4>Please confirm your email </h4>
              <hr />
              <p>
                Please check your emails.
                <br />
                We have sent you a <strong>Confirmation number</strong> to your
                email address
              </p>
              <br />
              <hr />
              <label>Enter confirmation number : </label>
              <input id="confirmNumber" />

              <div className="spinner">
                <div class="lds-spinner">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>

              <div>
                <button type="submit" className="btn btn-success formSubBtn">
                  Confirm
                </button>
                <button
                  className="btn btn-warning formSubBtn"
                  onClick={() => setConfirmWindow(!confirmWindow)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
