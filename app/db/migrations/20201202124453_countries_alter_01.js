const { TABLES } = require('../../utils/constants');

exports.up = function (knex) {
	return knex.schema.alterTable(TABLES.countries, function (t) {
        t.boolean('stripe_available').defaultTo(false);
	});
};

exports.down = (knex) => {
	return knex.schema.alterTable(TABLES.countries, function (t) {
		t.dropColumns(
			'stripe_available',
		);
	});
};