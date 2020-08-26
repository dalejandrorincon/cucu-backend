const Model = require('../model');
const { raw } = require('objection');
const { API_URL } = process.env;

class Review extends Model {
  static get tableName() {
    return 'reviews';
  }

  static get idColumn() {
    return 'id';
  }
}

module.exports = Review;
