const { TABLES } = require('../../utils/constants');

exports.up = function (knex) {
  return knex.schema.alterTable(TABLES.users, function (t) {
    t.dropColumns(
        'language_1', 
        'language_2', 
        'language_3'
    );

    t.jsonb('languages');

  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(TABLES.users, function (t) {
    t.dropColumns(
      'languages'
    );
  });
};