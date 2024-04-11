// jest.setup.js
global.fetch = require('node-fetch');
// jest.setup.js
global.Canvas = require('canvas');


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