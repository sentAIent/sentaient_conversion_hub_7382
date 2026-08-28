import React from "react";
import ProjectRoutes from "./Routes";
import LegalConsentModal from "./components/LegalConsentModal";
import BiometricGate from "./components/BiometricGate";
import AiCompanionOverlay from "./components/AiCompanionOverlay";
import GlobalErrorBoundary from "./components/GlobalErrorBoundary";

function App() {
  return (
    <GlobalErrorBoundary>
      <BiometricGate>
        <LegalConsentModal />
        <ProjectRoutes />
        <AiCompanionOverlay />
      </BiometricGate>
    </GlobalErrorBoundary>
  );
}

export default App;
