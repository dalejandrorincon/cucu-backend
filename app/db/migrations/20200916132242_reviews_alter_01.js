const { TABLES } = require('../../utils/constants');

exports.up = function (knex) {
  return knex.schema.alterTable(TABLES.reviews, function (t) {
    t.string('approved').defaultTo("0")
    t.string('description')
  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(TABLES.reviews, function (t) {
    t.dropColumns(
      'approved',
      'description'
    );
  });
};