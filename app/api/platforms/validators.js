const { checkSchema } = require('express-validator');
const { VALIDATION_ERRORS } = require('../../utils/constants');

module.exports = option => {
    let ret = [];
    switch (option) {


        case 'store':
            ret.push(...[
                checkSchema({
                    name: {
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        },
                        isLength: {
                            errorMessage: VALIDATION_ERRORS.MAX_LENGTH(100),
                            options: { max: 100 }
                        }
                    },
                })
            ])

        case 'update':
            
        default:
            return ret;
    }
};
