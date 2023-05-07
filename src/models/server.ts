import express from 'express';

class Server {

  private _PORT: string;
  private _app: express.Application;

  constructor() {
    this._PORT = process.env.PORT || '3000';
    this._app = express();
  }

  start() {
    this._app.listen(this._PORT, () => {
      console.log(`Server running on port ${this._PORT}`);
    });
  }

  get app(): express.Application {
    return this._app;
  }

}

export default Server;