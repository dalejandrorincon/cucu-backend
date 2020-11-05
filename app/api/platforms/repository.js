const Base = require('../base.repository');
const Platform = require('./entity');

const fields = [
  'name',
  'deleted'
];

class Repository extends Base {
  constructor(props) {
    super(props);
  }

  getModel() {
    return Platform;
  }

  getAllPlatforms() {
    return this.model
      .query()
      .where("deleted", false);
  }
}

module.exports = new Repository(fields);
