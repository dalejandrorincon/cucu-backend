const { TABLES } = require('../../utils/constants');

exports.up = function (knex) {
  console.log(TABLES.translation_services)
  return knex.schema.alterTable(TABLES.translation_services, function (t) {
    t.string('cancel_reason', 550);
    t.boolean('paid_status').defaultTo(false)
    
    t.boolean('record').alter()
    t.jsonb('files_urls').alter();
  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(TABLES.translation_services, function (t) {
    t.dropColumns(
      'cancel_reason',
      'paid_status'
    );
  });
};