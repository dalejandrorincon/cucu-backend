const { TABLES } = require('../../utils/constants');

exports.seed = function(knex) {
  // Deletes ALL existing entries
   return knex(TABLES.specialities).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLES.specialities).insert([
        {
            name_es: "Académica",
            name_en: "Academic"
        },
        {
            name_es: "Administración",
            name_en: "Administration"
        },
        {
            name_es: "Ambiental",
            name_en: "Environmental"
        },
        {
            name_es: "Arquitectura",
            name_en: "Architecture"
        },
        {
            name_es: "Arte",
            name_en: "Art"
        },
        {
            name_es: "Automotriz",
            name_en: "Automotive"
        },
        {
            name_es: "Aviación",
            name_en: "Aviation"
        },
        {
            name_es: "Científica",
            name_en: "Scientific"
        },
        {
            name_es: "Comercio",
            name_en: "Commerce"
        },
        {
            name_es: "Construcción",
            name_en: "Building"
        },
        {
            name_es: "Cultural",
            name_en: "Cultural"
        },
        {
            name_es: "Diseño",
            name_en: "Design"
        },
        {
            name_es: "Farmacéutica",
            name_en: "Pharmaceutical"
        },
        {
            name_es: "Finanzas",
            name_en: "Finances"
        },
        {
            name_es: "General",
            name_en: "General"
        },
        {
            name_es: "Industria",
            name_en: "Industry"
        },
        {
            name_es: "Ingeniería",
            name_en: "Engineering"
        },
        {
            name_es: "Innovación y emprendimiento",
            name_en: "Innovation and Entrepreneurship"
        },
        {
            name_es: "Jurídica",
            name_en: "Juridical"
        },
        {
            name_es: "Legal",
            name_en: "Legal"
        },
        {
            name_es: "Marketing",
            name_en: "Marketing"
        },
        {
            name_es: "Medicina",
            name_en: "Medicine"
        },
        {
            name_es: "Minería",
            name_en: "Mining"
        },
        {
            name_es: "Moda",
            name_en: "Fashion"
        },
        {
            name_es: "Negocios",
            name_en: "Business"
        },
        {
            name_es: "Petroleo y gas",
            name_en: "Petrol and gas"
        },
        {
            name_es: "Tecnología",
            name_en: "Technology"
        },
        {
            name_es: "Telecomunicaciones",
            name_en: "Telecommunications"
        }
      ]);
    });
};