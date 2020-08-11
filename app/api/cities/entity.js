const Model = require('../model');
const Department = require('../departments/entity');

class City extends Model {
    static get tableName() {
        return 'cities';
    }

    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        return {
            department: {
                relation: Model.BelongsToOneRelation,
                modelClass: Department,
                join: {
                    from: 'cities.department_id',
                    to: 'departments.id'
                }
            }
        };
    }

}

module.exports = City;
