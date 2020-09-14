const platformRepository = require('./repository');
const { validationResult } = require('express-validator');



async function index(req, res) {
    try {
        const platforms = await platformRepository.getAllPlatforms();
        return res.status(200).send(platforms);
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

            await platformRepository.create({
                ...body
            });

            return res
                .status(201)
                .send({ message: 'Plataforma creada exitosamente' });
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
            
            await platformRepository.update(
                { ...body },
                { id: id }
            )

            return res
                .status(201)
                .send({ message: 'Plataforma actualizada exitosamente' });
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
            
            await platformRepository.deleteById(id)

            return res
                .status(201)
                .send({ message: 'Plataforma removida exitosamente' });
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
    remove
};
