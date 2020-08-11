const Model = require('../model');
const { raw } = require('objection');
const { API_URL } = process.env;

class Language extends Model {
  static get tableName() {
    return 'languages';
  }

  static get idColumn() {
    return 'id';
  }
}

module.exports = Language;
