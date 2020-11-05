const { TABLES } = require('../../utils/constants');

exports.up = function (knex) {
  return knex.schema.alterTable(TABLES.users, function (t) {

    t.string('rate_minute');
    t.string('rate_hour');
    t.dropColumns(
        'rate',
    );

  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(TABLES.users, function (t) {
    t.dropColumns(
      'rate_minute',
      'rate_hour'
    );
  });
};