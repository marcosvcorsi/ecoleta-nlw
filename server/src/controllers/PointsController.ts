import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Point from '../entities/Point';

export default class PointsController {
  public async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const pointsRepository = getRepository(Point);

    const points = await pointsRepository
      .createQueryBuilder('points')
      .leftJoin('points.pointItems', 'pointItems')
      .where('points.uf = :uf', { uf })
      .andWhere('points.city = :city', { city })
      .andWhere('pointItems.item_id IN (:...items)', { items: parsedItems })
      .getMany();

    const serializedPoints = points.map(point => {
      return {
        ...point,
        image_url: `http://192.168.0.100:3333/uploads/${point.image}`,
      };
    });

    return response.json(serializedPoints);
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

    const items = point.pointItems.map(pointItem => {
      return {
        title: pointItem.item.title,
      };
    });

    delete point.pointItems;

    const serializedPoint = {
      ...point,
      image_url: `http://192.168.0.100:3333/uploads/${point.image}`,
    };

    return response.json({ point: serializedPoint, items });
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
      image,
      items,
    } = request.body;

    const pointsRepository = getRepository(Point);

    const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((item: number) => {
        return {
          item_id: item,
        };
      });

    const point = pointsRepository.create({
      name,
      email,
      whatsapp,
      latitude: Number(latitude),
      longitude: Number(longitude),
      city,
      uf,
      image: request.file.filename,
      pointItems,
    });

    await pointsRepository.save(point);

    return response.json(point);
  }
}
