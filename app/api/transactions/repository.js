const Base = require('../base.repository');
const Transaction = require('./entity');

const fields = [
  'id',
  'date',
  'amount',
  'token_id',
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
        'transactions.token_id'

      )
      .where("translation_services.deleted", false)
      
      .innerJoin('users as client', 'client.id', 'translation_services.client_id')
      .innerJoin('users as translator', 'translator.id', 'translation_services.translator_id')

      .withGraphFetched('client(selectNamesAndId)')
      .withGraphFetched('translator(selectNamesAndId)')
      .modifiers({
        selectNamesAndId(builder) {
          builder.select('firstname', 'lastname', 'id');
        }
      })

  }

  getTransactionsByTranslator(page, page_limit, userId, name, status, service_site, service_type, client_id) {
    return this.model
      .query()
      .select(
        'transactions.id',
        'transactions.date',
        'transactions.amount',
        'transactions.token_id'
      )
      .where("translation_services.deleted", false)
      .where("translation_services.translator_id", userId)
      
      .innerJoin('users as client', 'client.id', 'translation_services.client_id')
      .innerJoin('users as translator', 'translator.id', 'translation_services.translator_id')

      .withGraphFetched('client(selectNamesAndId)')
      .withGraphFetched('translator(selectNamesAndId)')
      .modifiers({
        selectNamesAndId(builder) {
          builder.select('firstname', 'lastname', 'id');
        }
      })

      .orderBy('translation_services.date')
      .page(page-1, page_limit)
  }

  getTransactionsByClient(page, page_limit, userId, name, status, service_site, service_type, translator_id) {
    return this.model
      .query()
      .select(
        'transactions.id',
        'transactions.date',
        'transactions.amount',
        'transactions.token_id'
      )
      .where("translation_services.deleted", false)
      .where("translation_services.client_id", userId)
      
      .innerJoin('users as client', 'client.id', 'translation_services.client_id')
      .innerJoin('users as translator', 'translator.id', 'translation_services.translator_id')

      .withGraphFetched('client(selectNamesAndId)')
      .withGraphFetched('translator(selectNamesAndId)')
      .modifiers({
        selectNamesAndId(builder) {
          builder.select('firstname', 'lastname', 'id');
        }
      })

      .orderBy('translation_services.date')
      .page(page-1, page_limit)
  }



}

module.exports = new Repository(fields);
