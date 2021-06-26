const Model = require('../model');
const { raw } = require('objection');
const { API_URL } = process.env;

class Service extends Model {
  static get tableName() {
    return 'services';
  }

  static get idColumn() {
    return 'id';
  }
}

module.exports = Service;
