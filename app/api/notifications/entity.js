const Model = require('../model');

class Notification extends Model {
  static get tableName() {
    return 'notifications';
  }

  static get idColumn() {
    return 'id';
  }
}

module.exports = Notification;
