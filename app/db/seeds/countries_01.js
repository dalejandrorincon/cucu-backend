const { TABLES } = require('../../utils/constants');

exports.seed = function(knex) {
  // Deletes ALL existing entries
   return knex(TABLES.countries).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLES.countries).insert([
        {
          name_en: "Albania",
          name_es: "Albania"
        },
        {
          name_en: "Algeria",
          name_es: "Argelia"
        },
        {
          name_en: "American Samoa",
          name_es: "Samoa Americana"
        },
        {
          name_en: "Andorra",
          name_es: "Andorra"
        },
        {
          name_en: "Angola",
          name_es: "Angola"
        },
        {
          name_en: "Anguilla",
          name_es: "Anguila"
        },
        {
          name_en: "Antarctica",
          name_es: "Antártida"
        },
        {
          name_en: "Antigua and Barbuda",
          name_es: "Antigua y Barbuda"
        },
        {
          name_en: "Argentina",
          name_es: "Argentina"
        },
        {
          name_en: "Armenia",
          name_es: "Armenia"
        },
        {
          name_en: "Aruba",
          name_es: "Aruba"
        },
        {
          name_en: "Australia",
          name_es: "Australia"
        },
        {
          name_en: "Austria",
          name_es: "Austria"
        },
        {
          name_en: "Azerbaijan",
          name_es: "Azerbaiyán"
        },
        {
          name_en: "Bahamas",
          name_es: "Bahamas"
        },
        {
          name_en: "Bahrain",
          name_es: "Bahréin"
        },
        {
          name_en: "Bangladesh",
          name_es: "Bangladesh"
        },
        {
          name_en: "Barbados",
          name_es: "Barbados"
        },
        {
          name_en: "Belarus",
          name_es: "Bielorrusia"
        },
        {
          name_en: "Belgium",
          name_es: "Bélgica"
        },
        {
          name_en: "Belize",
          name_es: "Belice"
        },
        {
          name_en: "Benin",
          name_es: "Benin"        
        },
        {
          name_en: "Bermuda",
          name_es: "islas Bermudas"
        },
        {
          name_en: "Bhutan",
          name_es: "Bután"
        },
        {
          name_en: "Bolivia",
          name_es: "Bolivia"
        },
        {
          name_en: "Bonaire, Sint Eustatius and Saba",
          name_es: "Bonaire, San Eustaquio y Saba"
        },
        {
          name_en: "Bosnia and Herzegovina",
          name_es: "Bosnia y Herzegovina"
        },
        {
          name_en: "Botswana",
          name_es: "Botsuana"
        },
        {
          name_en: "Bouvet Island",
          name_es: "Isla Bouvet"
        },
        {
          name_en: "Brazil",
          name_es: "Brasil"
        },
        {
          name_en: "British Indian Ocean Territory",
          name_es: "Territorio Británico del Océano Índico"
        },
        {
          name_en: "Brunei",
          name_es: "Brunei"
        },
        {
          name_en: "Bulgaria",
          name_es: "Bulgaria"
        },
        {
          name_en: "Burkina Faso",
          name_es: "Burkina Faso"
        },
        {
          name_en: "Burundi",
          name_es: "Burundi"
        },
        {
          name_en: "Cambodia",
          name_es: "Camboya"
        },
        {
          name_en: "Cameroon",
          name_es: "Camerún"
        },
        {
          name_en: "Canada",
          name_es: "Canadá"
        },
        {
          name_en: "Cape Verde",
          name_es: "Cabo Verde"
        },
        {
          name_en: "Cayman Islands",
          name_es: "Islas Caimán"
        },
        {
          name_en: "Central African Republic",
          name_es: "República Centroafricana"
        },
        {
          name_en: "Chad",
          name_es: "Chad"
        },
        {
          name_en: "Chile",
          name_es: "Chile"
        },
        {
          name_en: "China",
          name_es: "China"
        },
        {
          name_en: "Christmas Island",
          name_es: "Isla de Navidad"
        },
        {
          name_en: "Cocos (Keeling) Islands",
          name_es: "Islas Cocos (Keeling)"
        },
        {
          name_en: "Colombia",
          name_es: "Colombia"
        },
        {
          name_en: "Comoros",
          name_es: "Comoras"
        },
        {
          name_en: "Congo",
          name_es: "Congo"
        },
        {
          name_en: "Cook Islands",
          name_es: "Islas Cook"
        },
        {
          name_en: "Costa Rica",
          name_es: "Costa Rica"
        },
        {
          name_en: "Ivory Coast",
          name_es: "Costa de Marfil"
        },
        {
          name_en: "Croatia",
          name_es: "Croacia"
        },
        {
          name_en: "Cuba",
          name_es: "Cuba",        
        },
        {
          name_en: "Curacao",
          name_es: "Curacao"
        },
        {
          name_en: "Cyprus",
          name_es: "Chipre"
        },
        {
          name_en: "Czech Republic",
          name_es: "Republica checa"
        },
        {
          name_en: "Democratic Republic of the Congo",
          name_es: "República Democrática del Congo"
        },
        {
          name_en: "Denmark",
          name_es: "Dinamarca"
        },
        {
          name_en: "Djibouti",
          name_es: "Djibouti"
        },
        {
          name_en: "Dominica",
          name_es: "Dominica"
        },
        {
          name_en: "Dominican Republic",
          name_es: "República Dominicana"
        },
        {
          name_en: "Ecuador",
          name_es: "Ecuador"
        },
        {
          name_en: "Egypt",
          name_es: "Egipto"
        },
        {
          name_en: "El Salvador",
          name_es: "El Salvador"
        },
        {
          name_en: "Equatorial Guinea",
          name_es: "Guinea Ecuatorial"
        },
        {
          name_en: "Eritrea",
          name_es: "Eritrea"
        },
        {
          name_en: "Estonia",
          name_es: "Estonia"
        },
        {
          name_en: "Ethiopia",
          name_es: "Etiopía"
        },
        {
          name_en: "Falkland Islands (Malvinas)",
          name_es: "Islas Falkland (Malvinas)"
        },
        {
          name_en: "Faroe Islands",
          name_es: "Islas Faroe"
        },
        {
          name_en: "Fiji",
          name_es: "Fiyi"
        },
        {
          name_en: "Finland",
          name_es: "Finlandia"
        },
        {
          name_en: "France",
          name_es: "Francia"
        },
        {
          name_en: "French Guiana",
          name_es: "Guayana Francesa"
        },
        {
          name_en: "French Polynesia",
          name_es: "Polinesia francés"
        },
        {
          name_en: "French Southern Territories",
          name_es: "Territorios Franceses del Sur"
        },
        {
          name_en: "Gabon",
          name_es: "Gabón"
        },
        {
          name_en: "Gambia",
          name_es: "Gambia"
        },
        {
          name_en: "Georgia",
          name_es: "Georgia"
        },
        {
          name_en: "Germany",
          name_es: "Alemania"
        },
        {
          name_en: "Ghana",
          name_es: "Ghana"
        },
        {
          name_en: "Gibraltar",
          name_es: "Gibraltar"
        },
        {
          name_en: "Greece",
          name_es: "Grecia"
        },
        {
          name_en: "Greenland",
          name_es: "Groenlandia"
        },
        {
          name_en: "Grenada",
          name_es: "Granada"
        },
        {
          name_en: "Guadaloupe",
          name_es: "Guadalupe"
        },
        {
          name_en: "Guam",
          name_es: "Guam"
        },
        {
          name_en: "Guatemala",
          name_es: "Guatemala"
        },
        {
          name_en: "Guernsey",
          name_es: "Guernsey"
        },
        {
          name_en: "Guinea",
          name_es: "Guinea"
        },
        {
          name_en: "Guinea-Bissau",
          name_es: "Guinea-Bissau"
        },
        {
          name_en: "Guyana",
          name_es: "Guayana"
        },
        {
          name_en: "Haiti",
          name_es: "Haití"
        },
        {
          name_en: "Heard Island and McDonald Islands",
          name_es: "Islas Heard y McDonald"
        },
        {
          name_en: "Honduras",
          name_es: "Honduras"
        },
        {
          name_en: "Hong Kong",
          name_es: "Hong Kong"
        },
        {
          name_en: "Hungary",
          name_es: "Hungría"
        },
        {
          name_en: "Iceland",
          name_es: "Islandia"
        },
        {
          name_en: "India",
          name_es: "India"
        },
        {
          name_en: "Indonesia",
          name_es: "Indonesia"
        },
        {
          name_en: "Iran",
          name_es: "Iran"
        },
        {
          name_en: "Iraq",
          name_es: "Irak"
        },
        {
          name_en: "Ireland",
          name_es: "Irlanda"
        },
        {
          name_en: "Isle of Man",
          name_es: "Isla de Man"
        },
        {
          name_en: "Israel",
          name_es: "Israel"
        },
        {
          name_en: "Italy",
          name_es: "Italia"
        },
        {
          name_en: "Jamaica",
          name_es: "Jamaica"
        },
        {
          name_en: "Japan",
          name_es: "Japón"
        },
        {
          name_en: "Jersey",
          name_es: "Jersey"
        },
        {
          name_en: "Jordan",
          name_es: "Jordán"
        },
        {
          name_en: "Kazakhstan",
          name_es: "Kazajstán"
        },
        {
          name_en: "Kenya",
          name_es: "Kenia"
        },
        {
          name_en: "Kiribati",
          name_es: "Kiribati"
        },
        {
          name_en: "Kosovo",
          name_es: "Kosovo"
        },
        {
          name_en: "Kuwait",
          name_es: "Kuwait"
        },
        {
          name_en: "Kyrgyzstan",
          name_es: "Kirguistán"
        },
        {
          name_en: "Laos",
          name_es: "Laos"
        },
        {
          name_en: "Latvia",
          name_es: "Letonia"
        },
        {
          name_en: "Lebanon",
          name_es: "Líbano"
        },
        {
          name_en: "Lesotho",
          name_es: "Lesoto"
        },
        {
          name_en: "Liberia",
          name_es: "Liberia"
        },
        {
          name_en: "Libya",
          name_es: "Libia"
        },
        {
          name_en: "Liechtenstein",
          name_es: "Liechtenstein"
        },
        {
          name_en: "Lithuania",
          name_es: "Lituania"
        },
        {
          name_en: "Luxembourg",
          name_es: "Luxemburgo"
        },
        {
          name_en: "Macao",
          name_es: "Macao"
        },
        {
          name_en: "Macedonia",
          name_es: "macedonia"
        },
        {
          name_en: "Madagascar",
          name_es: "Madagascar"
        },
        {
          name_en: "Malawi",
          name_es: "Malawi"
        },
        {
          name_en: "Malaysia",
          name_es: "Malasia"
        },
        {
          name_en: "Maldives",
          name_es: "Maldivas"
        },
        {
          name_en: "Mali",
          name_es: "Mali"
        },
        {
          name_en: "Malta",
          name_es: "Malta"
        },
        {
          name_en: "Marshall Islands",
          name_es: "Islas Marshall"
        },
        {
          name_en: "Martinique",
          name_es: "Martinica"
        },
        {
          name_en: "Mauritania",
          name_es: "Mauritania"
        },
        {
          name_en: "Mauritius",
          name_es: "Mauricio"
        },
        {
          name_en: "Mayotte",
          name_es: "Mayotte"
        },
        {
          name_en: "Mexico",
          name_es: "México"
        },
        {
          name_en: "Micronesia",
          name_es: "Micronesia"
        },
        {
          name_en: "Moldava",
          name_es: "Moldava"
        },
        {
          name_en: "Monaco",
          name_es: "Mónaco"
        },
        {
          name_en: "Mongolia",
          name_es: "Mongolia"
        },
        {
          name_en: "Montenegro",
          name_es: "Montenegro"
        },
        {
          name_en: "Montserrat",
          name_es: "Montserrat"
        },
        {
          name_en: "Morocco",
          name_es: "Marruecos"
        },
        {
          name_en: "Mozambique",
          name_es: "Mozambique"
        },
        {
          name_en: "Myanmar (Burma)",
          name_es: "Myanmar (Birmania)"
        },
        {
          name_en: "Namibia",
          name_es: "Namibia"
        },
        {
          name_en: "Nauru",
          name_es: "Nauru"
        },
        {
          name_en: "Nepal",
          name_es: "Nepal"
        },
        {
          name_en: "Netherlands",
          name_es: "Países Bajos"
        },
        {
          name_en: "New Caledonia",
          name_es: "Nueva Caledonia"
        },
        {
          name_en: "New Zealand",
          name_es: "Nueva Zelanda"
        },
        {
          name_en: "Nicaragua",
          name_es: "Nicaragua"
        },
        {
          name_en: "Niger",
          name_es: "Níger"
        },
        {
          name_en: "Nigeria",
          name_es: "Nigeria"
        },
        {
          name_en: "Niue",
          name_es: "Niue"
        },
        {
          name_en: "Norfolk Island",
          name_es: "Isla Norfolk"
        },
        {
          name_en: "North Korea",
          name_es: "Corea del Norte"
        },
        {
          name_en: "Northern Mariana Islands",
          name_es: "Islas Marianas del Norte"
        },
        {
          name_en: "Norway",
          name_es: "Noruega"
        },
        {
          name_en: "Oman",
          name_es: "Omán"
        },
        {
          name_en: "Pakistan",
          name_es: "Pakistán"
        },
        {
          name_en: "Palau",
          name_es: "Palau"
        },
        {
          name_en: "Palestine",
          name_es: "Palestina"
        },
        {
          name_en: "Panama",
          name_es: "Panamá"
        },
        {
          name_en: "Papua New Guinea",
          name_es: "Papúa Nueva Guinea"
        },
        {
          name_en: "Paraguay",
          name_es: "Paraguay"
        },
        {
          name_en: "Peru",
          name_es: "Perú"
        },
        {
          name_en: "Phillipines",
          name_es: "Filipinas"
        },
        {
          name_en: "Pitcairn",
          name_es: "Pitcairn"
        },
        {
          name_en: "Poland",
          name_es: "Polonia"
        },
        {
          name_en: "Portugal",
          name_es: "Portugal"
        },
        {
          name_en: "Puerto Rico",
          name_es: "Puerto Rico"
        },
        {
          name_en: "Qatar",
          name_es: "Catar"
        },
        {
          name_en: "Reunion",
          name_es: "Reunión"
        },
        {
          name_en: "Romania",
          name_es: "Rumania"
        },
        {
          name_en: "Russia",
          name_es: "Rusia"
        },
        {
          name_en: "Rwanda",
          name_es: "Ruanda"
        },
        {
          name_en: "Saint Barthelemy",
          name_es: "San Bartolomé"
        },
        {
          name_en: "Saint Helena",
          name_es: "Santa elena"
        },
        {
          name_en: "Saint Kitts and Nevis",
          name_es: "Saint Kitts y Nevis"
        },
        {
          name_en: "Saint Lucia",
          name_es: "Santa Lucía"
        },
        {
          name_en: "Saint Martin",
          name_es: "San Martín"
        },
        {
          name_en: "Saint Pierre and Miquelon",
          name_es: "San Pedro y Miquelón"
        },
        {
          name_en: "Saint Vincent and the Grenadines",
          name_es: "San Vicente y las Granadinas"
        },
        {
          name_en: "Samoa",
          name_es: "Samoa"
        },
        {
          name_en: "San Marino",
          name_es: "San Marino"
        },
        {
          name_en: "Sao Tome and Principe",
          name_es: "Santo Tomé y Príncipe"
        },
        {
          name_en: "Saudi Arabia",
          name_es: "Arabia Saudita"
        },
        {
          name_en: "Senegal",
          name_es: "Senegal"
        },
        {
          name_en: "Serbia",
          name_es: "Serbia"
        },
        {
          name_en: "Seychelles",
          name_es: "Seychelles"
        },
        {
          name_en: "Sierra Leone",
          name_es: "Sierra Leona"
        },
        {
          name_en: "Singapore",
          name_es: "Singapur"
        },
        {
          name_en: "Sint Maarten",
          name_es: "San Martín"
        },
        {
          name_en: "Slovakia",
          name_es: "Eslovaquia"
        },
        {
          name_en: "Slovenia",
          name_es: "Eslovenia"
        },
        {
          name_en: "Solomon Islands",
          name_es: "Islas Salomón"
        },
        {
          name_en: "Somalia",
          name_es: "Somalia"
        },
        {
          name_en: "South Africa",
          name_es: "Sudáfrica"
        },
        {
          name_en: "South Georgia and the South Sandwich Islands",
          name_es: "Georgia del sur y las islas Sandwich del sur"
        },
        {
          name_en: "South Korea",
          name_es: "Corea del Sur"
        },
        {
          name_en: "South Sudan",
          name_es: "Sudán del Sur"
        },
        {
          name_en: "Spain",
          name_es: "España"
        },
        {
          name_en: "Sri Lanka",
          name_es: "Sri Lanka"
        },
        {
          name_en: "Sudan",
          name_es: "Sudán"
        },
        {
          name_en: "Suriname",
          name_es: "Surinam"
        },
        {
          name_en: "Svalbard and Jan Mayen",
          name_es: "Svalbard y Jan Mayen"
        },
        {
          name_en: "Swaziland",
          name_es: "Swazilandia"
        },
        {
          name_en: "Sweden",
          name_es: "Suecia"
        },
        {
          name_en: "Switzerland",
          name_es: "Suiza"
        },
        {
          name_en: "Syria",
          name_es: "Siria"
        },
        {
          name_en: "Taiwan",
          name_es: "Taiwán"
        },
        {
          name_en: "Tajikistan",
          name_es: "Tayikistán"
        },
        {
          name_en: "Tanzania",
          name_es: "Tanzania"
        },
        {
          name_en: "Thailand",
          name_es: "Tailandia"
        },
        {
          name_en: "Timor-Leste (East Timor)",
          name_es: "Timor-Leste (Timor Oriental)"
        },
        {
          name_en: "Togo",
          name_es: "Togo"
        },
        {
          name_en: "Tokelau",
          name_es: "Tokelau"
        },
        {
          name_en: "Tonga",
          name_es: "Tonga"
        },
        {
          name_en: "Trinidad and Tobago",
          name_es: "Trinidad y Tobago"
        },
        {
          name_en: "Tunisia",
          name_es: "Túnez"
        },
        {
          name_en: "Turkey",
          name_es: "Turquía"
        },
        {
          name_en: "Turkmenistan",
          name_es: "Turkmenistán"
        },
        {
          name_en: "Turks and Caicos Islands",
          name_es: "Islas Turcas y Caicos"
        },
        {
          name_en: "Tuvalu",
          name_es: "Tuvalu"
        },
        {
          name_en: "Uganda",
          name_es: "Uganda"
        },
        {
          name_en: "Ukraine",
          name_es: "Ucrania"
        },
        {
          name_en: "United Arab Emirates",
          name_es: "Emiratos Árabes Unidos"
        },
        {
          name_en: "United Kingdom",
          name_es: "Reino Unido"
        },
        {
          name_en: "United States",
          name_es: "Estados Unidos"
        },
        {
          name_en: "United States Minor Outlying Islands",
          name_es: "Islas menores alejadas de los Estados Unidos"
        },
        {
          name_en: "Uruguay",
          name_es: "Uruguay"
        },
        {
          name_en: "Uzbekistan",
          name_es: "Uzbekistán"
        },
        {
          name_en: "Vanuatu",
          name_es: "Vanuatu"
        },
        {
          name_en: "Vatican City",
          name_es: "Ciudad del Vaticano"
        },
        {
          name_en: "Venezuela",
          name_es: "Venezuela"
        },
        {
          name_en: "Vietnam",
          name_es: "Vietnam"
        },
        {
          name_en: "Virgin Islands, British",
          name_es: "Islas Vírgenes Británicas"
        },
        {
          name_en: "Virgin Islands, US",
          name_es: "Islas Vírgenes, EE. UU."
        },
        {
          name_en: "Wallis and Futuna",
          name_es: "Wallis y Futuna"
        },
        {
          name_en: "Western Sahara",
          name_es: "Sahara Occidental"
        },
        {
          name_en: "Yemen",
          name_es: "Yemen"
        },
        {
          name_en: "Zambia",
          name_es: "Zambia"
        },
        {
          name_en: "Zimbabwe",
          name_es: "Zimbabue"
        }
      ]);
    });
};


    