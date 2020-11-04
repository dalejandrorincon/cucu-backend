const { TABLES } = require('../../utils/constants');

exports.up = function (knex) {
  console.log(TABLES.translation_services)
  return knex.schema.alterTable(TABLES.translation_services, function (t) {
    t.string('platform_other').defaultTo(false)
  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(TABLES.translation_services, function (t) {
    t.dropColumns(
      'platform_other',
    );
  });
};