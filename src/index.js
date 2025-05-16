import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts
import Sidebar from "components/Sidebar/Sidebar";

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts
import Landing from "views/Landing.js";

import Welcome from "views/Welcome.js";
import MyProfil from "views/MyProfil.js"
import Acceuil from "views/Acceuil.js";
import VerifyEmailPage from "views/VerifyEmailPage.js";
import Forgotpassword from "views/Forgotpassword.js"
import ResetPassword from "views/ResetPassword.js"
import InterviewManager from "views/InterviewManager.js"


import Recuiter from "views/Recuiter.js"
import Navbar from "components/CandidatNav/Nav";
import FormCandidat from "views/FormCandidat";

ReactDOM.render(
  <BrowserRouter>
  
    <Switch>
      
     
         
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}
     
      <Route path="/landing" exact component={Landing} />
     < Route path="/Recuiter" exact component={Recuiter} />
     < Route path="/MyProfil" exact component={MyProfil} />
     < Route path="/FormCandidat" exact component={FormCandidat} />
     < Route path="/Acceuil" exact component={Acceuil} /> 
     < Route path="/ResetPassword" exact component={ResetPassword} />
     < Route path="/Forgotpassword" exact component={Forgotpassword} />
     < Route path="/VerifyEmailPage" exact component={VerifyEmailPage} />
   
     <   Route path="/InterviewManager" exact component={InterviewManager} />
 
     Acceuil
      <Route path="/" exact component={Welcome} />
    
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
      
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
