const { NotFoundError, AuthError, SystemError } = require("errors")
const { User, Note } = require("../../../models")
const { verifyObjectIdString } = require("../../../utils")

module.exports = function deleteNote(userId, noteId) {
    verifyObjectIdString(userId)
    verifyObjectIdString(noteId)
   debugger
    return User.findById(userId)
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)
            return Note.findById(noteId)
                .catch(error => {
                    throw new SystemError(error.message)
                })
        })

        .then(note => {
            if (!note) throw new NotFoundError(`note with id ${noteId} not found`)

            if (note.user.toString() !== userId) throw new AuthError(`note with id ${noteId} does not belong to user with id ${userId}`)

            return Note.deleteOne({ _id: noteId })
        })

        .then(() => { })
}