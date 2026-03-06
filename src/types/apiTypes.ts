export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface Header {
  key: string;
  value: string;
  enabled: boolean;
}

export type TabType = 'Authorization' | 'Headers' | 'Body';

export interface RequestConfig {
  method: HttpMethod;
  url: string;
  token: string;
  headers: Header[];
  body: string;
}

export interface ResponseData {
  status: number;
  statusText: string;
  time: number;
  size: string;
  data: unknown;
}

export interface CVSection {
  endpoint: string;
  method: HttpMethod;
  description: string;
}
