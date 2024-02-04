const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const colorifyConsole = require('./build-tools/utils/colorifyConsole');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

console.log(colorifyConsole({ label: 'info', text: 'Starting server...' }));
console.time(colorifyConsole({ label: 'time', text: 'Server startup' }));
app.prepare().then(() => {
  const server = express();

  server.use(cookieParser()); // allows cookies to be accessed using req.cookies
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;

    console.timeEnd(colorifyConsole({ label: 'time', text: 'Server startup' }));
    console.log(`> Ready on http://localhost:${port}`);
  });
});
