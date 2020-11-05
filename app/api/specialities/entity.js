const Model = require('../model');
const { raw } = require('objection');
const { API_URL } = process.env;

class Speciality extends Model {
  static get tableName() {
    return 'specialities';
  }

  static get idColumn() {
    return 'id';
  }
}

module.exports = Speciality;
