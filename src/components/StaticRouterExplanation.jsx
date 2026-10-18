import React, { useState } from 'react';

function StaticRouterExplanation() {
  const [serverUrl, setServerUrl] = useState('/checkout');

  const serverCode = `// server.js (Node.js SSR)
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

app.get('*', (req, res) => {
  const html = renderToString(
    <StaticRouter location="${serverUrl}">
      <App />
    </StaticRouter>
  );
  res.send('<!DOCTYPE html><html><body><div id="root">' + html + '</div></body></html>');
});`;

  return (
    <div className="demo-block">
      <h3>3. StaticRouter Demonstration (Server-Side Rendering)</h3>
      <p className="demo-desc">
        <code>StaticRouter</code> is a non-interactive router used for Server-Side Rendering (SSR) in Node.js environments.
        Since server requests represent a single static snapshot, location is provided via a fixed <code>location</code> prop and never changes.
      </p>

      <div className="ssr-simulator">
        <div className="code-header">Node.js Express Server Code Simulation</div>
        <pre className="code-snippet">{serverCode}</pre>

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
