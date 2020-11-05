const Model = require('../model');

class PaymentData extends Model {
    static get tableName() {
        return 'payment_data';
    }

    static get idColumn() {
        return 'id';
    }    

}

module.exports = PaymentData;
