const Model = require('../model');
const { raw } = require('objection');
const { API_URL } = process.env;

class Department extends Model {
  static get tableName() {
    return 'departments';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
        country: {
            relation: Model.BelongsToOneRelation,
            modelClass: Department,
            join: {
                from: 'departments.country_id',
                to: 'countries.id'
            }
        }
    };
}
}

module.exports = Department;
