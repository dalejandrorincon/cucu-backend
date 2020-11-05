const Model = require('../model');
const { raw } = require('objection');
const { API_URL } = process.env;

class Bank extends Model {
  static get tableName() {
    return 'banks';
  }

  static get idColumn() {
    return 'id';
  }
}

module.exports = Bank;
