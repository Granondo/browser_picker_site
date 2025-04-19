import type { APIContext } from 'astro';

const WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS = 30; // 30 requests per minute

const ipRequests = new Map<string, { count: number; resetTime: number }>();

export function rateLimiter(context: APIContext) {
  const clientIP = context.clientAddress;
  const now = Date.now();

  const requestData = ipRequests.get(clientIP) || { count: 0, resetTime: now + WINDOW_MS };

  if (now > requestData.resetTime) {
    requestData.count = 1;
    requestData.resetTime = now + WINDOW_MS;
  } else {
    requestData.count++;
  }

  ipRequests.set(clientIP, requestData);

  if (requestData.count > MAX_REQUESTS) {
    return new Response('Too many requests', { status: 429 });
  }

  return null;
}