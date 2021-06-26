const { TABLES } = require('../../utils/constants');
exports.up = function(knex) {
    return knex.schema.createTable(TABLES.services, function (t) {
        t.increments('id').primary();
        t.string('name_en');
        t.string('name_es'); 
        t.boolean('deleted').notNullable().defaultTo(false);
        t.timestamps(true, true);
        
    
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable(TABLES.services);
};
