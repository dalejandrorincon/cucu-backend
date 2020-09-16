const Base = require('../base.repository');
const Service = require('./entity');

const fields = [
  'id',
  'service_site',
  'amount',
  'service_type',
  'url',
  'duration_amount',
  'duration_type',
  'platform',
  'date',
  'start_date',
  'end_date',
  'record',
  'files_urls',
  'description',
  'status',
  'client_id',
  'translator_id',
  'platform_id',
  'time_type',
  'shared_with',
  'deleted',
];

class Repository extends Base {
  constructor(props) {
    super(props);
  }

  getModel() {
    return Service;
  }

  getAllServices() {
    return this.model
      .query()
      .where("deleted", false);
  }

  getService(id){
    return this.model
      .query()
      .select(
        'translation_services.id',
        'translation_services.service_site',
        'translation_services.amount',
        'translation_services.service_type',
        'translation_services.duration_amount',
        'translation_services.duration_type',
        'translation_services.url',
        'translation_services.date',
        'translation_services.record',
        'translation_services.files_urls',
        'translation_services.description',
        'translation_services.status',
        'translation_services.client_id',
        'translation_services.translator_id',
        'translation_services.start_date',
        'translation_services.end_date',
        'translation_services.time_type',
        'translation_services.shared_with',

      )
      .where("translation_services.deleted", false)
      .where("translation_services.id", id)
      
      .innerJoin('users as client', 'client.id', 'translation_services.client_id')
      .innerJoin('users as translator', 'translator.id', 'translation_services.translator_id')

      .withGraphFetched('client(selectNamesAndId)')
      .withGraphFetched('translator(selectNamesAndId)')
      .withGraphFetched('platform')

      .modifiers({
        selectNamesAndId(builder) {
          builder.select('firstname', 'lastname', 'id');
        }
      })
  }

  getReviews(page, page_limit) {
    return this.model
      .query()
      .where("deleted", false)
      .orderBy('created_at')
      .page(page-1, page_limit)
  }

  getServices(page, page_limit, name, status, service_site, service_type, client_id, translator_id) {
    return this.model
      .query()
      .select(
        'translation_services.id',
        'translation_services.service_site',
        'translation_services.amount',
        'translation_services.service_type',
        'translation_services.duration_amount',
        'translation_services.duration_type',
        'translation_services.url',
        'translation_services.date',
        'translation_services.record',
        'translation_services.files_urls',
        'translation_services.description',
        'translation_services.status',
        'translation_services.client_id',
        'translation_services.translator_id',
        'translation_services.start_date',
        'translation_services.end_date',
        'translation_services.time_type',
        'translation_services.shared_with',

      )
      .where("translation_services.deleted", false)
      
      .innerJoin('users as client', 'client.id', 'translation_services.client_id')
      .innerJoin('users as translator', 'translator.id', 'translation_services.translator_id')

      .withGraphFetched('client(selectNamesAndId)')
      .withGraphFetched('translator(selectNamesAndId)')
      .withGraphFetched('platform')

      .modifiers({
        selectNamesAndId(builder) {
          builder.select('firstname', 'lastname', 'id');
        }
      })

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
      .orderBy('translation_services.created_at')
      .page(page-1, page_limit)
  }

  getServicesByTranslator(page, page_limit, userId, name, status, service_site, service_type, client_id) {
    return this.model
      .query()
      .select(
        'translation_services.id',
        'translation_services.service_site',
        'translation_services.amount',
        'translation_services.duration_amount',
        'translation_services.duration_type',
        'translation_services.service_type',
        'translation_services.url',
        'translation_services.date',
        'translation_services.start_date',
        'translation_services.end_date',
        'translation_services.record',
        'translation_services.files_urls',
        'translation_services.description',
        'translation_services.status',
        'translation_services.client_id',
        'translation_services.translator_id',
        'translation_services.time_type',
        'translation_services.shared_with',
      )
      .where("translation_services.deleted", false)
      .where("translation_services.translator_id", userId)
      
      .innerJoin('users as client', 'client.id', 'translation_services.client_id')
      .innerJoin('users as translator', 'translator.id', 'translation_services.translator_id')
      .innerJoin('platforms as platform', 'platform.id', 'translation_services.platform_id')      

      .withGraphFetched('client(selectNamesAndId)')
      .withGraphFetched('translator(selectNamesAndId)')
      .withGraphFetched('platform')

      .modifiers({
        selectNamesAndId(builder) {
          builder.select('firstname', 'lastname', 'id');
        }
      })


      /* .andWhere(function () {
        if (name) {
          this.orWhere(raw('lower(unaccent("name"))'), 'like', `%${name}%`);
        }
      }) */
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
      .orderBy('translation_services.date')
      .page(page-1, page_limit)
  }

  getServicesByClient(page, page_limit, userId, name, status, service_site, service_type, translator_id) {
    return this.model
      .query()
      .select(
        'translation_services.id',
        'translation_services.service_site',
        'translation_services.amount',
        'translation_services.service_type',
        'translation_services.duration_amount',
        'translation_services.duration_type',
        'translation_services.url',
        'translation_services.date',
        'translation_services.start_date',
        'translation_services.end_date',
        'translation_services.record',
        'translation_services.files_urls',
        'translation_services.description',
        'translation_services.status',
        'translation_services.client_id',
        'translation_services.translator_id',
        'translation_services.time_type',
        'translation_services.shared_with',
      )
      .where("translation_services.deleted", false)
      .where("translation_services.client_id", userId)
      .innerJoin('platforms as platform', 'platform.id', 'translation_services.platform_id')      
      .innerJoin('users as client', 'client.id', 'translation_services.client_id')
      .innerJoin('users as translator', 'translator.id', 'translation_services.translator_id')
      .withGraphFetched('platform')
      .withGraphFetched('client(selectNamesAndId)')
      .withGraphFetched('translator(selectNamesAndId)')
      .modifiers({
        selectNamesAndId(builder) {
          builder.select('firstname', 'lastname', 'id');
        }
      })


      /* .andWhere(function () {
        if (name) {
          this.orWhere(raw('lower(unaccent("name"))'), 'like', `%${name}%`);
        }
      }) */
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
        if (translator_id) {
          this.orWhere("translation_services.translator_id", translator_id);
        }
      })
      .orderBy('translation_services.date')
      .page(page-1, page_limit)
  }



}

module.exports = new Repository(fields);
