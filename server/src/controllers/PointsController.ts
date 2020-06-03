import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Point from '../entities/Point';

export default class PointsController {
  public async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      image = 'fake',
      items,
    } = request.body;

    const pointsRepository = getRepository(Point);

    const pointItems = items.map((item: number) => {
      return {
        item_id: item,
      };
    });

    const point = pointsRepository.create({
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      image,
      pointItems,
    });

    await pointsRepository.save(point);

    return response.json(point);
  }
}
