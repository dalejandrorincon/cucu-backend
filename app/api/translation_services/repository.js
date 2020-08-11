const Base = require('../base.repository');
const Country = require('./entity');

const fields = [
  'name',
  'deleted'
];

class Repository extends Base {
  constructor(props) {
    super(props);
  }

  getModel() {
    return Country;
  }

  getAllServices() {
    return this.model
      .query()
      .where("deleted", false);
  }

  getServices(page, page_limit, name, status, service_site, service_type, client_id, translator_id) {
    return this.model
      .query(
        'translation_services.id',
        'translation_services.service_site',
        'translation_services.amount',
        'translation_services.service_type',
        'translation_services.url',
        'translation_services.length',
        'translation_services.platform',
        'translation_services.date',
        'translation_services.record',
        'translation_services.files_urls',
        'translation_services.description',
        'translation_services.status',
        'translation_services.client_id',
        'translation_services.translator_id'
      )
      .where("deleted", false)
      
      .innerJoin('users as client', 'client.id', 'translation_services.client_id')
      .innerJoin('users as translator', 'translator.id', 'translation_services.translator_id')


      .andWhere(function () {
        if (name) {
          this.orWhere(raw('lower(unaccent("name"))'), 'like', `%${name}%`);
        }
      })
      .andWhere(function () {
        if (status) {
          this.orWhere("translation_services.status", status);
        }
      })
      .andWhere(function () {
        if (service_site) {
          this.orWhere("translation_services.service_site", service_site);
        }
      })
      .andWhere(function () {
        if (service_type) {
          this.orWhere("translation_services.service_type", service_type);
        }
      })
      .andWhere(function () {
        if (client_id) {
          this.orWhere("translation_services.client_id", client_id);
        }
      })
      .andWhere(function () {
        if (translator_id) {
          this.orWhere("translation_services.translator_id", translator_id);
        }
      })
      .orderBy('created_at')
      .page(page-1, page_limit)
  }
}

module.exports = new Repository(fields);
