const Base = require('../base.repository');
const User = require('./entity');

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
  'specialties',
  'work_experience',
];

class Repository extends Base {
  constructor(props) {
    super(props);
  }

  getModel() {
    return User;
  }

  getUsers(page, page_limit, name, email, disabled, city_id, department_id, city_id, country_id ) {
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
        'work_experience'
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
        if (city_id) {
          this.orWhere('users.city_id', city_id);
        }
      })
      .andWhere(function () {
        if (country_id) {
          this.orWhere('users.country_id', country_id);
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
        'disabled'
      )
      .where("deleted", false)
      .orderBy('created_at')
      .where("id", userId )
  }
}

module.exports = new Repository(fields);
