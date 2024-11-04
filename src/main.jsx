import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./redux/store.js";
// axios.defaults.withCredentials = true;
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer
        theme="colored"
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
      />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
