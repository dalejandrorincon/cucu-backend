const Model = require('../model');
const { raw } = require('objection');
const { API_URL } = process.env;

class Unavailability extends Model {
  static get tableName() {
    return 'unavailabilities';
  }

  static get idColumn() {
    return 'id';
  }
}

module.exports = Unavailability;
