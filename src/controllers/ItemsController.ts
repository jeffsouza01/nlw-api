import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
    async index(resq: Request, resp: Response) {
        const items = await knex('items').select('*');

    const serializedItems = items.map( item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`,
        }
        
    })

    return resp.json(serializedItems);
}}

export default ItemsController;