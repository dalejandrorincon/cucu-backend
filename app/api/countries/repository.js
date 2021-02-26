const Base = require('../base.repository');
const Country = require('./entity');

const fields = [
  'name_es',
  'name_en',
  'stripe_available',
  'deleted'
];

class Repository extends Base {
  constructor(props) {
    super(props);
  }

  getModel() {
    return Country;
  }

  getAllCountries(stripe_available, lang) {
    return this.model
      .query()
      .orderBy(lang ? "name_"+lang : "name")
      .andWhere(function () {
        if (stripe_available) {
          this.orWhere('stripe_available', true);
        }
      })
      .where("deleted", false)
  }

  getCountries(page, page_limit, name) {
    return this.model
      .query()
      .where("deleted", false)
      .andWhere(function () {
        if (name) {
          this.orWhere(raw('lower(unaccent("name"))'), 'like', `%${name}%`);
        }
      })
      .orderBy('name')
  }
}

module.exports = new Repository(fields);
