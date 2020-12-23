import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionCotnroller from './app/controllers/SessionController';

import midConfig from './middlewares/midConfig';

const routes = new Router();

routes.post('/user', UserController.store);

routes.post('/session', SessionCotnroller.store);
routes.post('/forgot_password', SessionCotnroller.recover);

routes.use(midConfig);
routes.put('/user', UserController.update);

export default routes;
