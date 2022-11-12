import { Application } from 'express';
import { authRoutes } from '@auth/routes/authRoutes';

const BASE_PATH = '/api/v1';

export default (app: Application) => {
  const routes = () => {
    //eslint-disable-next-line @typescript-eslint/no-empty-function
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.use(BASE_PATH, authRoutes.routes());
  };
  routes();
};
