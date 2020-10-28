const { TABLES } = require('../../utils/constants');

exports.up = function (knex) {
  console.log(TABLES.transactions)
  return knex.schema.alterTable(TABLES.transactions, function (t) {
    t.string('payment_id');
    t.string('method_id');    
  });
};

exports.down = (knex) => {
  return knex.schema.alterTable(TABLES.transactions, function (t) {
    t.dropColumns(
      'payment_id',
      'method_id'
    );
  });
};