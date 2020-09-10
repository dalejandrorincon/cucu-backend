const transactionsRepository = require('./repository');
const usersRepository = require('../users/repository');
const { validationResult } = require('express-validator');
const helper = require('../../utils/helpers');


async function index(req, res) {

    let {
        query: {
            page = 1,
            page_limit = 10,
        }
    } = req;

    try {
        const transactions = await transactionsRepository.getTransactions(page, page_limit);
        return res.status(200).send({
            ...transactions,
            page: parseInt(page),
            pages: Math.ceil(transactions.total / page_limit),
            total: transactions.total
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

async function transactionsByUser(req, res) {

    let {
        query: {
            page = 1,
            page_limit = 10
        }
    } = req;

    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({
            message: 'Olvidó autenticarse'
        });
    }

    const token = authorization.replace("Bearer ", "")
    const userId = await helper.decodeToken(token);
    const user = await usersRepository.findById(userId);
    if (!user) return res.status(403).send({ message: 'Olvidó autenticarse' });

    try {
        let transactions
        switch(user.role){
            case "translator":
                transactions = await transactionsRepository.getTransactionsByTranslator(page, page_limit);
                break;
            case "client":
                transactions = await transactionsRepository.getTransactionsByClient(page, page_limit);
                break;
            default:
                return res.status(500).send({ message: "No es posible solicitar transacciones asociadas a este rol." });
        }
        return res.status(200).send({
            ...transactions,
            page: parseInt(page),
            pages: Math.ceil(transactions.total / page_limit),
            total: transactions.total
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

async function getAll(req, res) {
    try {
        const transactions = await transactionsRepository.getAllTransactions();
        return res.status(200).send(transactions);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

async function getTransaction(req, res) {

    try {

        const {
            params: { id }
        } = req;

        const transaction = await transactionsRepository.getTransaction(id);
        return res.status(200).send(transaction);

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}


async function store(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res
                .status(409)
                .send({ errors: errors.formatWith(formatError).mapped() });
        else {
            const { body } = req;
            console.log(req.body)
            //console.log(body)

            await transactionsRepository.create({
                ...body
            });

            return res
                .status(201)
                .send({ message: 'Transacción creada exitosamente' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

async function update(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res
                .status(409)
                .send({ errors: errors.formatWith(formatError).mapped() });
        else {
            const {
                params: { id },
                body
            } = req;
            
            await transactionsRepository.update(
                { ...body },
                { id: id }
            )

            return res
                .status(201)
                .send({ message: 'Transacción actualizada exitosamente' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}


async function remove(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res
                .status(409)
                .send({ errors: errors.formatWith(formatError).mapped() });
        else {
            const {
                params: { id }
            } = req;
            
            await transactionsRepository.deleteById(id)

            return res
                .status(201)
                .send({ message: 'Transacción removida exitosamente' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}




module.exports = {
    index,
    store,
    update,
    remove,
    getAll,
    getTransaction,
    transactionsByUser
};
