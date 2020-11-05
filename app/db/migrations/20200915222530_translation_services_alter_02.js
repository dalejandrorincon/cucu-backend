const { TABLES } = require('../../utils/constants');

exports.up = function (knex) {
  console.log(TABLES.translation_services)
  return knex.schema.alterTable(TABLES.translation_services, function (t) {
    t.string('time_type');
    t.jsonb('shared_with');

  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(TABLES.translation_services, function (t) {
    t.dropColumns(
      'time_type',
      'shared_with'
    );
  });
};