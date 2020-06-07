import express from 'express';

import EcoPointsController from './controllers/EcoPointsController'
import ItemsController from './controllers/ItemsController'


const routes = express.Router();
const ecoPointsController = new EcoPointsController();
const itemsController = new ItemsController();

// listagem dos items
routes.get('/items', itemsController.index);


// rota para criação dos pontos
routes.post('/ecopoints', ecoPointsController.create);

routes.get('/ecopoints/:id', ecoPointsController.show)

export default routes;