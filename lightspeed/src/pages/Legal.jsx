import React from 'react';
import './Legal.css';

export default function Legal() {
  return (
    <div className="legal-container">
      <h1>Legal</h1>
      
      <section>
        <h2>Privacy Policy</h2>
        <p>Last updated: August 2026</p>
        <p>Your privacy is important to us. It is LightSpeed's policy to respect your privacy regarding any information we may collect from you across our website and applications.</p>
        <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
        <p>We don't share any personally identifying information publicly or with third-parties, except when required to by law.</p>
      </section>

      <section>
        <h2>Terms of Service</h2>
        <p>By accessing the website at LightSpeed, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
        <p>In no event shall LightSpeed or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on LightSpeed's website.</p>
      </section>
    </div>
  );
}
