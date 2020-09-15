const { TABLES } = require('../../utils/constants');

exports.up = function (knex) {
  return knex.schema.alterTable(TABLES.users, function (t) {
   
    t.string('description', 550).alter();
    t.string('image_url');
    t.string('company_name');

  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(TABLES.users, function (t) {
    t.dropColumns(
      'image_url',
      'company_name'
    );
  });
};