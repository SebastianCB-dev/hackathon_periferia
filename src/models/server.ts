import express from 'express';
import cors from 'cors';

// Routes
import HackathonRoute from '../routes/hackathon.route';

// Database
import { dbConnection } from '../db/configuration';

class Server {

  private _PORT: string;
  private _app: express.Application;

  constructor() {
    this._PORT = process.env.PORT || '3000';
    this._app = express();

    // Database
    this.dbConnection();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  get app(): express.Application {
    return this._app;
  }

  start() {
    this._app.listen(this._PORT, () => {
      console.log(`Server running on port ${this._PORT}`);
    });
  }

  dbConnection() {
    try {
      dbConnection();
      console.log('Database initialized');
    }
    catch (error) {
      console.log(error);
      throw new Error('Error initializing database');
    }
  }

  middlewares() {
    this._app.use(express.json());
    this._app.use(cors({
      origin: '*'
    }));
    this.validateJSON();
  }

  routes() {    
    this._app.use(HackathonRoute);
  }

  validateJSON() {
    this._app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (error instanceof SyntaxError) {
        return res.status(400)
          .json({
            message: 'Invalid JSON'
          });
      } else {
        return next();
      }
    });
  }

}

export default Server;