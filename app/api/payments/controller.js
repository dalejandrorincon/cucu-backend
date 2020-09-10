
const paymentActions = require('./actions');
const transactionsRepository = require('../transactions/repository');

async function saveCard(req, res) {

    const { body } = req;

    try {
        const action = await paymentActions.createCardToken(body);
        return res.status(200).send({
            action
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

async function cardPayment(req, res) {

    const { body } = req;

    try {
        const action = await paymentActions.createPayment(body);
        const response = transactionsRepository.create(body)

        return res.status(200).send({
            response
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}


module.exports = {
    saveCard
};
