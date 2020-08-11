const languageRepository = require('./repository');
//const { validationResult } = require('express-validator');


async function index(req, res) {

    let {
        query: {
            page = 1,
            page_limit = 10,
            name = ''
        }
    } = req;

    try {
        const languages = await languageRepository.getLanguages(page, page_limit, name);
        return res.status(200).send({
            ...languages,
            page: parseInt(page),
            pages: Math.ceil(languages.total / page_limit),
            total: languages.total
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}


async function getAll(req, res) {
    try {
        const languages = await languageRepository.getAllLanguages();
        return res.status(200).send(languages);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

async function index(req, res) {
    try {
        const languages = await languageRepository.find().orderBy('name');
        return res.status(200).send(languages);
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

            await languageRepository.create({
                ...body
            });

            return res
                .status(201)
                .send({ message: 'País creado exitosamente' });
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
            
            await languageRepository.update(
                { ...body },
                { id: id }
            )

            return res
                .status(201)
                .send({ message: 'País actualizado exitosamente' });
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
            
            await languageRepository.deleteById(id)

            return res
                .status(201)
                .send({ message: 'País removido exitosamente' });
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
    getAll
};
