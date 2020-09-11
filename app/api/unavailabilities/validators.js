const { checkSchema } = require('express-validator');
const { VALIDATION_ERRORS } = require('../../utils/constants');

module.exports = option => {
    let ret = [];
    switch (option) {


        case 'store':
            ret.push(...[
                checkSchema({
                    from: {
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        }
                    },
                    to: {
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        }
                    },
                    translator_id: {
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        }
                    },
                })
            ])

        case 'update':
            
        default:
            return ret;
    }
};
