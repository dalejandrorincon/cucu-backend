const { TABLES } = require('../../utils/constants');

exports.up = function (knex) {
  return knex.schema.alterTable(TABLES.users, function (t) {

    t.string('address_additional');
    t.string('approved_translator').defaultTo("0");
    t.jsonb('remote_tools'),
    t.jsonb('admin_permissions')

  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(TABLES.users, function (t) {
    t.dropColumns(
      'address_additional',
      'approved_translator',
      'remote_tools',
      'admin_permissions'
    );
  });
};