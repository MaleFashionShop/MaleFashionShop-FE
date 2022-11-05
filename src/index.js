import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import Context from "./context/Context";
import {AuthProvider} from './context/AuthProvider';

ReactDOM.render(
  <React.StrictMode>
    <Context >
      <AuthProvider>
        <App />
      </AuthProvider>
    </Context>
  </React.StrictMode>,
  document.getElementById("root")
);
