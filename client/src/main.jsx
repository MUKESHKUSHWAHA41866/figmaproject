import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppContext from "./context/AppContext.jsx";
import 'react-slideshow-image/dist/styles.css'

createRoot(document.getElementById("root")).render(
  <AppContext>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </AppContext>
);
