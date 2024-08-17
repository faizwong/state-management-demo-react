import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Providers from "./Providers.tsx";
import App from "./App";
import "./index.css";

import makeServer from "./server";

makeServer({ environment: "development" });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
