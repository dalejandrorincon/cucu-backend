const { TABLES } = require('../../utils/constants');

exports.up = function (knex) {
  return knex.schema.alterTable(TABLES.users, function (t) {

    t.string('half_day');
    t.string('full_day');
    t.string('rate_page');
    t.string('s_rate_min');
    t.string('v_rate_min');

    

  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(TABLES.users, function (t) {
    t.dropColumns(
        'half_day',
        'full_day',
        'rate_page',
        's_rate_min',
        'v_rate_min'
    );
  });
};