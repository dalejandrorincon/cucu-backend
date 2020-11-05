const Knex = require('knex');
const connection = require('../knexfile');

const knexConnection = Knex(connection);

module.exports = knexConnection;