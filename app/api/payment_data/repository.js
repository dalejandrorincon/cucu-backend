const Base = require('../base.repository');
const Data = require('./entity');

const fields = [
  'id',
  'user_id',
  'bank',
  'bank_id',
  'account_type',
  'account_number',
  'owner_name',
  'document_type',
  'document_number',
  'payoneer_account',
  'country_id',
  'deleted'
];

class Repository extends Base {
  constructor(props) {
    super(props);
  }

  getModel() {
    return Data;
  }

  getAllData() {
    return this.model
      .query()
      .withGraphFetched('country')
      .where("deleted", false);
  }

  getPaymentData(user_id) {
    return this.model
      .query()
      .where("deleted", false)
      .where("user_id", user_id)
  }
}

module.exports = new Repository(fields);
