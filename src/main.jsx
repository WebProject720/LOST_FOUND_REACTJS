import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { ReduxStore, persistor } from "./ReduxStore/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={ReduxStore}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <React.StrictMode> */}
        <App />
      {/* </React.StrictMode> */}
    </PersistGate>
  </Provider>
);
