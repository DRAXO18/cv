import type { Header } from '../../types/apiTypes';
import './HeadersTab.css';

interface Props {
  headers: Header[];
  onHeadersChange: (h: Header[]) => void;
}

export default function HeadersTab({ headers, onHeadersChange }: Props) {
  const updateHeader = (index: number, field: keyof Header, value: string | boolean) => {
    const updated = headers.map((h, i) =>
      i === index ? { ...h, [field]: value } : h
    );
    onHeadersChange(updated);
  };

  const addRow = () => {
    onHeadersChange([...headers, { key: '', value: '', enabled: true }]);
  };

  const removeRow = (index: number) => {
    onHeadersChange(headers.filter((_, i) => i !== index));
  };

  return (
    <div className="headers-tab">
      <table className="headers-table">
        <thead>
          <tr>
            <th className="col-check"></th>
            <th className="col-key">Key</th>
            <th className="col-value">Value</th>
            <th className="col-action"></th>
          </tr>
        </thead>
        <tbody>
          {headers.map((header, i) => (
            <tr key={i} className={`header-row ${!header.enabled ? 'disabled' : ''}`}>
              <td className="col-check">
                <input
                  type="checkbox"
                  className="row-check"
                  checked={header.enabled}
                  onChange={e => updateHeader(i, 'enabled', e.target.checked)}
                />
              </td>
              <td className="col-key">
                <input
                  className="cell-input key-input"
                  type="text"
                  placeholder="Key"
                  value={header.key}
                  onChange={e => updateHeader(i, 'key', e.target.value)}
                />
              </td>
              <td className="col-value">
                <input
                  className="cell-input value-input"
                  type="text"
                  placeholder={
                    header.key === 'Postman-Token' || header.key === 'Host'
                      ? '<calculated when request is sent>'
                      : 'Value'
                  }
                  value={header.value}
                  onChange={e => updateHeader(i, 'value', e.target.value)}
                  disabled={header.key === 'Postman-Token' || header.key === 'Host'}
                />
              </td>
              <td className="col-action">
                <button
                  className="remove-row-btn"
                  onClick={() => removeRow(i)}
                  title="Remove"
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
          <tr className="add-row" onClick={addRow}>
            <td colSpan={4}>
              <span className="add-row-label">+ Add header</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
