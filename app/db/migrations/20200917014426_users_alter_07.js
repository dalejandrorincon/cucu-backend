const { TABLES } = require('../../utils/constants');

exports.up = function (knex) {
  return knex.schema.alterTable(TABLES.users, function (t) {
    t.string('document').nullable().alter();
  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(TABLES.users, function (t) {
    
  });
};