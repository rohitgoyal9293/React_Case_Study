import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
//import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
// import "font-awesome/css/font-awesome.css";

ReactDOM.render(
 <BrowserRouter>
    <App />
 </BrowserRouter>, 
 document.getElementById("root"));
