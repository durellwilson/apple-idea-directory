import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util';

// Polyfill for edge runtime APIs needed by AI SDK
global.TransformStream = class TransformStream {
  constructor() {
    this.readable = {};
    this.writable = {};
  }
};

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Polyfill Request and Response for Edge runtime
if (!global.Request) {
  global.Request = class Request {
    constructor(url, options = {}) {
      this.url = url;
      this.method = options.method || 'GET';
      this.headers = new Map(Object.entries(options.headers || {}));
      this._bodyText = options.body || '';
    }
    
    async json() {
      return JSON.parse(this._bodyText);
    }
  };
}

if (!global.Response) {
  global.Response = class Response {
    constructor(body, options = {}) {
      this._body = body;
      this.status = options.status || 200;
      this.statusText = options.statusText || 'OK';
      this.headers = options.headers || {};
    }
    
    static json(data, options = {}) {
      return new Response(JSON.stringify(data), {
        ...options,
        headers: {
          ...options.headers,
          'Content-Type': 'application/json',
        },
      });
    }
    
    async json() {
      return JSON.parse(this._body);
    }
  };
}

// Mock fetch for testing
global.fetch = jest.fn();
