const Model = require('../model');
const { raw } = require('objection');
const { API_URL } = process.env;

class TranslationService extends Model {
  static get tableName() {
    return 'translation_services';
  }

  static get idColumn() {
    return 'id';
  }
}

module.exports = TranslationService;
