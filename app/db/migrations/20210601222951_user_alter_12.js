const { TABLES } = require('../../utils/constants');

exports.up = function (knex) {
  return knex.schema.alterTable(TABLES.users, function (t) {
    t.string('sworn');
    t.string('not sworn');
    t.string('simultaneous');
    t.string('consecutive');
  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(TABLES.users, function (t) {
    t.dropColumns(
        'sworn',
        'not sworn',
        'simultaneous',
        'consecutive',
    );
  });
};
