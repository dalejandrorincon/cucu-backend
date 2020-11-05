const { TABLES } = require('../../utils/constants');

exports.up = function(knex) {
    return knex.schema.createTable(TABLES.notifications, table => {
        table.increments('id').primary();
        table.string('type').notNull();
        table
            .integer('receiver_id')
            .unsigned()
            .notNull()
            .references('id')
            .inTable(TABLES.users)
            .onUpdate('CASCADE');
        table
            .integer('sender_id')
            .unsigned()
            .references('id')
            .inTable(TABLES.users)
            .onUpdate('CASCADE');
        table.boolean('read').notNullable().defaultTo(false);

        table.boolean('deleted').notNullable().defaultTo(false);
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable(TABLES.notifications);
};
