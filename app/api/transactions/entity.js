const Model = require('../model');
const User = require('../users/entity');
const Service = require('../translation_services/entity');

class TranslationService extends Model {
  static get tableName() {
    return 'transactions';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
        translator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'transactions.translator_id',
                to: 'users.id'
            }
        },
        client: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'transactions.client_id',
                to: 'users.id'
            }
        },
        service: {
          relation: Model.BelongsToOneRelation,
          modelClass: Service,
          join: {
              from: 'transactions.service_id',
              to: 'translation_services.id'
          }
       }
    };
}
}

module.exports = TranslationService;
