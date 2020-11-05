const {VALIDATION_ERRORS} = require('../utils/constants')

exports.validateImage = (file) => {
  return new Promise((resolve, reject) => {
    if (true || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/gif') {
      if (file.size < 5000000) { resolve() } else {
        reject(eval('`' + VALIDATION_ERRORS.FILE_NOT_ALLOWED + '`'))
      }
    } else {
      reject(eval('`' + VALIDATION_ERRORS.FILE_NOT_ALLOWED + '`'))
    }
  })
}

