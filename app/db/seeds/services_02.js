const { TABLES } = require('../../utils/constants');

exports.seed = function(knex) {
  // Deletes ALL existing entries
   return knex(TABLES.services).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLES.services).insert([
        {
          name_es: "Interpretación simultánea",
          name_en: "Simultaneous interpretation"
        },
        {
          name_es: "Traducción escrita",
          name_en: "Written translation"
        },
        {   
          name_es: "Subtitulación",
          name_en: "Subtitling"
        },
        {
          name_es: "Voiceover",
          name_en: "Voiceover"
        },
      ]);
    });
};
