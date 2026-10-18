# Practical 13: Router Types (HashRouter, MemoryRouter, StaticRouter)

## 🎯 Aim / Objective
Create a React application demonstrating the working of HashRouter, MemoryRouter, and StaticRouter, and explain where each type of router can be used.

---

## 💻 Source Code

### `src/components/HashRouterDemo.jsx`
```jsx
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

```

### `src/components/MemoryRouterDemo.jsx`
```jsx
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

```

### `src/components/StaticRouterExplanation.jsx`
```jsx
import React, { useState } from 'react';

function StaticRouterExplanation() {
  const [serverUrl, setServerUrl] = useState('/checkout');

  return (
    <div className="demo-block">
      <h3>3. StaticRouter Demonstration (Server-Side Rendering)</h3>
      <p className="demo-desc">
        <code>StaticRouter</code> is a non-interactive router used for Server-Side Rendering (SSR) in Node.js environments.
        Since server requests represent a single static snapshot, location is provided via a fixed <code>location</code> prop and never changes.
      </p>

      <div className="ssr-simulator">
        <div className="code-header">Node.js Express Server Code Simulation</div>
        <pre className="code-snippet">
{`// server.js (Node.js SSR)
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

app.get('*', (req, res) => {
  const html = renderToString(
    <StaticRouter location="${serverUrl}">
      <App />
    </StaticRouter>
  );
  res.send(`<!DOCTYPE html><html><body><div id="root">${html}</div></body></html>`);
});`}
        </pre>

        <div className="ssr-interactive">
          <label>Simulate incoming HTTP request path:</label>
          <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
            <button onClick={() => setServerUrl('/home')} className={`btn btn-sm ${serverUrl === '/home' ? 'btn-primary' : 'btn-outline'}`}>GET /home</button>
            <button onClick={() => setServerUrl('/checkout')} className={`btn btn-sm ${serverUrl === '/checkout' ? 'btn-primary' : 'btn-outline'}`}>GET /checkout</button>
            <button onClick={() => setServerUrl('/pricing')} className={`btn btn-sm ${serverUrl === '/pricing' ? 'btn-primary' : 'btn-outline'}`}>GET /pricing</button>
          </div>
          <div className="sub-box" style={{ marginTop: '12px' }}>
            🖥️ Server renders static markup for request: <strong>{serverUrl}</strong>
          </div>
        </div>
      </div>

      <div className="use-case-card">
        <strong>💡 Ideal Use Cases:</strong>
        <ul>
          <li>Server-Side Rendering (SSR) for enhanced SEO and lightning-fast first contentful paint (FCP).</li>
          <li>Static Site Generation (SSG) pipelines building static HTML files ahead of time.</li>
        </ul>
      </div>
    </div>
  );
}

export default StaticRouterExplanation;

```

### `src/App.jsx`
```jsx
import React, { useState } from 'react';
import HashRouterDemo from './components/HashRouterDemo';
import MemoryRouterDemo from './components/MemoryRouterDemo';
import StaticRouterExplanation from './components/StaticRouterExplanation';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('hash');

  return (
    <div className="app-container">
      <header className="page-header">
        <span className="badge">Unit 4: Practical 13</span>
        <h1>Router Types in React</h1>
        <p className="subtitle">
          Comparing <strong>HashRouter</strong>, <strong>MemoryRouter</strong>, and <strong>StaticRouter</strong> with live demos & real-world use cases.
        </p>

        <div className="nav-tabs">
          <button
            onClick={() => setActiveTab('hash')}
            className={`tab-btn ${activeTab === 'hash' ? 'active' : ''}`}
          >
            # HashRouter
          </button>
          <button
            onClick={() => setActiveTab('memory')}
            className={`tab-btn ${activeTab === 'memory' ? 'active' : ''}`}
          >
            🧠 MemoryRouter
          </button>
          <button
            onClick={() => setActiveTab('static')}
            className={`tab-btn ${activeTab === 'static' ? 'active' : ''}`}
          >
            🖥️ StaticRouter (SSR)
          </button>
        </div>
      </header>

      <main className="main-box">
        {activeTab === 'hash' && <HashRouterDemo />}
        {activeTab === 'memory' && <MemoryRouterDemo />}
        {activeTab === 'static' && <StaticRouterExplanation />}
      </main>
    </div>
  );
}

export default App;

```

### `src/App.css`
```jsx
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; color: #1e293b; }
.app-container { max-width: 900px; margin: 40px auto; padding: 0 20px; }
.page-header { background: white; border-radius: 16px 16px 0 0; padding: 32px 32px 0 32px; border: 1px solid #e2e8f0; border-bottom: none; text-align: center; }
.badge { display: inline-block; background: #e0f2fe; color: #0284c7; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 12px; text-transform: uppercase; margin-bottom: 10px; }
h1 { font-size: 28px; color: #0f172a; margin-bottom: 8px; }
.subtitle { color: #64748b; font-size: 15px; margin-bottom: 24px; }
.nav-tabs { display: flex; justify-content: center; gap: 8px; border-bottom: 2px solid #e2e8f0; }
.tab-btn { background: none; border: none; padding: 12px 24px; font-weight: 700; font-size: 14px; cursor: pointer; color: #64748b; border-bottom: 3px solid transparent; margin-bottom: -2px; transition: all 0.2s; }
.tab-btn:hover { color: #0284c7; }
.tab-btn.active { color: #0284c7; border-bottom: 3px solid #0284c7; }
.main-box { background: white; border-radius: 0 0 16px 16px; border: 1px solid #e2e8f0; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
.demo-block h3 { font-size: 20px; color: #0f172a; margin-bottom: 8px; }
.demo-desc { font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 20px; }
.embedded-app { background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 20px; margin-bottom: 20px; }
.embedded-nav { display: flex; gap: 10px; margin-bottom: 16px; }
.btn { display: inline-block; padding: 8px 16px; border-radius: 6px; font-weight: 600; font-size: 13px; text-decoration: none; cursor: pointer; border: none; }
.btn-primary { background: #0284c7; color: white; }
.btn-outline { background: #e2e8f0; color: #334155; }
.btn-sm { font-size: 12px; padding: 6px 12px; }
.sub-box { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; color: #1e293b; }
.note { font-size: 12px; color: #16a34a; font-weight: 600; margin-top: 4px; }
.use-case-card { background: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 8px; padding: 16px; font-size: 13px; color: #1e40af; }
.use-case-card ul { margin-top: 8px; padding-left: 20px; line-height: 1.6; }
.ssr-simulator { background: #0f172a; color: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 20px; }
.code-header { font-size: 12px; color: #94a3b8; text-transform: uppercase; font-weight: 700; margin-bottom: 8px; }
.code-snippet { background: #020617; border-radius: 8px; padding: 12px; font-family: monospace; font-size: 12px; color: #38bdf8; overflow-x: auto; margin-bottom: 16px; line-height: 1.5; }
.ssr-interactive label { font-size: 13px; color: #cbd5e1; font-weight: 600; }

```

---

## 🚀 How to Run

1. Open terminal in this directory:
   ```bash
   cd "D:\React-practicals\Reacts\Practical-13-Router-Types"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run Vite dev server:
   ```bash
   npm run dev
   ```
