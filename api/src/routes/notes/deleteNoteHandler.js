const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { notes: { deleteNote } } = require('../../logic')
const logger = createLogger(module)
debugger
module.exports = (req, res) => {
    runWithErrorHandling(() => {

        const userId = verifyToken(req)

        const { params: { noteId } } = req

        return deleteNote(userId, noteId)
            .then(()=> res.status(200).send())
    }, res, logger)
}