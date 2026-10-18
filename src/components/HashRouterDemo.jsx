import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';

function HashHome() {
  return <div className="sub-box">🏡 HashRouter Home View (Notice URL contains #/)</div>;
}
function HashProfile() {
  return <div className="sub-box">👤 HashRouter Profile View (Notice URL contains #/profile)</div>;
}

function HashRouterDemo() {
  return (
    <div className="demo-block">
      <h3>1. HashRouter Live Demonstration</h3>
      <p className="demo-desc">
        <code>HashRouter</code> stores the location in the hash portion of the URL (e.g. <code>window.location.hash</code>).
        Because web servers never send hash fragments in HTTP requests, it requires <strong>zero server rewrite configuration</strong>.
      </p>

      <div className="embedded-app">
        <HashRouter>
          <div className="embedded-nav">
            <Link to="/" className="btn btn-sm">Home (#/)</Link>
            <Link to="/profile" className="btn btn-sm">Profile (#/profile)</Link>
          </div>
          <Routes>
            <Route path="/" element={<HashHome />} />
            <Route path="/profile" element={<HashProfile />} />
          </Routes>
        </HashRouter>
      </div>

      <div className="use-case-card">
        <strong>💡 Ideal Use Cases:</strong>
        <ul>
          <li>Static file hosts where you don't control the HTTP server configuration (e.g. GitHub Pages).</li>
          <li>Offline desktop packages (Electron, Tauri) using <code>file://</code> protocol.</li>
          <li>Legacy web servers with no URL rewrite rules.</li>
        </ul>
      </div>
    </div>
  );
}

export default HashRouterDemo;
