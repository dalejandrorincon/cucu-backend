const { TABLES } = require('../../utils/constants');

exports.seed = function(knex) {
  // Deletes ALL existing entries
   return knex(TABLES.platforms).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLES.platforms).insert([
        {id: 1, name: 'Zoom'},
      ]);
    });
};
