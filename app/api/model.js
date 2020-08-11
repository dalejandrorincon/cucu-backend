const { Model } = require('objection');
const knexConnection = require('../db');

Model.knex(knexConnection);

module.exports = Model;
