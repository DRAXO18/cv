import './AuthorizationTab.css';

interface Props {
  token: string;
  onTokenChange: (t: string) => void;
}

export default function AuthorizationTab({ token, onTokenChange }: Props) {
  return (
    <div className="auth-tab">
      <div className="auth-row">
        <div className="auth-type-group">
          <label className="auth-label">Auth Type</label>
          <div className="auth-type-select">
            <span className="auth-type-icon">🔑</span>
            <span>Bearer Token</span>
            <svg className="auth-chevron" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        <div className="auth-token-group">
          <label className="auth-label">Token</label>
          <div className="token-input-wrapper">
            <span className="token-prefix">Bearer</span>
            <input
              className="token-input"
              type="password"
              placeholder="Enter your Bearer token..."
              value={token}
              onChange={e => onTokenChange(e.target.value)}
              autoComplete="off"
              spellCheck={false}
            />
            {token && (
              <button className="token-clear" onClick={() => onTokenChange('')} title="Clear token">
                ×
              </button>
            )}
          </div>
          <p className="auth-hint">
            This token will be sent as <code>Authorization: Bearer &lt;token&gt;</code>
          </p>
        </div>
      </div>
    </div>
  );
}
