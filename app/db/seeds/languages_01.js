const { TABLES } = require('../../utils/constants');

exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex(TABLES.languages).del()
        .then(function () {
            // Inserts seed entries
            return knex(TABLES.languages).insert([
                { name_es: "Afrikáans", name_en: "Afrikaans" },
                { name_es: "Albanés", name_en: "Albanian" },
                { name_es: "Alemán", name_en: "German" },
                { name_es: "Amhárico", name_en: "Amharic" },
                { name_es: "Árabe", name_en: "Arabic" },
                { name_es: "Armenio", name_en: "Armenian" },
                { name_es: "Azerí", name_en: "Azerbaijani" },
                { name_es: "Bengalí", name_en: "Bengali" },
                { name_es: "Bielorruso", name_en: "Belarusian" },
                { name_es: "Birmano", name_en: "Burmese" },
                { name_es: "Bosnio", name_en: "Bosnian" },
                { name_es: "Búlgaro", name_en: "Bulgarian" },
                { name_es: "Camboyano", name_en: "Khmer" },
                { name_es: "Canarés", name_en: "Kannada" },
                { name_es: "Catalán", name_en: "Catalan" },
                { name_es: "Cebuano", name_en: "Cebuano" },
                { name_es: "Checo", name_en: "Czech" },
                { name_es: "Chichewa", name_en: "Chichewa" },
                { name_es: "Chino", name_en: "Chinese" },
                { name_es: "Cingalés", name_en: "Sinhala" },
                { name_es: "Coreano", name_en: "Korean" },
                { name_es: "Corso", name_en: "Corsican" },
                { name_es: "Criollo haitiano", name_en: "Haitian Creole" },
                { name_es: "Croata", name_en: "Croatian" },
                { name_es: "Danés", name_en: "Danish" },
                { name_es: "Eslovaco", name_en: "Slovakian" },
                { name_es: "Esloveno", name_en: "Slovenian" },
                { name_es: "Español", name_en: "Spanish" },
                { name_es: "Esperanto", name_en: "Esperanto" },
                { name_es: "Estonio", name_en: "Estonian" },
                { name_es: "Euskera", name_en: "Basque" },
                { name_es: "Finlandés", name_en: "Finnish" },
                { name_es: "Francés", name_en: "French" },
                { name_es: "Frisio", name_en: "Frisian" },
                { name_es: "Gaélico escocés", name_en: "Scots Gaelic" },
                { name_es: "Galés", name_en: "Welsh" },
                { name_es: "Gallego", name_en: "Galician" },
                { name_es: "Georgiano", name_en: "Georgian" },
                { name_es: "Griego", name_en: "Greek" },
                { name_es: "Gujarati", name_en: "Gujarati" },
                { name_es: "Hausa", name_en: "Hausa" },
                { name_es: "Hawaiano", name_en: "Hawaiian" },
                { name_es: "Hebreo", name_en: "Hebrew" },
                { name_es: "Hindi", name_en: "Hindi" },
                { name_es: "Hmong", name_en: "Hmong" },
                { name_es: "Húngaro", name_en: "Hungarian" },
                { name_es: "Igbo", name_en: "Igbo" },
                { name_es: "Indonesio", name_en: "Indonesian" },
                { name_es: "Inglés", name_en: "English" },
                { name_es: "Irlandés", name_en: "Irish" },
                { name_es: "Islandés", name_en: "Icelandic" },
                { name_es: "Italiano", name_en: "Italian" },
                { name_es: "Japonés", name_en: "Japanese" },
                { name_es: "Javanés", name_en: "Javanese" },
                { name_es: "Kazajo", name_en: "Kazakh" },
                { name_es: "Kinyarwanda", name_en: "Kinyarwanda" },
                { name_es: "Kirguís", name_en: "Kurdish" },
                { name_es: "Kurdo", name_en: "Luxembourgish" },
                { name_es: "Lao", name_en: "Lao" },
                { name_es: "Latín", name_en: "Latin" },
                { name_es: "Letón", name_en: "Latvian" },
                { name_es: "Lituano", name_en: "Lithuanian" },
                { name_es: "Luxemburgués", name_en: "Luxembourgish" },
                { name_es: "Macedonio", name_en: "Macedonian" },
                { name_es: "Malayalam", name_en: "Malayalam" },
                { name_es: "Malayo", name_en: "Malay" },
                { name_es: "Malgache", name_en: "Malagasy" },
                { name_es: "Maltés", name_en: "Maltese" },
                { name_es: "Maorí", name_en: "Maori" },
                { name_es: "Maratí", name_en: "Marathi" },
                { name_es: "Mongol", name_en: "Mongolian" },
                { name_es: "Neerlandés", name_en: "Dutch" },
                { name_es: "Nepalí", name_en: "Nepali" },
                { name_es: "Noruego", name_en: "Norwegian" },
                { name_es: "Oriya", name_en: "Odia (Oriya)" },
                { name_es: "Panyabí", name_en: "Punjabi" },
                { name_es: "Pastún", name_en: "Pashto" },
                { name_es: "Persa", name_en: "Persian" },
                { name_es: "Polaco", name_en: "Polish" },
                { name_es: "Portugués", name_en: "Portuguese" },
                { name_es: "Rumano", name_en: "Romanian" },
                { name_es: "Ruso", name_en: "Russian" },
                { name_es: "Samoano", name_en: "Samoan" },
                { name_es: "Serbio", name_en: "Serbian" },
                { name_es: "Sesoto", name_en: "Sesotho" },
                { name_es: "Shona", name_en: "Shona" },
                { name_es: "Sindhi", name_en: "Sindhi" },
                { name_es: "Somalí", name_en: "Somali" },
                { name_es: "Suajili", name_en: "Swahili" },
                { name_es: "Sueco", name_en: "Swedish" },
                { name_es: "Sundanés", name_en: "Sundanese" },
                { name_es: "Tagalo", name_en: "Filipino" },
                { name_es: "Tailandés", name_en: "Thai" },
                { name_es: "Tamil", name_en: "Tamil" },
                { name_es: "Tártaro", name_en: "Tatar" },
                { name_es: "Tayiko", name_en: "Tajik" },
                { name_es: "Telugu", name_en: "Telugu" },
                { name_es: "Turco", name_en: "Turkish" },
                { name_es: "Turkmeno", name_en: "Turkmen" },
                { name_es: "Ucraniano", name_en: "Ukrainian" },
                { name_es: "Uigur", name_en: "Uyghur" },
                { name_es: "Urdu", name_en: "Urdu" },
                { name_es: "Uzbeco", name_en: "Uzbek" },
                { name_es: "Vietnamita", name_en: "Vietnamese" },
                { name_es: "Xhosa", name_en: "Xhosa" },
                { name_es: "Yidis", name_en: "Yiddish" },
                { name_es: "Yoruba", name_en: "Yoruba" },
                { name_es: "Zulú", name_en: "Zulu" }

            ]);
        });
};




























































































































































































