import React from "react";
import ReactDOM from "react-dom/client";
import App from "@app";
import { worker } from "./mocks/browser";

if (import.meta.env.VITE_MOCKS === "true") {
  worker.start();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
