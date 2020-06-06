import { Router } from 'express';

import multer from 'multer';
import multerConfig from '../config/multer';

import PointsController from '../controllers/PointsController';

const pointsRouter = Router();
const pointsController = new PointsController();

const upload = multer(multerConfig);

pointsRouter.get('/', pointsController.index);
pointsRouter.get('/:id', pointsController.show);
pointsRouter.post('/', upload.single('image'), pointsController.create);

export default pointsRouter;
