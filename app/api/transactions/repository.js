const Base = require('../base.repository');
const Transaction = require('./entity');

const fields = [
  'id',
  'date',
  'amount',
  'payment_id',
  'translator_id',
  'client_id',
  'service_id',
  'deleted'
];

class Repository extends Base {
  constructor(props) {
    super(props);
  }

  getModel() {
    return Transaction;
  }

  getAllTransactions() {
    return this.model
      .query()
      .where("deleted", false);
  }

  getTransaction(id){
    return this.model
      .query()
  }


  getTransactions(page, page_limit, name, status, service_site, service_type, client_id, translator_id) {
    return this.model
      .query()
      .select(
        'transactions.id',
        'transactions.date',
        'transactions.amount',
        'transactions.payment_id'

      )
      .where("transactions.deleted", false)
      
      .innerJoin('users as client', 'client.id', 'translation_services.client_id')
      .innerJoin('users as translator', 'translator.id', 'translation_services.translator_id')

      .withGraphFetched('client(selectNamesAndId)')
      .withGraphFetched('translator(selectNamesAndId)')
      .modifiers({
        selectNamesAndId(builder) {
          builder.select('firstname', 'lastname', 'id', 'image_url');
        }
      })

  }

  getTransactionsByTranslator(page, page_limit, userId, name, status, service_site, duration_type, service_type, sort_by, sort_order, min_date, max_date) {
    if(sort_by=="transactions.created_at_asc"){
      sort_by="transactions.created_at"
      sort_order="asc"
    }

    if(sort_by=="transactions.date_asc"){
      sort_by="transactions.date"
      sort_order="asc"
    }
    return this.model
      .query()
      .select(
        'transactions.id',
        'transactions.date',
        'transactions.amount',
        'transactions.payment_id'
      )
      .where("transactions.deleted", false)
      .where("transactions.translator_id", userId)
      
      .innerJoin('users as client', 'client.id', 'transactions.client_id')
      .innerJoin('translation_services as service', 'service.id', 'transactions.service_id')

      .withGraphFetched('service')
      .withGraphFetched('client(selectNamesAndId)')
      .withGraphFetched('translator(selectNamesAndId)')
      .modifiers({
        selectNamesAndId(builder) {
          builder.select('firstname', 'lastname', 'id', 'image_url');
        }
      })


      .andWhere(function () {
        if (status) {
          this.orWhere("service.status", status);
        }
      })
      .andWhere(function () {
        if (service_site) {
          this.orWhere("service.service_site", service_site);
        }
      })
      .andWhere(function () {
        if (service_type) {
          this.orWhere("service.service_type", service_type);
        }
      })
      .andWhere(function () {
        if (duration_type) {
          this.orWhere("service.duration_type", duration_type);
        }
      })

      .andWhere(function () {
        if (min_date && max_date) {
          console.log(min_date)
          this.whereBetween("service.date", [
            min_date,
            max_date
          ]);
        }
      })

      .orderBy(sort_by, sort_order)
      .page(page-1, page_limit)


  }

  getTransactionsByClient(page, page_limit, userId, name, status, service_site, service_type, translator_id) {
    return this.model
      .query()
      .select(
        'transactions.id',
        'transactions.date',
        'transactions.amount',
        'transactions.payment_id'
      )
      .where("transactions.deleted", false)
      .where("transactions.client_id", userId)
      
      /* .innerJoin('users as client', 'client.id', 'translation_services.client_id')
      .innerJoin('users as translator', 'translator.id', 'translation_services.translator_id') */
      .withGraphFetched('service')
      .withGraphFetched('client(selectNamesAndId)')
      .withGraphFetched('translator(selectNamesAndId)')
      .modifiers({
        selectNamesAndId(builder) {
          builder.select('firstname', 'lastname', 'id', 'image_url');
        }
      })

      .orderBy('transactions.created_at')
      .page(page-1, page_limit)
  }

  getAllTransactionsTranslator(translator_id){
    return this.model
      .query()
      .select(
        'transactions.id',
        'transactions.date',
        'transactions.amount',
        'transactions.payment_id'
      )
      .where("transactions.deleted", false)
      .where("transactions.translator_id", translator_id)
  }

  getAllTransactionsClient(client_id){
    return this.model
      .query()
      .select(
        'transactions.id',
        'transactions.date',
        'transactions.amount',
        'transactions.payment_id'
      )
      .where("transactions.deleted", false)
      .where("transactions.client_id", client_id)
  }



}

module.exports = new Repository(fields);
