import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('ecoPoint_items', table => {
        table.increments('id').primary();
        
        table.integer('ecoPoint_id').notNullable()
            .references('id')
            .inTable('ecoPoints');

        table.integer('item_id').notNullable()
            .references('id')
            .inTable('items');
    })

}

export async function down(knex: Knex) {
    return knex.schema.dropTable('ecoPoint_items');
}

