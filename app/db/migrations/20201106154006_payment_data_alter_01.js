const { TABLES } = require('../../utils/constants');

exports.up = function (knex) {
  return knex.schema.alterTable(TABLES.payment_data, function (t) {
    t.string('bank')
  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(TABLES.payment_data, function (t) {
    t.dropColumns(
      'bank',
    );
  });
};