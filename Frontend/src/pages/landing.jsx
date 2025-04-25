import React from "react";
import "../App.css"
import { Link, useNavigate } from "react-router-dom";


export default function LandingPage() {
  const router = useNavigate();
  return (
    <div className="LandingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>Echoris</h2>
        </div>
        <div className="navList">

          <p onClick={()=>{
            router("/hjkfe324");
          }}>Join as guest</p>

          <p onClick={() =>{
            router("/auth");
          }}>Register</p>

          <div onClick={() =>{
            router("/auth")
          }} role="button">Login</div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1>
            <span style={{ color: "#fdebda" }}>Echoes</span> That Cross Realms
          </h1>
          <p>Cover the distance </p>
          <div role="button">
            <Link to={"/auth"}>Get started</Link>
          </div>
        </div>

        <div>
          <img src="/mainIcon.svg" alt="" />
        </div>
      </div>
    </div>
  );
}