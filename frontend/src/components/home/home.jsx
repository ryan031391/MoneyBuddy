import React from "react";
import { Link } from "react-router-dom";


export const Home = ()=>{
    return (
      <div className="home">
        <div className="home-logo">
            <img src={window.logoimg} alt="" />
        </div>
        <div className="home-button">
          <button>
            <Link to="/login">Sign in</Link>
          </button>
          <button>
            <Link to="/signup">Create Account</Link>
          </button>
        </div>
        <div className="background-img"
         style={{backgroundImage: `url(${window.homeimg}`}}>
        </div>
        <h1>
          KEEP TRACK OF EVERY
          <br />
          PENNY YOU SPEND{" "}
        </h1>
      </div>
    );
}
