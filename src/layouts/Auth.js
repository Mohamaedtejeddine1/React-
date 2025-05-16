import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

// views

import Login from "views/auth/Login.js";
import Login2 from "views/auth/Login2.js"; // login for admin
import forget from "views/auth/forget";
import Register from "views/auth/Register.js";
import ResetPassword from "views/ResetPassword.js";


export default function Auth() {
  return (
    <>

      <Navbar transparent />
   
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
           <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
              
                "url(" + require("assets/img/bg2.png").default + ")",
            }}
          ></div> 
          <Switch>
          

          <Route path="/auth/login" exact component={Login} />
          <Route path="/auth/Login2" exact component={Login2} />
          <Route path="/auth/forget" exact component={forget} />
          <Route path="/auth/register" exact component={Register} />
          <Route path="ResetPassword" exact component={ResetPassword} />
          
          
  
         
          
            <Redirect from="/auth" to="/auth/login" />
            
          </Switch>
          
        </section>
        <Footer/>
      </main>
    </>
  );
}
