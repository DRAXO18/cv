import { useState, useEffect } from 'react';
import type { HttpMethod, Header, ResponseData } from './types/apiTypes';
import { endpoints } from './data/cvData';
import { fakeApiCall } from './services/fakeApi';
import RequestBar from './components/request/RequestBar';
import RequestTabs from './components/tabs/RequestTabs';
import ResponsePanel from './components/response/ResponsePanel';
import 'driver.js/dist/driver.css';
import { driver } from "driver.js"
import './App.css';

const DEFAULT_HEADERS: Header[] = [
  { key: 'Authorization', value: '', enabled: true },
  { key: 'Cache-Control', value: 'no-cache', enabled: true },
  { key: 'Postman-Token', value: '', enabled: true },
  { key: 'Host', value: '', enabled: true },
  { key: 'User-Agent', value: 'PostmanRuntime/7.51.1', enabled: true },
  { key: 'Accept', value: '*/*', enabled: true },
  { key: 'Accept-Encoding', value: 'gzip, deflate, br', enabled: true },
  { key: 'Connection', value: 'keep-alive', enabled: true },
];

export default function App() {
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [url, setUrl] = useState('');
  const [token, setToken] = useState('');
  const [headers, setHeaders] = useState<Header[]>(DEFAULT_HEADERS);
  const [body, setBody] = useState('');
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const result = await fakeApiCall({ method, url, token, headers, body });
      setResponse(result);
    } catch (e) {
      setError('Network error — could not connect to the API.');
    } finally {
      setLoading(false);
    }
  };

  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      animate: true,
      progressText: "{{current}} de {{total}}",
      nextBtnText: "Siguiente",
      prevBtnText: "Anterior",
      doneBtnText: "Entendido",
      steps: [
        {
          element: "#request-bar",
          popover: {
            title: "API Request",
            description: "Aquí puedes escribir o seleccionar en la barra lateral un endpoint para consultar información de mi CV interactivo."
          }
        },
        {
          element: "#request-tabs",
          popover: {
            title: "Configuración de Request",
            description: "Simulación de parámetros de una API, escribe cualquier carácter en Token."
          }
        },
        {
          element: "#response-panel",
          popover: {
            title: "API Response",
            description: "Aquí se muestra la respuesta en JSON de mi información simulando una API real."
          }
        }
      ]
    })

    driverObj.drive()
  }

  useEffect(() => {
    startTour()
  }, [])

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="#f06a35" strokeWidth="2" />
              <path d="M8 14h12M14 8l6 6-6 6" stroke="#f06a35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="logo-name">José Tueros Morón</div>
            <div className="logo-sub">Backend Developer · CV API</div>
          </div>
        </div>

        <div className="sidebar-section-title">Collections</div>
        <div className="sidebar-collection">
          <div className="collection-header">
            <svg className="collection-arrow" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="collection-name">josetueros-cv</span>
          </div>
          <div className="collection-items">
            {endpoints.map(ep => (
              <button
                key={ep.url}
                className={`endpoint-item ${url === ep.url ? 'active' : ''}`}
                onClick={() => { setUrl(ep.url); setMethod(ep.method); }}
              >
                <span className={`ep-method ep-${ep.method.toLowerCase()}`}>{ep.method}</span>
                <span className="ep-label">{ep.label}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="main">
        <header className="topbar">
          <div className="topbar-left">
            <span className="topbar-tab active">josetueros-cv</span>
          </div>
          <div className="topbar-right">
            <span className="env-badge">
              <span className="env-dot" /> Production
            </span>
          </div>
        </header>

        <div className="workspace">
          <div id="request-bar">
            <RequestBar
              method={method}
              url={url}
              loading={loading}
              onMethodChange={setMethod}
              onUrlChange={setUrl}
              onSend={handleSend}
            />
          </div>

          <div id="request-tabs">
            <RequestTabs
              token={token}
              headers={headers}
              body={body}
              onTokenChange={setToken}
              onHeadersChange={setHeaders}
              onBodyChange={setBody}
            />
          </div>

          <div id="response-panel">
            <ResponsePanel
              response={response}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
