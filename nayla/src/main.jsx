import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ReactDOM from "react-dom";
import "./css/index.css";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);

//ReactDOM.render(<App/>,document.getElementById("root"));
