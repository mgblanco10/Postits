const { User } = require ('../../../models')
const { AuthError } = require('errors')
const { validatePassword } = require('validators')

function updateUserPassword(userId, oldPassword, newPassword, newPasswordRepeat){
   debugger 
    validatePassword(oldPassword, 'old password')
    validatePassword(newPassword, 'new password')
    validatePassword(newPasswordRepeat, 'confirm new password')
    if(newPassword !== newPasswordRepeat) throw new AuthError('New password and confirm new password are not the same')

    return User.findById({ _id: `${userId}` })
    .catch(error => {
        throw new SystemError(error.message)
    })
    .then(user => {
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)
        if (user.password !== oldPassword) throw new AuthError('wrong Password')
        else if (newPassword !== newPasswordRepeat) throw new Error(' please enter same password')
       
        user.password = newPassword

        return user.save()

    })

    .then(() => { })

}
module.exports = updateUserPassword
