import { Request, Response } from 'express';
import { getRepository, In } from 'typeorm';

import Point from '../entities/Point';

export default class PointsController {
  public async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map((item) => Number(item.trim()));

    const pointsRepository = getRepository(Point);

    const points = await pointsRepository
      .createQueryBuilder('points')
      .leftJoin('points.pointItems', 'pointItems')
      .where('points.uf = :uf', { uf })
      .andWhere('points.city = :city', { city })
      .andWhere('pointItems.item_id IN (:...items)', { items: parsedItems })
      .getMany();

    return response.json(points);
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const pointsRepository = getRepository(Point);

    const point = await pointsRepository.findOne(id, {
      relations: ['pointItems', 'pointItems.item'],
    });

    if (!point) {
      return response.status(400).json({ message: 'Point not foind' });
    }

    const items = point.pointItems.map((pointItem) => {
      return {
        title: pointItem.item.title,
      };
    });

    delete point.pointItems;

    return response.json({ point, items });
  }

  public async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      image = 'https://images.unsplash.com/photo-1565061828011-282424b9ab40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
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
