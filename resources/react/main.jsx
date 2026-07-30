import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/sidebar.css";
import "./styles/header.css";
import "./styles/dashboard.css";
import "./styles/builder.css";

ReactDOM.createRoot(document.getElementById("sbb-app")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);