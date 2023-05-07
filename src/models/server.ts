import express from 'express';
import cors from 'cors';


class Server {

  private _PORT: string;
  private _app: express.Application;

  constructor() {
    this._PORT = process.env.PORT || '3000';
    this._app = express();

    // Middlewares
    this.middlewares();
  }

  get app(): express.Application {
    return this._app;
  }

  start() {
    this._app.listen(this._PORT, () => {
      console.log(`Server running on port ${this._PORT}`);
    });
  }

  middlewares() {
    this._app.use(express.json());
    this._app.use(cors({
      origin: '*'
    }));
  }

}

export default Server;