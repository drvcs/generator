import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/examples', controller.create)
  .get('/examples', controller.all)
  .get('/examples/:id', controller.byId);
