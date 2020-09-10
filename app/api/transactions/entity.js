const Model = require('../model');
const User = require('../users/entity');

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
        }
    };
}
}

module.exports = TranslationService;
