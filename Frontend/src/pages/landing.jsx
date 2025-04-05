import React from 'react'
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className='LandingPageContainer'>
      <nav>
        <div className='navHeader'>
          <h2>Echoris</h2>
        </div>
        <div className='navList' >
            <p>Join as guest</p>
            <p>Register</p>
            <div role='button'>
              Login
            </div>
        </div>
      </nav>

        <div className="landingMainContainer">
          <div>
            <h1><span style={{color:"orange"}}>Connect </span>with your loved ones</h1>
            <p>Cover the distance </p>
            <div role='button'>
              <Link to={"/auth"}>Get started</Link>
            </div>
          </div>

          <div>
            <img src="/public/2.svg" alt="" />
          </div>
        </div>
    </div>
  )
}

