import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./View/App";

import { Amplify } from "aws-amplify";
import config from "./aws-exports";
import { BrowserRouter } from "react-router-dom";
Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
