import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import multerConfig from '../config/multer';

import PointsController from '../controllers/PointsController';
import { JoinAttribute } from 'typeorm/query-builder/JoinAttribute';

const pointsRouter = Router();
const pointsController = new PointsController();

const upload = multer(multerConfig);

pointsRouter.get('/', pointsController.index);
pointsRouter.get('/:id', pointsController.show);
pointsRouter.post(
  '/',
  upload.single('image'),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().max(2).required(),
        items: Joi.string().required(),
      }),
    },
    { abortEarly: false }
  ),
  pointsController.create
);

export default pointsRouter;
