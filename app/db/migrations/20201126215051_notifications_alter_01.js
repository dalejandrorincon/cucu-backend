const { TABLES } = require('../../utils/constants');

exports.up = function (knex) {
	console.log(TABLES.notifications)
	return knex.schema.alterTable(TABLES.notifications, function (t) {
		t
			.integer('service_id')
			.unsigned()
			.references('id')
			.inTable(TABLES.translation_services)
			.onUpdate('CASCADE');
	});
};

exports.down = (knex) => {
	return knex.schema.alterTable(TABLES.notifications, function (t) {
		t.dropColumns(
			'service_id',
		);
	});
};