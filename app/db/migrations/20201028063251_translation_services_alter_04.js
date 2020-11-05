const { TABLES } = require('../../utils/constants');

exports.up = function (knex) {
  console.log(TABLES.translation_services)
  return knex.schema.alterTable(TABLES.translation_services, function (t) {
    t.boolean('rated').defaultTo(false)
  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(TABLES.translation_services, function (t) {
    t.dropColumns(
      'rated',
    );
  });
};