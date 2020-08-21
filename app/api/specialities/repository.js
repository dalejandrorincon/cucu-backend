const Base = require('../base.repository');
const Speciality = require('./entity');

const fields = [
  'name',
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

  getSpecialities(page, page_limit, name) {
    return this.model
      .query()
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
