// TOKEN se guarda la id usuario //descargas npm i jsonwebtoken // librería de token// jwt.io-->página token
const {verify} = require ('jsonwebtoken')
const {validateText} = require('validators')

const { JWT_SECRET } = process.env

function verifyToken (req){
const { headers: { authorization } } = req

validateText (authorization, 'authorization')

const token = authorization.substring(7)
// espacios de palabra bearer+espacio-->esto siempre es fijo por eso el substring(7) seimpre será el mismo


const payload = verify(token, JWT_SECRET)
//el mismo secreto que se utilizó para crear el token

const { sub: userId } = payload
//esto me interesa porque con el sub recupero el usuario

return userId
}
module.exports = verifyToken