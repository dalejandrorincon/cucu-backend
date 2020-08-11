const { TABLES } = require('../../utils/constants');

exports.up = function(knex) {
    return knex.schema.createTable(TABLES.users, table => {
        table.increments('id').primary();
        table.string('firstname').notNull();
        table.string('lastname').notNull();
        table.string('password').notNull();
        table.string('document').notNull();
        table.string('phone').notNull();
        table.string('email').unique().notNull();
        table.string('role').notNull();

        table.string('rate');
        table.string('address');
        table.string('nationality');
        table.string('description');
        
        table.string('languages');
        table.string('certifications');
        table.string('specialities');
        table.string('work_experience');

        table.boolean('disabled').notNullable().defaultTo(false);
        table.boolean('deleted').notNullable().defaultTo(false);
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable(TABLES.users)
};
