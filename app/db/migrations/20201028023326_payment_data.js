const { TABLES } = require('../../utils/constants');

exports.up = function(knex) {
    return knex.schema.createTable(TABLES.payment_data, table => {
        table.increments('id').primary();
        table
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable(TABLES.users)
            .onUpdate('CASCADE');

        table
            .integer('bank_id')
            .unsigned()
            .references('id')
            .inTable(TABLES.banks)
            .onUpdate('CASCADE');

        table.string('account_type');    
        table.string('account_number');    
        table.string('owner_name');    
        table.string('document_type');    
        table.string('document_number');    
        table.string('payoneer_account');    


        table.boolean('deleted').notNullable().defaultTo(false);
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable(TABLES.payment_data)
};
