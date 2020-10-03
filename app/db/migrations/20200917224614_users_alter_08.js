const { TABLES } = require('../../utils/constants');

exports.up = function (knex) {
  return knex.schema.alterTable(TABLES.users, function (t) {
    t.string('stripe_id');
    t.string('labor_months');
  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(TABLES.users, function (t) {
    t.dropColumns('stripe_id');
    t.dropColumns('labor_months');
  });
};