const usersRepository = require('./repository');
const languagesRepository = require('../languages/repository');
const specialitiesRepository = require('../specialities/repository');

const bcrypt = require('bcryptjs');
const { decodeToken } = require('../../utils/helpers');

const { validationResult } = require('express-validator');


async function index(req, res) {

    let {
        query: {
            page = 1,
            page_limit = 10,
            name = '',
            email='',
            disabled='',
            city_id='',
            department_id='',
            country_id=''
        }
    } = req;

    try {
        const users = await usersRepository.getUsers(page, page_limit, name, email, disabled, city_id, department_id, country_id);
        const languages = await languagesRepository.getAllLanguages();
        const specialities = await specialitiesRepository.getAllSpecialities()


        users.results.forEach(element => {
            //console.log(element.languages)
            if(element.languages){
                element.languages.forEach(language => {
                    let newFrom = (languages.filter(lang => lang.id == language.from))
                    let newTo = (languages.filter(lang => lang.id == language.to))

                    if(newFrom[0]){
                        language.from=newFrom[0]
                    }

                    if(newTo[0]){
                        language.to=newTo[0]
                    }
                });
            }

            //console.log(specialities)
            if(element.specialities){
                let cached = element.specialities;
                element.specialities=[]
                cached.forEach(speciality => {
                    let newSpeciality = (specialities.filter(spec => spec.id == speciality))
                    if(newSpeciality[0]){
                        element.specialities.push(newSpeciality)
                    }
                });

            }
        });
        
        return res.status(200).send({
            users,
            page: parseInt(page),
            pages: Math.ceil(users.total / page_limit),
            total: users.total
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

async function getTranslators(req, res) {

    let {
        query: {
            page = 1,
            page_limit = 10,
            name = '',
            speciality_id = '',
            languages = '',
            grade = '',
            experience = '',
            availability = '',
            price_hour = '',
            price_minute = ''
        }
    } = req;

    try {
        const users = await usersRepository.getTranslators(page, page_limit, name, speciality_id, languages, grade, experience, availability, price_hour, price_minute);
        const repoLanguages = await languagesRepository.getAllLanguages();
        const specialities = await specialitiesRepository.getAllSpecialities()


        users.results.forEach(element => {
            //console.log(element.languages)
            if(element.languages){
                element.languages.forEach(language => {
                    let newFrom = (repoLanguages.filter(lang => lang.id == language.from))
                    let newTo = (repoLanguages.filter(lang => lang.id == language.to))

                    if(newFrom[0]){
                        language.from=newFrom[0]
                    }

                    if(newTo[0]){
                        language.to=newTo[0]
                    }
                });
            }

            //console.log(specialities)
            if(element.specialities){
                let cached = element.specialities;
                element.specialities=[]
                cached.forEach(speciality => {
                    let newSpeciality = (specialities.filter(spec => spec.id == speciality))
                    if(newSpeciality[0]){
                        element.specialities.push(newSpeciality)
                    }
                });

            }
        });                   
        
        return res.status(200).send({
            ...users,
            page: parseInt(page),
            pages: Math.ceil(users.total / page_limit),
            total: users.total
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

async function getUser(req, res) {

    try {

        const {
            params: { id }
        } = req;

        let user = await usersRepository.findById(id);

        if(user){
            delete user.password
            return res.status(200).send({
                user
            });
        }else{
            return res.status(500).send({ message: "Usuario no encontrado" });
        }


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
            const { password } = body;

            console.log(req.body)
            //console.log(body)

            await usersRepository.create({
                ...body,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),

            });

            return res
                .status(201)
                .send({ message: 'Usuario creado exitosamente' });
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
                headers: { authorization },
                body
            } = req;

            const tokenUser = await decodeToken(authorization.replace("Bearer ", ""));

            if (body.password) {
                body.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10))
            }

            await usersRepository.update(
                { ...body },
                { id: tokenUser }
            )

            return res
                .status(201)
                .send({ message: 'Usuario actualizado exitosamente' });
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
            
            await usersRepository.deleteById(id)

            return res
                .status(201)
                .send({ message: 'Usuario removido exitosamente' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}


async function setUnavailability(req, res) {

    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({
            message: 'Olvidó autenticarse'
        });
    }

    const token = authorization.replace("Bearer ", "")
    const userId = await decodeToken(token);
    const user = await usersRepository.findById(userId);
    if (!user) return res.status(403).send({ message: 'Olvidó autenticarse' });

    try {

        if(user.role!="translator"){
            return res.status(500).send({ message: "No es posible setear disponibilidad en este rol." });
        }

        await usersRepository.update(
            { unavailable: true },
            { id: userId }
        )

        return res
            .status(201)
            .send({ message: 'Usuario actualizado exitosamente' });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}


async function setAvailability(req, res) {

    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({
            message: 'Olvidó autenticarse'
        });
    }

    const token = authorization.replace("Bearer ", "")
    const userId = await decodeToken(token);
    const user = await usersRepository.findById(userId);
    if (!user) return res.status(403).send({ message: 'Olvidó autenticarse' });

    try {

        if(user.role!="translator"){
            return res.status(500).send({ message: "No es posible setear disponibilidad en este rol." });
        }

        await usersRepository.update(
            { unavailable: false },
            { id: userId }
        )

        return res
            .status(201)
            .send({ message: 'Usuario actualizado exitosamente' });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}



module.exports = {
    index,
    getUser,
    getTranslators,
    store,
    update,
    remove,
    setUnavailability,
    setAvailability
};
