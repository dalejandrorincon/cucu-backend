const Base = require('../base.repository');
const User = require('./entity');
const { raw } = require('objection');

const fields = [
  'firstname',
  'lastname',
  'password',
  'document',
  'phone',
  'email',
  'role',
  'disabled',
  'deleted',
  'rate',
  'country_id',
  'city_id',
  'department_id',
  'address',
  'nationality',
  'description',
  'languages',
  'specialities',
  'certifications',
  'work_experience',
  'image_url',
  'company_name',
  'unavailable'
];

class Repository extends Base {
  constructor(props) {
    super(props);
  }

  getModel() {
    return User;
  }

  getUsers(page, page_limit, name, email, disabled, city_id, department_id, country_id ) {
    return this.model
      .query()
      .select(
        'id',
        'firstname',
        'lastname',
        'document',
        'phone',
        'email',
        'role',
        'disabled',
        'rate',
        'country_id',
        'city_id',
        'department_id',
        'address_1',
        'nationality',
        'description',
        'languages',
        'specialities',
        'certifications',
        'work_experience',
        'image_url',
        'company_name',
        'unavailable'
      )
      .where("deleted", false)
      .orderBy('created_at')
      .page(page-1, page_limit)
      .andWhere(function () {
        if (name) {
          this.orWhere(raw('lower(unaccent(users."firstname"))'), 'like', `%${name}%`);
          this.orWhere(raw('lower(unaccent(users."lastname"))'), 'like', `%${name}%`);
        }
      })
      .andWhere(function () {
        if (email) {
          this.orWhere(raw('lower(unaccent(users."email"))'), 'like', `%${email}%`);
        }
      })
      .andWhere(function () {
        if (disabled) {
          this.orWhere("disabled", '=', disabled);
        }
      })
      .andWhere(function () {
        if (city_id) {
          this.orWhere('users.city_id', city_id);
        }
      })
      .andWhere(function () {
        if (department_id) {
          this.orWhere('users.department_id', department_id);
        }
      })
      .andWhere(function () {
        if (country_id) {
          this.orWhere('users.country_id', country_id);
        }
      })
  }

  getTranslators(page, page_limit, name, speciality_id, languages, grade, experience, availability, price_hour, price_minute) {
    return this.model
      .query()
      .select(
        'id',
        'firstname',
        'lastname',
        'document',
        'phone',
        'email',
        'role',
        'disabled',
        'rate',
        'country_id',
        'city_id',
        'department_id',
        'address_1',
        'nationality',
        'description',
        'languages',
        'certifications',
        'specialities',
        'work_experience',
        'image_url',
        'unavailable'
      )
      .where("deleted", false)
      .where("role", "2")
      .andWhere(function () {
        if(speciality_id){
          let parsed = JSON.parse(speciality_id)
          this.whereJsonSupersetOf('specialities', parsed)
        }
      })

      .orderBy('created_at')
      .page(page-1, page_limit)
      .andWhere(function () {
        if (name) {
          this.orWhere(raw('lower(unaccent(users."firstname"))'), 'like', `%${name}%`);
          this.orWhere(raw('lower(unaccent(users."lastname"))'), 'like', `%${name}%`);
        }
      })   

      .andWhere(function () {
        if (languages) {
          let parsed = JSON.parse(languages)
          this.whereJsonSupersetOf('languages', parsed)
        }
      })
  }

  getUser(userId) {
    return this.model
      .query()
      .select(
        'id',
        'firstname',
        'lastname',
        'document',
        'phone',
        'email',
        'role',
        'disabled',
        'rate',
        'country_id',
        'city_id',
        'department_id',
        'address',
        'nationality',
        'description',
        'languages',
        'specialties',
        'work_experience',
        'unavailable',
        'image_url',
        'company_name',
        'disabled'
      )
      .where("deleted", false)
      .orderBy('created_at')
      .where("id", userId )
  }
}

module.exports = new Repository(fields);
