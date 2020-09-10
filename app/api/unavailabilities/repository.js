const Base = require('../base.repository');
const Unavailability = require('./entity');

const fields = [
  'name',
  'from',
  'to',
  'deleted',
  'translator_id',
  'deleted'
];

class Repository extends Base {
  constructor(props) {
    super(props);
  }

  getModel() {
    return Unavailability;
  }

  getAllUnavailabilities() {
    return this.model
      .query()
      .where("deleted", false);
  }

  getUserUnavailabilities(page, page_limit, userId){
    return this.model
      .query()
      .where("deleted", false)
      .where("translation_services.client_id", userId)
      .orderBy('created_at')
      .page(page-1, page_limit)
  }

  getUnavailabilities(page, page_limit) {
    return this.model
      .query()
      .where("deleted", false)
      .orderBy('created_at')
      .page(page-1, page_limit)
  }
}

module.exports = new Repository(fields);
