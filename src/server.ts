import http from 'http';
import app from './app';

const PORT = 8080;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.info(`server is listening on ${PORT}`);
});
