const bcrypt = require('bcryptjs');
const usersRepository = require('../users/repository');
const {
    createToken,
    saveSession,
    deleteSession,
    saveAttempts,
    getAttempts,
    saveMailToken,
    getMailToken,
    sendMail,
    decodeToken
} = require('../../utils/helpers');

const {
    HOST_WEB,
    APP_NAME
} = process.env;

const moment = require('moment');

async function login(req, res) {
    try {
        const { email, password } = req.body;
        console.log(email)
        console.log(password)
        try {
            const user = { password: userPassword, id } = await usersRepository.findOne({ email });
            const userSecurity = { attempts, fail_time } = await getAttempts(id)

            if (userSecurity) {
                if (
                    fail_time &&
                    moment().diff(fail_time, 'seconds') < 1200 &&
                    attempts >= 10
                ) {
                    const seconds = 1200 - moment().diff(fail_time, 'seconds');
                    return res.status(429).send({
                        message: `Usuario bloqueado espere ${seconds} segundos para continuar`
                    });
                }
            }

            const isEqual = await bcrypt.compare(password, userPassword);
            delete user.password


            if (isEqual) {
                return saveSession(user).then((success) => {
                    return res.status(200).send({
                        message: 'Login Successful',
                        token: createToken(user.id),
                        user: user
                    });
                }).catch((err) => {
                    console.error(err);
                    return res.status(500).send({ message: err.message });
                })
            } else {

                let time = new Date();

                if (!userSecurity) {
                    await saveAttempts(id, time, 1)
                } else {
                    if (moment().diff(fail_time, 'seconds') < 60) {
                        await saveAttempts(id, time, attempts + 1)
                    }
                    if (moment().diff(fail_time, 'seconds') > 60) {
                        await saveAttempts(id, time, 1)
                    }
                }


                return res.status(400).send({
                    message: "Incorrect credentials",
                    error: 'INCORRECT_CREDENTIALS'
                });
            }

        } catch (e) {
            console.log(e)
            return res.status(400).send({
                message: "User doesn't exist",
                error: 'INCORRECT_USER'
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

async function logout(req, res) {
    try {
        const {
            userId
        } = req.body;

        console.log(userId)

        return deleteSession(userId).then((success) => {
            return res.status(200).send({
                message: 'Logout Successful'
            });
        }).catch((err) => {
            console.error(err);
            return res.status(500).send({ message: err.message });
        })


    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

async function recoveryPassword(req, res) {
    try {

        const { email } = req.body;
        const user = await usersRepository.findOne({
            email
        });
        if (!user) {
            return res.status(400).send({
                message:
                    'No existe un usuario con este correo.'
            });
        }

        const token = createToken(user.id, 60, 'minutes');
        await saveMailToken(user.id, token, false);

        const url = `${HOST_WEB}/change-password/${token}`;

        res.render(
            'recovery_password',
            {
                url,
                layout: false,
                appName: APP_NAME
            },
            async (error, html) => {
                let options = {
                    html,
                    to: email,
                    text: 'Recuperar Contraseña',
                    subject: 'Recuperar Contraseña'
                };
                await sendMail(options);
                return res.status(200).send({
                    message:
                        'Enviaremos un enlace a tu correo electrónico para restaurar la contraseña.'
                });
            }
        );
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}


async function checkRecoveryToken(req, res) {

    try {
        const { token } = req.body;

        const userId = await decodeToken(token);
        const mailtoken = await getMailToken(userId);

        if(mailtoken.used){
            return res.status(400).send({ message: 'Token ya usado' });
        }

        if(token!=mailtoken.token){ 
            return res.status(400).send({ message: 'Token no asignado a este usuario' });
        }

        return res.status(400).send({ message: 'Token válido' });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}


async function changePassword(req, res) {

    try {
        const { token, password } = req.body;

        const userId = await decodeToken(token);
        const mailtoken = await getMailToken(userId);

        if (!mailtoken.used && token==mailtoken.token) {
            await usersRepository.update(
                { password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)) },
                { id: userId }
            );
            
            await saveMailToken(userId, token, true);
            return res.status(200).send({ message: 'Contraseña actualizada' });
        }
        return res.status(400).send({ message: 'Token no disponible' });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}


module.exports = {
    login,
    logout,
    recoveryPassword,
    changePassword,
    checkRecoveryToken
};
