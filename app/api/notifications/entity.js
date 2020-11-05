const Model = require('../model');
const User = require('../users/entity');

class Notification extends Model {
	static get tableName() {
		return 'notifications';
	}

	static get idColumn() {
		return 'id';
	}

	static get relationMappings() {
		return {
			receiver: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: 'notifications.receiver_id',
					to: 'users.id'
				}
			},
			sender: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: 'notifications.sender_id',
					to: 'users.id'
				}
			}
		};
	}
}

module.exports = Notification;
