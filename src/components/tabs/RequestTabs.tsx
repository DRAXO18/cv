import { useState } from 'react';
import type { Header, TabType } from '../../types/apiTypes';
import AuthorizationTab from './AuthorizationTab';
import HeadersTab from './HeadersTab';
import BodyTab from './BodyTab';
import './RequestTabs.css';

interface Props {
  token: string;
  headers: Header[];
  body: string;
  onTokenChange: (t: string) => void;
  onHeadersChange: (h: Header[]) => void;
  onBodyChange: (b: string) => void;
}

const TABS: TabType[] = ['Authorization', 'Headers', 'Body'];

export default function RequestTabs({ token, headers, body, onTokenChange, onHeadersChange, onBodyChange }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('Authorization');

  const activeHeaders = headers.filter(h => h.enabled && h.key);

  return (
    <div className="request-tabs">
      <div className="tabs-nav">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {tab === 'Headers' && activeHeaders.length > 0 && (
              <span className="tab-badge">{activeHeaders.length}</span>
            )}
            {tab === 'Authorization' && token && (
              <span className="tab-dot" />
            )}
            {tab === 'Body' && body.trim().length > 0 && (
              <span className="tab-dot" />
            )}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {activeTab === 'Authorization' && (
          <AuthorizationTab token={token} onTokenChange={onTokenChange} />
        )}
        {activeTab === 'Headers' && (
          <HeadersTab headers={headers} onHeadersChange={onHeadersChange} />
        )}
        {activeTab === 'Body' && (
          <BodyTab body={body} onBodyChange={onBodyChange} />
        )}
      </div>
    </div>
  );
}
