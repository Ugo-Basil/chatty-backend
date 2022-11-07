import { Application } from 'express';

export default (app: Application) => {
  const routes = () => {
    //eslint-disable-next-line @typescript-eslint/no-empty-function
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });
  };
  routes();
};
