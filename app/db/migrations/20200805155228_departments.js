const { TABLES } = require('../../utils/constants');

exports.up = function(knex) {
    return knex.schema.createTable(TABLES.departments, table => {
        table.increments('id').primary();
        table.string('name').notNull();
        table.boolean('deleted').notNullable().defaultTo(false);
        table
            .integer('country_id')
            .unsigned()
            .notNull()
            .references('id')
            .inTable(TABLES.countries)
            .onUpdate('CASCADE');
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable(TABLES.departments)
};
