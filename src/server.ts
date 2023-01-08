import http from 'http';
import app from './app';

import { saasSubscriptionModels } from './container';

saasSubscriptionModels.sync({ force: true }, () => {});

const PORT = 8080;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.info(`server is listening on ${PORT}`);
});
