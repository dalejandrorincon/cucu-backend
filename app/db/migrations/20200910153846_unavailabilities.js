const { TABLES } = require('../../utils/constants');

exports.up = function(knex) {
    return knex.schema.createTable(TABLES.unavailabilities, table => {
        table.increments('id').primary();
        table.datetime('from');
        table.datetime('to');        

        table.boolean('deleted').notNullable().defaultTo(false);
        table
            .integer('translator_id')
            .unsigned()
            .notNull()
            .references('id')
            .inTable(TABLES.users)
            .onUpdate('CASCADE');

        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable(TABLES.unavailabilities)
};
