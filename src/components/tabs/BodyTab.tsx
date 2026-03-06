import './BodyTab.css';

interface Props {
  body: string;
  onBodyChange: (b: string) => void;
}

export default function BodyTab({ body, onBodyChange }: Props) {
  const formatJson = () => {
    try {
      const parsed = JSON.parse(body);
      onBodyChange(JSON.stringify(parsed, null, 2));
    } catch {
      // not valid json, leave as-is
    }
  };

  const isValidJson = body.trim().length === 0 || (() => {
    try { JSON.parse(body); return true; } catch { return false; }
  })();

  return (
    <div className="body-tab">
      <div className="body-toolbar">
        <div className="body-types">
          {['none', 'form-data', 'x-www-form-urlencoded', 'raw', 'binary', 'GraphQL'].map(t => (
            <label key={t} className={`body-type-label ${t === 'raw' ? 'active' : 'disabled-type'}`}>
              <input type="radio" name="body-type" value={t} defaultChecked={t === 'raw'} readOnly />
              {t}
            </label>
          ))}
          <span className="format-badge">JSON</span>
        </div>
        <button
          className="format-btn"
          onClick={formatJson}
          disabled={!body.trim()}
          title="Format JSON"
        >
          ⌥ Format
        </button>
      </div>

      <div className={`body-editor-wrapper ${!isValidJson ? 'invalid' : ''}`}>
        <div className="line-numbers">
          {(body || '\n').split('\n').map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
        <textarea
          className="body-editor"
          value={body}
          onChange={e => onBodyChange(e.target.value)}
          placeholder={'{\n  "query": "your JSON body here"\n}'}
          spellCheck={false}
          autoComplete="off"
        />
      </div>
      {!isValidJson && (
        <div className="json-error">⚠ Invalid JSON syntax</div>
      )}
    </div>
  );
}
