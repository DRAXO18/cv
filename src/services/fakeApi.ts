import { cvData, endpoints } from '../data/cvData';
import type { ResponseData, RequestConfig } from '../types/apiTypes';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fakeApiCall(config: RequestConfig): Promise<ResponseData> {
  const startTime = performance.now();
  await delay(600 + Math.random() * 600);

  const matched = endpoints.find(e => e.url === config.url);

  const endTime = performance.now();
  const elapsed = Math.round(endTime - startTime);

  if (!matched) {
    return {
      status: 404,
      statusText: 'Not Found',
      time: elapsed,
      size: '128 B',
      data: {
        error: 'Endpoint not found',
        message: `No resource found at ${config.url}`,
        available_endpoints: endpoints.map(e => ({ method: e.method, url: e.url })),
      },
    };
  }

  if (!config.token || config.token.trim() === '') {
    return {
      status: 401,
      statusText: 'Unauthorized',
      time: elapsed,
      size: '96 B',
      data: {
        error: 'Unauthorized',
        message: 'Bearer token is required. Please provide a valid Authorization token.',
      },
    };
  }

  const responseData = cvData[matched.responseKey];
  const json = JSON.stringify(responseData);
  const bytes = new TextEncoder().encode(json).length;
  const size = bytes > 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${bytes} B`;

  return {
    status: 200,
    statusText: 'OK',
    time: elapsed,
    size,
    data: responseData,
  };
}
