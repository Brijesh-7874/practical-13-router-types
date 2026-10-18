import React from 'react';
import { MemoryRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

function MemoryView() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="sub-box">
      <p>Current Internal Path: <strong>{location.pathname}</strong></p>
      <p className="note">Note: The browser address bar URL did NOT change at all!</p>
      <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
        <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm">← Back in Memory</button>
        <button onClick={() => navigate(+1)} className="btn btn-outline btn-sm">Forward in Memory →</button>
      </div>
    </div>
  );
}

function MemoryRouterDemo() {
  return (
    <div className="demo-block">
      <h3>2. MemoryRouter Live Demonstration</h3>
      <p className="demo-desc">
        <code>MemoryRouter</code> keeps its history entirely in an in-memory array. It does not read or write to the browser's address bar.
      </p>

      <div className="embedded-app">
        <MemoryRouter initialEntries={['/dashboard', '/messages', '/analytics']} initialIndex={0}>
          <div className="embedded-nav">
            <Link to="/dashboard" className="btn btn-sm">Dashboard</Link>
            <Link to="/messages" className="btn btn-sm">Messages</Link>
            <Link to="/analytics" className="btn btn-sm">Analytics</Link>
          </div>
          <Routes>
            <Route path="*" element={<MemoryView />} />
          </Routes>
        </MemoryRouter>
      </div>

      <div className="use-case-card">
        <strong>💡 Ideal Use Cases:</strong>
        <ul>
          <li>Unit and integration testing (Jest, React Testing Library, Vitest) where no browser DOM address bar exists.</li>
          <li>React Native mobile applications where screen navigation isn't tied to a browser URL bar.</li>
          <li>Embedded widgets or modals inside larger non-React host portals.</li>
        </ul>
      </div>
    </div>
  );
}

export default MemoryRouterDemo;
