const Base = require('../base.repository');
const City = require('./entity');

const fields = [
  'name',
  'department_id',
  'country_id',
  'deleted'
];

class Repository extends Base {
  constructor(props) {
    super(props);
  }

  getModel() {
    return City;
  }

  getAllCities() {
    return this.model
      .query()
      .withGraphFetched('country')
      .where("deleted", false);
  }

  getCities(page, page_limit, name, country_id) {
    return this.model
      .query()
      .withGraphFetched('country')
      .where("deleted", false)
      .andWhere(function () {
        if (name) {
          this.orWhere(raw('lower(unaccent("name"))'), 'like', `%${name}%`);
        }
      })
      .andWhere(function () {
        if (country_id) {
          this.orWhere("country_id", country_id);
        }
      })
      .orderBy('created_at')
      .page(page-1, page_limit)
  }
}

module.exports = new Repository(fields);
