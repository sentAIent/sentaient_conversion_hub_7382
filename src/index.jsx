import React from "react";
// import * as Sentry from "@sentry/react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";
import "./envValidation";
import { initSecurityChecks } from "./utils/security";
import { initTelemetry } from "./utils/telemetry";

initSecurityChecks();
initTelemetry();

import * as Sentry from "@sentry/react";
// Initialize Sentry

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN || "",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: import.meta.env.PROD ? 0.2 : 1.0, 
  replaysSessionSampleRate: import.meta.env.PROD ? 0.05 : 0.1, 
  replaysOnErrorSampleRate: 1.0, 
  enabled: import.meta.env.PROD && !!import.meta.env.VITE_SENTRY_DSN,
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
