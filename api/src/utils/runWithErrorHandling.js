const { JsonWebTokenError, TokenExpiredError, NotBeforeError } = require('jsonwebtoken')
const { FormatError, DuplicityError, NotFoundError, AuthError } = require('errors')

//manejo de errores sincronos el catch de abajo 
function runWithErrorHandling(callback, res, logger) {
    try {
        callback() //tiene el handling envuelto//devueve la promesa de la callback
        // para tratar errores asincronos centralizados
            .catch(error => {
                if (error instanceof DuplicityError)
                    res.status(409).json({error: error.message})
                else if (error instanceof NotFoundError || error instanceof AuthError)
                    res.status(401).json({error: 'wrong credentials'})
                else
                    res.status(500).json({error: 'system error'})
                logger.error(error)
            })
        } catch (error) {
        if (error instanceof TypeError || error instanceof FormatError)
            res.status(400).json({ error: error.message })
        else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError || error instanceof NotBeforeError)
            res.status(401).json({ error: 'token not valid' })
        else
            res.status(500).json({ error: 'system error' })

        logger.error(error)
    }
}

module.exports = runWithErrorHandling