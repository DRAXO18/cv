import { useState } from 'react';
import type { HttpMethod } from '../../types/apiTypes';
import { endpoints } from '../../data/cvData';
import './RequestBar.css';

interface Props {
  method: HttpMethod;
  url: string;
  loading: boolean;
  onMethodChange: (m: HttpMethod) => void;
  onUrlChange: (u: string) => void;
  onSend: () => void;
}

const METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

const METHOD_COLORS: Record<HttpMethod, string> = {
  GET: '#6bdd9a',
  POST: '#f5a623',
  PUT: '#5bc8f5',
  DELETE: '#f55b5b',
  PATCH: '#b57df5',
};

export default function RequestBar({ method, url, loading, onMethodChange, onUrlChange, onSend }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [suggestionOpen, setSuggestionOpen] = useState(false);

  const filteredEndpoints = endpoints.filter(e =>
    e.url.toLowerCase().includes(url.toLowerCase()) && url.length > 0
  );

  const handleSelect = (ep: typeof endpoints[0]) => {
    onUrlChange(ep.url);
    onMethodChange(ep.method);
    setSuggestionOpen(false);
  };

  return (
    <div className="request-bar">
      {/* Method selector */}
      <div className="method-dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <span className="method-label" style={{ color: METHOD_COLORS[method] }}>{method}</span>
        <svg className={`chevron ${dropdownOpen ? 'open' : ''}`} viewBox="0 0 10 6" fill="none">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        {dropdownOpen && (
          <div className="method-menu">
            {METHODS.map(m => (
              <div
                key={m}
                className={`method-item ${m === method ? 'active' : ''}`}
                style={{ color: METHOD_COLORS[m] }}
                onClick={(e) => { e.stopPropagation(); onMethodChange(m); setDropdownOpen(false); }}
              >
                {m}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* URL input */}
      <div className="url-wrapper">
        <input
          className="url-input"
          type="text"
          placeholder="Enter URL or paste text"
          value={url}
          onChange={e => { onUrlChange(e.target.value); setSuggestionOpen(true); }}
          onFocus={() => setSuggestionOpen(true)}
          onBlur={() => setTimeout(() => setSuggestionOpen(false), 150)}
        />
        {suggestionOpen && filteredEndpoints.length > 0 && (
          <div className="suggestions">
            {filteredEndpoints.map(ep => (
              <div key={ep.url} className="suggestion-item" onMouseDown={() => handleSelect(ep)}>
                <span className="sugg-method" style={{ color: METHOD_COLORS[ep.method] }}>{ep.method}</span>
                <span className="sugg-url">{ep.url}</span>
                <span className="sugg-label">{ep.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Send button */}
      <button className={`send-btn ${loading ? 'loading' : ''}`} onClick={onSend} disabled={loading}>
        {loading ? (
          <span className="spinner" />
        ) : (
          'Send'
        )}
        <svg className="send-chevron" viewBox="0 0 10 6" fill="none">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}
