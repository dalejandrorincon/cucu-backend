const Base = require('../base.repository');
const City = require('./entity');

const fields = [
  'name',
  'department_id',
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
      .withGraphFetched('department')
      .where("deleted", false);
  }

  getCities(page, page_limit, name) {
    return this.model
      .query()
      .withGraphFetched('department')
      .where("deleted", false)
      .andWhere(function () {
        if (name) {
          this.orWhere(raw('lower(unaccent("name"))'), 'like', `%${name}%`);
        }
      })
      .orderBy('created_at')
      .page(page-1, page_limit)
  }
}

module.exports = new Repository(fields);
