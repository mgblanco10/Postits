const { runWithErrorHandling, createLogger } = require('../../utils')
const { users: { registerUser } } = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
    runWithErrorHandling(() => {
        const { body: { name, email, password } } = req
        //si hay un dato que no está bien atrapa los errores sincronos

        return registerUser(name, email, password)
            .then(() => res.status(201).send())
    }, res, logger)
}