const { SystemError, NotFoundError } = require("errors")
const { Note, User } = require("../../../models")
const { verifyObjectIdString } = require("../../../utils")

function retrieveNotes(userId) {
    verifyObjectIdString(userId, 'user id')

    return User.findById(userId).lean()
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            return Note.find({ user: userId }, 'text visibility createdAt modifiedAt').lean()
                .catch(error => {
                    throw new SystemError(error.message)
                })
        })
        .then(notes => {
            notes.forEach(note => {
                // sanitize

                note.id = note._id.toString()
                delete note._id

                delete note.__v
            })

            return notes
        })
}

module.exports = retrieveNotes