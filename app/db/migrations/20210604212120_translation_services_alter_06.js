const { TABLES } = require('../../utils/constants');

exports.up = function (knex) {
  console.log(TABLES.translation_services)
  return knex.schema.alterTable(TABLES.translation_services, function (t) {
    t.string('sub_service')
  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(TABLES.translation_services, function (t) {
    t.dropColumns(
      'sub_service',
    );
  });
};
