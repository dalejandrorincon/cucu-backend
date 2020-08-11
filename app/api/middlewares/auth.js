const helper = require('../../utils/helpers');
const usersRepository = require('../users/repository');

async function isAuthenticated(req, res, next) {
	try {
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

		req.userId = userId;
		req.user = user;

		const sessionCheck = await helper.validateSession(userId)
		if (sessionCheck == "INVALID_SESSION") return res.status(403).send({ message: 'Usuario no autenticado' })
		next();
	} catch (error) {
		return res.status(403).send({ message: error.message });
	}
}


async function isRole(req, res, next, roles) {
	try {

		const { authorization } = req.headers;

		if (!authorization) {
			return res.status(401).send({
				message: 'Olvidó autenticarse'
			});
		}

		const token = authorization.replace("Bearer ", "")
		const userId = await helper.decodeToken(token);
		const user = await usersRepository.findById(userId);
		if(roles.includes(user.role)){
			next()
		}else{
			return res.status(403).send({ message: 'Rol inválido para realizar esta acción' });
		}

	} catch (error) {
		return res.status(403).send({ message: error.message });
	}
}



module.exports = {
	isAuthenticated,
	isRole
};
