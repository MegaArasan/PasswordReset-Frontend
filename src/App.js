import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { Typography } from "@mui/material";
import { Login } from "./components/Login.js";
import { Signup } from "./components/Signup.js";
import { ForgotPassword } from "./components/ForgotPassword.js";
import { Mailsent } from "./components/Mailsent.js";
import { Resetpassword } from "./components/Resetpassword.js";
import { Changepass } from "./Changepass";
import * as React from "react";
import { Message } from "./Message.js";


export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/forgotpassword">
          <ForgotPassword />
        </Route>
        <Route exact path="/forgotpassword/verify/:id">
          <Changepass />
        </Route>
        <Route exact path="/forgotpassword/mailsent">
          <Mailsent />
        </Route>
        <Route exact path="/resetpassword/:id">
          <Resetpassword />
        </Route>
        <Route exact path="/successmsg">
          <Message />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="dashboard">
      <Typography variant="h2" sx={{ fontFamily: "Aladin" }}>
        Coming Soon
      </Typography>
    </div>
  );
}


