const { TABLES } = require('../../utils/constants');

exports.up = function (knex) {
  console.log(TABLES.translation_services)
  return knex.schema.alterTable(TABLES.translation_services, function (t) {
    t.string('duration_amount');
    t.string('duration_type');
    t
    .integer('platform_id') 
    .unsigned()
    .references('id')
    .inTable(TABLES.platforms)
    .onUpdate('CASCADE');

    t.dropColumns('platform')

    t.string('status').defaultTo("0").alter();
    t.string('description', 550).alter();

    
  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(TABLES.translation_services, function (t) {
    t.dropColumns(
      'duration_amount',
      'duration_type',
      'platform_id'
    );

    t.string('platform');
  });
};