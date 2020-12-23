import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.database();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  database() {
    mongoose.connect('mongodb://localhost/appuser', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default new App().server;
