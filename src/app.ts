import express, { Express } from 'express';
import { ChattyServer } from '@root/setupServer';
import databaseConnection from '@root/setupDatabase';
import { config } from '@root/config';

class Application {
  public initialize(): void {
    this.loadConfig();
    databaseConnection();
    const app: Express = express();
    const server = new ChattyServer(app);
    server.start();
  }

  private loadConfig(): void {
    // load config
    config.validateConfig();
  }
}

const application: Application = new Application();
application.initialize();


