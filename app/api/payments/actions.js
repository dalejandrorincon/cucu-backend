
const { api } = require('./api');
const {
    PAYU_API_LOGIN,
    PAYU_API_KEY
} = process.env;

const createCardToken = (options) => {

    return api({
        method: 'POST',
        data: {
            "language": "es",
            "command": "CREATE_TOKEN",
            "creditCardToken": { ...options },
            "merchant": {
                "apiLogin": PAYU_API_LOGIN,
                "apiKey": PAYU_API_KEY
            },
        }
    })
        .then(response => response.data)

        .catch(error => {
            throw error;
        });

}

const createPayment = (options) => {

    return api({
        method: 'POST',
        data: {
            "language": "es",
            "command": "SUBMIT_TRANSACTION",
            "merchant": {
                "apiLogin": PAYU_API_LOGIN,
                "apiKey": PAYU_API_KEY
            },
            "transaction": {
                "order": {
                    "accountId": "512321",
                    "referenceCode": "payment_test_00000001",
                    "description": "payment test",
                    "language": "es",
                    "signature": "971dd1f8bd4c7b43eae2233464d4c97e",
                    "notifyUrl": "http://www.tes.com/confirmation",
                    "additionalValues": {
                        "TX_VALUE": {
                            "value": 10000,
                            "currency": "COP"
                        }
                    },
                    "buyer": {
                        "merchantBuyerId": "1",
                        "fullName": "First name and second buyer  name",
                        "emailAddress": "buyer_test@test.com",
                        "contactPhone": "7563126",
                        "dniNumber": "5415668464654",
                        "shippingAddress": {
                            "street1": "calle 100",
                            "street2": "5555487",
                            "city": "Medellin",
                            "state": "Antioquia",
                            "country": "CO",
                            "postalCode": "000000",
                            "phone": "7563126"
                        }
                    },
                    "shippingAddress": {
                        "street1": "calle 100",
                        "street2": "5555487",
                        "city": "Medellin",
                        "state": "Antioquia",
                        "country": "CO",
                        "postalCode": "0000000",
                        "phone": "7563126"
                    }
                },
                "payer": {
                    "merchantPayerId": "1",
                    "fullName": "First name and second payer name",
                    "emailAddress": "payer_test@test.com",
                    "contactPhone": "7563126",
                    "dniNumber": "5415668464654",
                    "billingAddress": {
                        "street1": "calle 93",
                        "street2": "125544",
                        "city": "Bogota",
                        "state": "Bogota DC",
                        "country": "CO",
                        "postalCode": "000000",
                        "phone": "7563126"
                    }
                },
                "creditCardTokenId": "8604789e-80ef-439d-9c3f-5d4a546bf637",
                "extraParameters": {
                    "INSTALLMENTS_NUMBER": 1
                },
                "type": "AUTHORIZATION_AND_CAPTURE",
                "paymentMethod": "VISA",
                "paymentCountry": "CO",
                "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
                "ipAddress": "127.0.0.1",
                "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
                "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
            },
            "test": false
        }
    })
        .then(response => response.data)

        .catch(error => {
            throw error;
        });

}

module.exports = {
    createCardToken
};
