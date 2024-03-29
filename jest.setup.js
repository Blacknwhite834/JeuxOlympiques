// jest.setup.js
global.fetch = require('node-fetch');

global.Response = function(body, init) {
    return {
      body: body,
      status: init?.status,
      headers: init?.headers,
      json() {
        return Promise.resolve(JSON.parse(body));
      }
    };
  };