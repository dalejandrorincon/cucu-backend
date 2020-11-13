const Base = require('../base.repository');
const Speciality = require('./entity');

const fields = [
  'id',
  'name_es',
  'name_en',
  'deleted'
];

class Repository extends Base {
  constructor(props) {
    super(props);
  }

  getModel() {
    return Speciality;
  }

  getAllSpecialities() {
    return this.model
      .query()
      .where("deleted", false);
  }

  getSpecialities(page, page_limit, name, lang) {
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
