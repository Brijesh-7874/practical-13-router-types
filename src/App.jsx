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
