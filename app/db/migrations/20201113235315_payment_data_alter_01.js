const { TABLES } = require('../../utils/constants');

exports.up = function (knex) {
  return knex.schema.alterTable(TABLES.payment_data, function (t) {
    t
        .integer('country_id')
        .unsigned()
        .references('id')
        .inTable(TABLES.countries)
        .onUpdate('CASCADE');
  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(TABLES.payment_data, function (t) {
    t.dropColumns(
      'country_id'
    );
  });
};