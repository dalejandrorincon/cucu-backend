const { TABLES } = require('../../utils/constants');
const bcrypt = require('bcryptjs');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  /* return knex(TABLES.users).del()
    .then(function () { */
      // Inserts seed entries
      return knex(TABLES.users).insert([
        {
          //id: 10,
          firstname: 'Admin',
          lastname: 'Prueba',
          password: bcrypt.hashSync('test123', bcrypt.genSaltSync(10)),
          role: 'admin',
          document: '123456789',
          phone: '+57123456789',
          email: 'test@admin.com',
        },

        {
          //id: 11,
          firstname: 'Traductor',
          lastname: 'Prueba',
          password: bcrypt.hashSync('test123', bcrypt.genSaltSync(10)),
          role: 'translator',
          document: '123456123',
          phone: '+57111111111',
          email: 'test@translator.com',
          rate: 25,
          address_1: "test1",
          address_2: "test2",
          nationality: "test",
          description: "test test test",
          /* certifications: [
            {
              "name": "test",
              "school": "test2",
              "date": "10/10/1980",
              "image_url": "http://www.test.com"
            },
            {
              "name": "test",
              "school": "test2",
              "date": "10/10/1980",
              "image_url": "http://www.test.com"
            },
            {
              "name": "test",
              "school": "test2",
              "date": "10/10/1980",
              "image_url": "http://www.test.com"
            },
            {
              "name": "test",
              "school": "test2",
              "date": "10/10/1980",
              "image_url": "http://www.test.com"
            }

          ],
          specialities: [8, 7, 6, 5],
          work_experience: [
            {
              "company": "test",
              "description": "test 124234",
              "labor_months": "12",
              "url": "http://www.test.com"
            },
            {
              "company": "test",
              "description": "test 124234",
              "labor_months": "12",
              "url": "http://www.test.com"
            }
          ] */


        },

        {
          //id: 12,
          firstname: 'Cliente',
          lastname: 'Prueba',
          password: bcrypt.hashSync('test123', bcrypt.genSaltSync(10)),
          role: 'client',
          document: '123456222',
          phone: '+57123456222',
          email: 'test@client.com',
        },
      ]);
    //});
};
