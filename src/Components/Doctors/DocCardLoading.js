import React from "react";
import "./Loading.css";

function CardLoadAnimation() {
  return (
    <div>
      <div className="card is-loading animatedCard">
        <div className="aniCardcontent">
          <div>
            <img className="loadingImg" alt=""/>
          </div>
          <div className="lodetextDiv">
            <h2 className="cardH2">{}</h2>
            <p className="cardP">Card is loading. It will take max 40sec to load</p>
          </div>
        </div>
      </div>
      <div className="card is-loading animatedCard">
        <div className="aniCardcontent">
          <div>
            <img className="loadingImg" alt=""/>
          </div>
          <div className="lodetextDiv">
            <h2 className="cardH2">{}</h2>
            <p className="cardP"></p>
          </div>
        </div>
      </div>
      <div className="card is-loading animatedCard">
        <div className="aniCardcontent">
          <div>
            <img className="loadingImg" alt="" />
          </div>
          <div className="lodetextDiv">
            <h2 className="cardH2">{}</h2>
            <p className="cardP"></p>
          </div>
        </div>
      </div>
      <div className="card is-loading animatedCard">
        <div className="aniCardcontent">
          <div>
            <img className="loadingImg" alt=""/>
          </div>
          <div className="lodetextDiv">
            <h2 className="cardH2">{}</h2>
            <p className="cardP"></p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardLoadAnimation;
