const Model = require('../model');
const { raw } = require('objection');
const { API_URL } = process.env;

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }
}

module.exports = User;
