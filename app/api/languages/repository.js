const Base = require('../base.repository');
const Language = require('./entity');

const fields = [
  'name',
  'name_es',
  'name_en',
  'deleted'
];

class Repository extends Base {
  constructor(props) {
    super(props);
  }

  getModel() {
    return Language;
  }

  getAllLanguages() {
    return this.model
      .query()
      .where("deleted", false);
  }

  getLanguages(page, page_limit, name, lang) {
    return this.model
      .query()
      .where("deleted", false)
      .andWhere(function () {
        if (name) {
          this.orWhere(raw('lower(unaccent("name"))'), 'like', `%${name}%`);
        }
      })
      .orderBy('name_'+lang)
      .page(page-1, page_limit)
  }
}

module.exports = new Repository(fields);
