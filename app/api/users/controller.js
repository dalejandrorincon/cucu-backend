const usersRepository = require('./repository');
const languagesRepository = require('../languages/repository');
const specialitiesRepository = require('../specialities/repository');
const reviewsRepository = require('../reviews/repository');
const platformsRepository = require('../platforms/repository');
const servicesRepository = require('../translation_services/repository');


const { formatError } = require('../../utils/helpers');

const bcrypt = require('bcryptjs');
const { decodeToken } = require('../../utils/helpers');

const { validationResult } = require('express-validator');
const { imageUpload } = require('../../utils/file')


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

async function getClients(req, res) {

    let {
        query: {
            page = 1,
            page_limit = 10,
            name = '',
            sort_by = 'created_at',
            sort_order = 'desc',
            disabled = 'false'
        }
    } = req;

    try {
        const users = await usersRepository.getClients(page, page_limit, name, disabled, sort_by, sort_order);
        
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

async function getAdmins(req, res) {

    let {
        query: {
            page = 1,
            page_limit = 10,
            name = '',
            sort_by = 'created_at',
            sort_order = 'desc',
            disabled = 'false'
        }
    } = req;

    try {
        const users = await usersRepository.getAdmins(page, page_limit, name, disabled, sort_by, sort_order);
        
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
            min_price_minute = '',
            max_price_minute = '',
            min_experience = '',
            max_experience = '',
            approved_translator = '1',
            sort_by = 'created_at',
            sort_order = 'desc',
            disabled = 'false'
        }
    } = req;

    try {
        let users = await usersRepository.getTranslators(name, speciality_id, languages, approved_translator, sort_by, sort_order, disabled);
        const repoLanguages = await languagesRepository.getAllLanguages();
        const specialities = await specialitiesRepository.getAllSpecialities()
        const platforms = await platformsRepository.getAllPlatforms()

        for (let i = 0; i < users.length; i++) {

            const element = users[i];

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
                        element.specialities.push(...newSpeciality)
                    }
                });

            }

            let reviews = await  reviewsRepository.getUserReviews(element.id, true)

            element.rating = null

            if(reviews.length){
                let avg = 0
                let total = 0
                reviews.forEach(element => {
                    if(element.grade){
                        total = parseInt(element.grade) + total
                    }
                });
                avg = total/reviews.length
                element.rating = avg.toFixed(2)
            }

            if(element.work_experience){
                let total_exp = 0
                element.work_experience.forEach(exp => {
                    total_exp = total_exp + parseInt(exp.labor_months)
                });
                element.total_experience = total_exp
                element.total_experience_years = Math.floor(total_exp/12)
               
            }

            if(element.remote_tools){
                let cached = element.remote_tools;
                element.remote_tools=[]
                cached.forEach(platform => {
                    let newPlatform = (platforms.filter(plat => plat.id == platform))
                    if(newPlatform[0]){
                        element.remote_tools.push(...newPlatform)
                    }
                });

            }
            
        }

        if(grade){
            users = users.filter(item => item.rating >= grade);
        }

        if(min_price_minute!='' && max_price_minute!=''){
            users = users.filter(item => item.rate_minute >= min_price_minute && item.rate_minute <= max_price_minute)
        }

        if(min_experience!='' && max_experience!=''){
            users = users.filter(item => item.total_experience_years >= min_experience && item.total_experience_years <= max_experience)
        }

        let total = users.length
      
        users = users.slice((page - 1) * page_limit, page * page_limit)
     
        return res.status(200).send({
            users,
            page: parseInt(page),
            pages: Math.ceil(total / page_limit),
            total: total
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

        const repoLanguages = await languagesRepository.getAllLanguages();
        const specialities = await specialitiesRepository.getAllSpecialities()
        const platforms = await platformsRepository.getAllPlatforms()

        if(user){
            delete user.password
            
            if(user.languages){
                user.languages.forEach(language => {
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
            if(user.specialities){
                let cached = user.specialities;
                user.specialities=[]
                cached.forEach(speciality => {
                    let newSpeciality = (specialities.filter(spec => spec.id == speciality))
                    if(newSpeciality[0]){
                        user.specialities.push(...newSpeciality)
                    }
                });

            } 

            if(user.work_experience){
                let total_exp = 0
                user.work_experience.forEach(exp => {
                    total_exp = total_exp + parseInt(exp.labor_months)
                });
                user.total_experience = total_exp
                user.total_experience_years = Math.floor(total_exp/12)
                
            }

            if(user.remote_tools){
                let cached = user.remote_tools;
                user.remote_tools=[]
                cached.forEach(platform => {
                    let newPlatform = (platforms.filter(plat => plat.id == platform))
                    if(newPlatform[0]){
                        user.remote_tools.push(...newPlatform)
                    }
                });

            }

            if(user.role == "2"){
                const services = await servicesRepository.getServicesByTranslator(1, 10, user.id)
                user.total_services = services.total

                let reviews = await  reviewsRepository.getUserReviews(user.id, "1")

                user.rating = null

                if(reviews.length){
                    let avg = 0
                    let total = 0
                    reviews.forEach(element => {
                        if(element.grade){
                            total = parseInt(element.grade) + total
                        }
                    });
                    avg = total/reviews.length
                    user.rating = avg.toFixed(2)
                }
                
            }
            if(user.role == "3" || user.role == "4"){
                const services = await servicesRepository.getServicesByClient(1, 10, user.id)
                user.total_services = services.total
            }




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


async function adminUpdate(req, res) {
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

            if (body.password) {
                body.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10))
            }

            await usersRepository.update(
                { ...body },
                { id: id }
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



async function approval(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res
                .status(409)
                .send({ errors: errors.formatWith(formatError).mapped() });
        else {
            const {
                params: { id },
                body: {approved_translator}
            } = req;

            await usersRepository.update(
                { approved_translator: approved_translator },
                { id: id }
            )

            getUser(req, res, id )

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

        if(user.role!="2"){
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

        if(user.role!="2"){
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

async function uploadImage(req, res) {
    try {
        let image = await imageUpload(req, "users")
        res.status(200).send({ image: JSON.parse(image[0]) })
    } catch (e) {
        console.log("error", e)
        res.status(400).send({ error: e })
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
    setAvailability,
    uploadImage,
    approval,
    adminUpdate,
    getAdmins,
    getClients
};
