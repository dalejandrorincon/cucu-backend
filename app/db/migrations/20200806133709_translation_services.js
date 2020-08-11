const { TABLES } = require('../../utils/constants');

exports.up = function(knex) {
    return knex.schema.createTable(TABLES.translation_services, table => {
        table.increments('id').primary();
        table.string('service_site');
        table.string('amount');
        table.string('service_type');
        table.string('url');
        table.string('length');
        table.string('platform');
        table.datetime('date');
        table.boolean('record');
        table.string('files_urls');
        table.string('description');
        table.string('status');
        table
            .integer('client_id')
            .unsigned()
            .notNull()
            .references('id')
            .inTable(TABLES.users)
            .onUpdate('CASCADE');
        table
            .integer('translator_id')
            .unsigned()
            .notNull()
            .references('id')
            .inTable(TABLES.users)
            .onUpdate('CASCADE');

        table.boolean('deleted').notNullable().defaultTo(false);
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable(TABLES.translation_services);
};
