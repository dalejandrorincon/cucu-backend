const { TABLES } = require('../../utils/constants');

exports.up = function (knex) {
  return knex.schema.alterTable(TABLES.users, function (t) {
    t
      .integer('city_id') 
      .unsigned()
      .references('id')
      .inTable(TABLES.cities)
      .onUpdate('CASCADE');

    t
      .integer('department_id') 
      .unsigned()
      .references('id')
      .inTable(TABLES.departments)
      .onUpdate('CASCADE');

    t
      .integer('country_id')
      .unsigned()
      .references('id')
      .inTable(TABLES.countries)
      .onUpdate('CASCADE');

    t
      .integer('language_1') 
      .unsigned()
      .references('id')
      .inTable(TABLES.languages)
      .onUpdate('CASCADE');

    t
      .integer('language_2') 
      .unsigned()
      .references('id')
      .inTable(TABLES.languages)
      .onUpdate('CASCADE');

    t
      .integer('language_3') 
      .unsigned()
      .references('id')
      .inTable(TABLES.languages)
      .onUpdate('CASCADE');
  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(TABLES.users, function (t) {
    t.dropColumns(
      'city_id', 
      'department_id', 
      'country_id', 
      'language_1', 
      'language_2', 
      'language_3' 
    );
  });
};