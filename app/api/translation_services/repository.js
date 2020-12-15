const Base = require('../base.repository');
const Service = require('./entity');
const { raw } = require('objection');

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
  'cancel_reason',
  'paid_status',
  'rated',
  'platform_other',
  'deleted'
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
        'translation_services.cancel_reason',
        'translation_services.paid_status',
        'translation_services.rated',
        'translation_services.platform_other'
      )
      .where("translation_services.deleted", false)
      .where("translation_services.id", id)
      
      .innerJoin('users as client', 'client.id', 'translation_services.client_id')
      .innerJoin('users as translator', 'translator.id', 'translation_services.translator_id')

      .withGraphFetched('client(selectNamesAndId)')
      .withGraphFetched('translator(selectNamesAndRate)')
      .withGraphFetched('platform')

      .modifiers({
        selectNamesAndId(builder) {
          builder.select('firstname', 'lastname', 'id', 'image_url');
        },
        selectNamesAndRate(builder) {
          builder.select('firstname', 'lastname', 'id', 'rate_minute','rate_hour', 'image_url');
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

  getServices(page, page_limit, name, status, service_site, service_type, client_id, translator_id, amount, min_date, max_date, sort_by, sort_order) {
    if(!sort_by){
      sort_by = "created_at"
    }
    if(!sort_order){
      sort_order = "desc"
    }
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
        'translation_services.cancel_reason',
        'translation_services.paid_status',
        'translation_services.rated',
        'translation_services.platform_other'
      )
      .where("translation_services.deleted", false)
      
      .innerJoin('users as client', 'client.id', 'translation_services.client_id')
      .innerJoin('users as translator', 'translator.id', 'translation_services.translator_id')

      .withGraphFetched('client(selectNamesAndId)')
      .withGraphFetched('translator(selectNamesAndRate)')
      .withGraphFetched('platform')

      .modifiers({
        selectNamesAndId(builder) {
          builder.select('firstname', 'lastname', 'id', 'image_url');
        },
        selectNamesAndRate(builder) {
          builder.select('firstname', 'lastname', 'id', 'rate_minute','rate_hour', 'image_url');
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

      .andWhere(function () {
        if (amount) {
          this.orWhere("translation_services.amount", amount);
        }
      })

      .andWhere(function () {
        if (min_date && max_date) {
          console.log(min_date)
          this.whereBetween("translation_services.date", [
            min_date,
            max_date
          ]);
        }
      })

      .orderBy('translation_services.'+sort_by, sort_order)
      .page(page-1, page_limit)
  }

  getServicesByTranslator(page, page_limit, userId, name, status, service_site, service_type, client_id, amount, min_date, max_date, sort_by, sort_order, duration_type) {
    if(!sort_by){
      sort_by = "created_at"
    }
    if(!sort_order){
      sort_order = "desc"
    }
    if(sort_by=="created_at_asc"){
      sort_by="created_at"
      sort_order="asc"
    }
    if(sort_by=="date_asc"){
      sort_by="date"
      sort_order="asc"
    }
    if(sort_by=="duration_amount"){
      sort_by=raw("duration_amount::int")
    }
    if(sort_by=="amount"){
      sort_by=raw("amount::float")
    }
    if(sort_by=="created_at"){
      sort_by="translation_services.created_at"
    }
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
        'translation_services.cancel_reason',
        'translation_services.paid_status',
        'translation_services.rated',
        'translation_services.platform_other'
      )
      .where("translation_services.deleted", false)
      .where("translation_services.translator_id", userId)
      
      .innerJoin('users as client', 'client.id', 'translation_services.client_id')
      .innerJoin('users as translator', 'translator.id', 'translation_services.translator_id')
      //.innerJoin('platforms as platform', 'platform.id', 'translation_services.platform_id')      

      .withGraphFetched('client(selectNamesAndId)')
      .withGraphFetched('translator(selectNamesAndRate)')
      .withGraphFetched('platform')

      .modifiers({
        selectNamesAndId(builder) {
          builder.select('firstname', 'lastname', 'id', 'image_url');
        },
        selectNamesAndRate(builder) {
          builder.select('firstname', 'lastname', 'id', 'rate_minute','rate_hour', 'image_url');
        }
      })


      .andWhere(function () {
        if (name) {
          if(name.includes(" ")){
            let names = name.split(" ")
            for (let i = 0; i < names.length; i++) {
              if(i==0){
                this.andWhere(raw('lower(unaccent(client."firstname"))'), 'like', `%${names[i]}%`);
              }else{
                this.andWhere(raw('lower(unaccent(client."lastname"))'), 'like', `%${names[i]}%`);
              }
            }
          }else{
            this.orWhere(raw('lower(unaccent(client."firstname"))'), 'like', `%${name}%`);
            this.orWhere(raw('lower(unaccent(client."lastname"))'), 'like', `%${name}%`);
          }
        }
      })   

      .andWhere(function () {
        if (duration_type) {
          this.orWhere("translation_services.duration_type", duration_type);
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
        if (amount) {
          this.orWhere("translation_services.amount", amount);
        }
      })

      .andWhere(function () {
        if (min_date && max_date) {
          console.log(min_date)
          this.whereBetween("translation_services.date", [
            min_date,
            max_date
          ]);
        }
      })

      .orderBy(sort_by, sort_order)

      .page(page-1, page_limit)
  }

  getServicesByClient(page, page_limit, userId, name, status, service_site, service_type, translator_id, amount, min_date, max_date, sort_by, sort_order, duration_type) {
    if(!sort_by){
      sort_by = "created_at"
    }
    if(!sort_order){
      sort_order = "desc"
    }
    if(sort_by=="created_at_asc"){
      sort_by="created_at"
      sort_order="asc"
    }
    if(sort_by=="date_asc"){
      sort_by="date"
      sort_order="asc"
    }
    if(sort_by=="duration_amount"){
      sort_by=raw("duration_amount::int")
    }
    if(sort_by=="amount"){
      sort_by=raw("amount::float")
    }
    if(sort_by=="created_at"){
      sort_by="translation_services.created_at"
    }
    
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
        'translation_services.cancel_reason',
        'translation_services.paid_status',
        'translation_services.rated',
        'translation_services.platform_other'
      )
      .where("translation_services.deleted", false)
      .where("translation_services.client_id", userId)
      //.innerJoin('platforms as platform', 'platform.id', 'translation_services.platform_id')      
      .innerJoin('users as client', 'client.id', 'translation_services.client_id')
      .innerJoin('users as translator', 'translator.id', 'translation_services.translator_id')
      .withGraphFetched('platform')
      .withGraphFetched('client(selectNamesAndId)')
      .withGraphFetched('translator(selectNamesAndRate)')
      .modifiers({
        selectNamesAndId(builder) {
          builder.select('firstname', 'lastname', 'id', 'image_url');
        },
        selectNamesAndRate(builder) {
          builder.select('firstname', 'lastname', 'id', 'rate_minute','rate_hour', 'image_url');
        }
      })

      .andWhere(function () {
        if (name) {
          if(name.includes(" ")){
            let names = name.split(" ")
            for (let i = 0; i < names.length; i++) {
              if(i==0){
                this.andWhere(raw('lower(unaccent(translator."firstname"))'), 'like', `%${names[i]}%`);
              }else{
                this.andWhere(raw('lower(unaccent(translator."lastname"))'), 'like', `%${names[i]}%`);
              }
            }
          }else{
            this.orWhere(raw('lower(unaccent(translator."firstname"))'), 'like', `%${name}%`);
            this.orWhere(raw('lower(unaccent(translator."lastname"))'), 'like', `%${name}%`);
          }
        }
      }) 

      .andWhere(function () {
        if (duration_type) {
          this.orWhere("translation_services.duration_type", duration_type);
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
        if (translator_id) {
          this.orWhere("translation_services.translator_id", translator_id);
        }
      })

      .andWhere(function () {
        if (amount) {
          this.orWhere("translation_services.amount", amount);
        }
      })

      .andWhere(function () {
        if (min_date && max_date) {
          console.log(min_date)
          this.whereBetween("translation_services.date", [
            min_date,
            max_date
          ]);
        }
      })

      .orderBy(sort_by, sort_order)

      .page(page-1, page_limit)
  }



}

module.exports = new Repository(fields);
