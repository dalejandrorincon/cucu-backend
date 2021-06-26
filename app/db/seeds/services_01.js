const { TABLES } = require('../../utils/constants');

exports.seed = function(knex) {
  // Deletes ALL existing entries
   return knex(TABLES.services).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLES.services).insert([
        {
          name_es: "Traduccion simultánea",
          name_en: "Simultaneous traduction"
        },
        {
          name_es: "Traducciòn escrita",
          name_en: "Write translation"
        },
        {
          name_es: "Subtitulación",
          name_en: "Subtitulation"
        },
        {
          name_es: "Narración",
          name_en: "VoiceOver"
        },
        

      ]);
    });
};
