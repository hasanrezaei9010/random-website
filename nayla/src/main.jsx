import { StrictMode,useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter,useLocation } from "react-router-dom";
import App from "./App.jsx";
import ReactDOM from "react-dom";

function ScrollToTop() {
  const {pathname} = useLocation();

  useEffect(()=>{
    window.scrollTo(0,0);
  },[pathname]);
  return null;
}

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
    <ScrollToTop/>
      <App />
    </BrowserRouter>
);

//ReactDOM.render(<App/>,document.getElementById("root"));
