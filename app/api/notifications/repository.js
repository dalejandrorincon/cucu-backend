const Base = require('../base.repository');
const Platform = require('./entity');

const fields = [
	'name',
	'type',
	'receiver_id',
	'sender_id',
	'read',
	'deleted'
];

class Repository extends Base {
	constructor(props) {
		super(props);
	}

	getModel() {
		return Platform;
	}

	getNotifications(receiver_id) {
		return this.model
			.query()
			.where("receiver_id", receiver_id)
			.where("deleted", false)
			.withGraphFetched('receiver(selectNamesAndId)')
			.withGraphFetched('sender(selectNamesAndId)')
			.modifiers({
				selectNamesAndId(builder) {
				builder.select('firstname', 'lastname', 'id');
				}
			})
			.orderBy('created_at', 'desc')
			
	}
}

module.exports = new Repository(fields);
