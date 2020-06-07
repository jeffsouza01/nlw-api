import { Request, Response } from 'express';
import knex from '../database/connection';


class EcoPointsController {
    async show(req: Request, resp: Response) {
        const { id } = req.params;

        const ecoPoint = await knex('ecoPoints').where('id', id).first();

        if (!ecoPoint) {
            return resp.status(400).json({ message: "ecoPoint not found" })
        }

        const items = await knex('items')
            .join('ecoPoint_items', 'items.id', '=', 'ecoPoint_items.item_id')
            .where('ecoPoint_items.id', id)
            .select('items.title');


        return resp.json({ ecoPoint, items });
    }

    async create(req: Request, resp: Response) {
        // criação utilizando a desestruturação
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = req.body;
    
        // Criação da transaction
        const trx = await knex.transaction();
    
        const points = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
            
        }

        const insertedIds = await trx('ecoPoints').insert(points);
        
    
        const ecoPoint_id = insertedIds[0];
    
        const ecoPointItems = items.map((item_id: number) => {
            return {
                item_id,
                ecoPoint_id,
            };
        })
    
        await trx('ecoPoint_items').insert(ecoPointItems);
    
        await trx.commit();
    
        return resp.json({ 
            id: ecoPoint_id,
            ...points,
         });
    };
}

export default EcoPointsController;