import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Item from '../entities/Item';

export default class ItemsController {
  public async index(request: Request, response: Response) {
    const itemRepository = getRepository(Item);

    const items = await itemRepository.find();

    const serializedItems = items.map((item) => {
      return {
        ...item,
        image_url: `http://locahost:3333/uploads/${item.image}`,
      };
    });

    return response.json(serializedItems);
  }
}
