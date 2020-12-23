import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionCotnroller from './app/controllers/SessionController';

const routes = new Router();

routes.post('/user', UserController.store);

routes.post('/session', SessionCotnroller.store);

export default routes;
