const { TABLES } = require('../../utils/constants');

exports.up = function(knex) {
    return knex.schema.createTable(TABLES.platforms, table => {
        table.increments('id').primary();
        table.string('name').notNull();
        table.boolean('deleted').notNullable().defaultTo(false);
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable(TABLES.platforms);
};
