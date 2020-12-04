const { TABLES } = require('../../utils/constants');

exports.up = function (knex) {
	return knex.schema.alterTable(TABLES.countries, function (t) {
        t.string('name_en');
        t.string('name_es'); 
        t.string('name').nullable().alter();
	});
};

exports.down = (knex) => {
	return knex.schema.alterTable(TABLES.countries, function (t) {
		t.dropColumns(
			'name_en',
            'name_es'
		);
	});
};