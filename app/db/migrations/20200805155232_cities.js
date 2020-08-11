const { TABLES } = require('../../utils/constants');

exports.up = function(knex) {
    return knex.schema.createTable(TABLES.cities, table => {
        table.increments('id').primary();
        table.string('name').notNull();
        table.boolean('deleted').notNullable().defaultTo(false);
        table
            .integer('department_id')
            .unsigned()
            .notNull()
            .references('id')
            .inTable(TABLES.departments)
            .onUpdate('CASCADE');
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable(TABLES.cities)
};
