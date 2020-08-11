const Model = require('../model');
const { raw } = require('objection');
const { API_URL } = process.env;

class Country extends Model {
  static get tableName() {
    return 'countries';
  }

  static get idColumn() {
    return 'id';
  }
}

module.exports = Country;
