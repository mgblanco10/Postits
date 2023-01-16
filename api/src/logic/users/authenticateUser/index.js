const { User } = require('../../../models')
const { NotFoundError, SystemError, AuthError } = require('errors')
const { validateEmail, validatePassword } = require('validators')
/**
 * 
 * @param {string} email The user.
 * @param {string} password The user.
 * 
 * @returns {user.id}
 * 
 * @throws {SystemError} If an error happens in db.
 * @throws {NotFoundError} If the user is not found.
 * @throws {AuthError} If the user not is the correct, wrong password.
 */

function authenticateUser(email, password) {
    validateEmail(email)
    validatePassword(password)

    return User.findOne({ email })
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(user => {
         
            if (!user) throw new NotFoundError(`user with email ${email} not found`)

            if (user.password !== password) throw new AuthError('wrong password')

            return user.id
        })
}

module.exports = authenticateUser
