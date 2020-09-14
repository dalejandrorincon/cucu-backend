const Model = require('../model');
const { raw } = require('objection');
const { API_URL } = process.env;

class Platform extends Model {
  static get tableName() {
    return 'platforms';
  }

  static get idColumn() {
    return 'id';
  }
}

module.exports = Platform;
