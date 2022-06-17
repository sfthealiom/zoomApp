import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";

import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./reduxFolder/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <BrowserRouter basename={`/`}>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
);
