const Model = require('../model');
const Department = require('../departments/entity');
const Country = require('../countries/entity');

class City extends Model {
    static get tableName() {
        return 'cities';
    }

    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        return {
            /* department: {
                relation: Model.BelongsToOneRelation,
                modelClass: Department,
                join: {
                    from: 'cities.department_id',
                    to: 'departments.id'
                }
            } */

            country: {
                relation: Model.BelongsToOneRelation,
                modelClass: Country,
                join: {
                    from: 'cities.country_id',
                    to: 'countries.id'
                }
            }
        };
    }

}

module.exports = City;
