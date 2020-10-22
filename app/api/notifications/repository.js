const Base = require('../base.repository');
const Platform = require('./entity');

const fields = [
	'name',
	'type',
	'receiver_id',
	'sender_id',
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
			.where("deleted", false);
	}
}

module.exports = new Repository(fields);
