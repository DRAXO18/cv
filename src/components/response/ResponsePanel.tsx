import type { ResponseData } from '../../types/apiTypes';
import './ResponsePanel.css';

interface Props {
  response: ResponseData | null;
  loading: boolean;
  error: string | null;
}

const STATUS_COLORS: Record<number, string> = {
  200: '#6bdd9a',
  201: '#6bdd9a',
  400: '#f5a623',
  401: '#f55b5b',
  403: '#f55b5b',
  404: '#f55b5b',
  500: '#f55b5b',
};

function syntaxHighlight(json: string): string {
  return json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = 'json-number';
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? 'json-key' : 'json-string';
        } else if (/true|false/.test(match)) {
          cls = 'json-bool';
        } else if (/null/.test(match)) {
          cls = 'json-null';
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
}

export default function ResponsePanel({ response, loading, error }: Props) {
  if (loading) {
    return (
      <div className="response-panel">
        <div className="response-header">
          <span className="response-title">Response</span>
        </div>
        <div className="response-loading">
          <div className="loading-dots">
            <span /><span /><span />
          </div>
          <p>Waiting for response...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="response-panel">
        <div className="response-header">
          <span className="response-title">Response</span>
        </div>
        <div className="response-error">
          <span className="error-icon">⚠</span>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="response-panel">
        <div className="response-header">
          <span className="response-title">Response</span>
        </div>
        <div className="response-empty">
          <div className="astronaut-icon">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="32" r="14" stroke="#444" strokeWidth="2"/>
              <rect x="28" y="44" width="24" height="20" rx="4" stroke="#444" strokeWidth="2"/>
              <circle cx="40" cy="32" r="8" stroke="#555" strokeWidth="1.5"/>
              <line x1="28" y1="52" x2="20" y2="60" stroke="#444" strokeWidth="2" strokeLinecap="round"/>
              <line x1="52" y1="52" x2="60" y2="60" stroke="#444" strokeWidth="2" strokeLinecap="round"/>
              <path d="M56 20 L68 12 L64 24 Z" fill="#f06a35" opacity="0.8"/>
            </svg>
          </div>
          <p>Enter a URL and click <strong>Send</strong> to get a response</p>
          <p className="hint-endpoints">
            Try: <code>https://api.josetueros.dev/v1/personal</code>
          </p>
        </div>
      </div>
    );
  }

  const statusColor = STATUS_COLORS[response.status] || '#888';
  const jsonString = JSON.stringify(response.data, null, 2);
  const highlighted = syntaxHighlight(jsonString);

  return (
    <div className="response-panel">
      <div className="response-header">
        <span className="response-title">Response</span>
        <div className="response-meta">
          <span className="meta-item">
            Status:{' '}
            <strong style={{ color: statusColor }}>
              {response.status} {response.statusText}
            </strong>
          </span>
          <span className="meta-separator">|</span>
          <span className="meta-item">
            Time: <strong>{response.time} ms</strong>
          </span>
          <span className="meta-separator">|</span>
          <span className="meta-item">
            Size: <strong>{response.size}</strong>
          </span>
        </div>
      </div>

      <div className="response-tabs-mini">
        <span className="resp-tab active">Pretty</span>
        <span className="resp-tab disabled">Raw</span>
        <span className="resp-tab disabled">Preview</span>
        <span className="resp-tab-right">JSON</span>
      </div>

      <div className="response-body">
        <div className="response-line-numbers">
          {jsonString.split('\n').map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
        <pre
          className="response-code"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </div>
    </div>
  );
}
