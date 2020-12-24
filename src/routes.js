import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionCotnroller from './app/controllers/SessionController';
import ProjectController from './app/controllers/ProjectConrtoller';

import midConfig from './middlewares/midConfig';

const routes = new Router();

routes.post('/user', UserController.store);

routes.post('/session', SessionCotnroller.store);
routes.post('/forgot_password', SessionCotnroller.recover);
routes.post('/reset_password', SessionCotnroller.reset);

routes.use(midConfig);
routes.put('/user', UserController.update);

routes.get('/project', ProjectController.index);
routes.get('/:projectId', ProjectController.list);
routes.post('/project', ProjectController.store);
routes.put('/:projectId', ProjectController.update);
routes.delete('/:projectId', ProjectController.delete);

export default routes;
