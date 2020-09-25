const { TABLES } = require('../../utils/constants');

exports.up = function (knex) {
  return knex.schema.alterTable(TABLES.cities, function (t) {
    t
        .integer('country_id')
        .unsigned()
        .notNull()
        .references('id')
        .inTable(TABLES.countries)
        .onUpdate('CASCADE');
    t
        .integer('department_id')
        .nullable()
        .alter();

  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(TABLES.cities, function (t) {
    t.dropColumns('country_id');
  });
};