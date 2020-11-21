
const { decodeToken } = require('../../utils/helpers');

const {
    STRIPE_SECRET,
    STRIPE_PUBLISHABLE
} = process.env;

const stripe = require('stripe')(STRIPE_SECRET);
const usersRepository = require('../users/repository');
const servicesRepository = require('../translation_services/repository');


async function cardWalletIntent(req, res) {

    const {
        headers: { authorization }
    } = req;


    try {
        const userId = await decodeToken(authorization.replace("Bearer ", ""));
        const user = await usersRepository.findOne({ id: userId });

        let stripe_id = user.stripe_id

        if(!stripe_id){
            return res.status(400).send({ message: "Stripe ID not found" });
        }

        const intent =  await stripe.setupIntents.create({
            customer: user.stripe_id,
        });
        return res.status(200).send({
            intent
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

async function getWalletCards(req, res) {

    const {
        headers: { authorization }
    } = req;


    try {
        const userId = await decodeToken(authorization.replace("Bearer ", ""));
        const user = await usersRepository.findOne({ id: userId });

        let stripe_id = user.stripe_id

        if(!stripe_id){
            return res.status(400).send({ message: "Stripe ID not found" });
        }

        const paymentMethods = await stripe.paymentMethods.list({
            customer: user.stripe_id,
            type: 'card',
        });

        return res.status(200).send({
            paymentMethods
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}


async function deleteCard(req, res) {

    const {
        body: { card_id }
    } = req;


    try {
        
        const paymentMethod = await stripe.paymentMethods.detach(
            card_id
        );

        return res.status(200).send({
            paymentMethod
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}


async function confirmPayment(req, res) {

    const {
        headers: { authorization },
        body: { service_id }
    } = req;


    try {

        const userId = await decodeToken(authorization.replace("Bearer ", ""));
        const user = await usersRepository.findOne({ id: userId });

        let stripe_id = user.stripe_id

        if(!stripe_id){
            return res.status(400).send({ message: "Stripe ID not found" });
        }

        const service = await servicesRepository.findOne({ id: service_id });

        if(service.status!="1"){
            return res.status(400).send({ message: "Service not in payable status" });
        }
        
        const intent = await stripe.paymentIntents.create({
            amount: Math.ceil(service.amount*100),
            currency: 'usd',
            customer: stripe_id, 
            receipt_email: user.email,
        });

        return res.status(200).send({
            intent
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}



module.exports = {
    cardWalletIntent,
    getWalletCards,
    deleteCard,
    confirmPayment
};
