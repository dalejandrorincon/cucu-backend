const { TABLES } = require('../../utils/constants');

exports.up = function (knex) {
  console.log(TABLES.services)
  return knex.schema.alterTable(TABLES.services, function (t) {
    
    t.string('name').nullable()

  });
};

exports.down = function(knex) {
    return knex.schema.dropTable(TABLES.services);
};