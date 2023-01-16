const { User } = require('../../../models')
const { DuplicityError, SystemError } = require('errors')
const { validateText, validateEmail, validatePassword } = require('validators')

/**
 * 
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 * 
 * @returns {promise}
 * 
 * @throws {DuplicityError} User alreadys exists.
 * @throws {SystemError} If an error happens in db.
 */

function registerUser(name, email, password) {
    //errores sincronos
    validateText(name, 'name')
    validateEmail(email)
    validatePassword(password)

    return (async () => {
        try {
            await User.create({ name, email, password })
        } catch (error) {
            if (error.code === 11000)
                throw new DuplicityError('user already exists')

            throw new SystemError(error.message)
        }
    })()
}

module.exports = registerUser