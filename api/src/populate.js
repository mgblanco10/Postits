//En el package json hay un scrip par runear y hacer pruebas con esto
// "populate": "node src/populate.js"
//"populate-inspect": "node --inspect-brk src/populate.js",
//"populate-inspect-cli": "node inspect src/populate.js"
const { connect, disconnect } = require('mongoose')
const { User, Note } = require('./models')


// otra forma de hacerlo sin destructuring
// arriba const mongoose = require ('mongoose')
//momgoose.connect('mongodb://localhost:27017/postits')

connect('mongodb://localhost:27017/postits')
    // .then(() => {
    //     return Promise.all([
    //         User.deleteMany(),
    //         Note.deleteMany()
    //     ])
    // })
    .then(() => {
        return Promise.all([User.deleteMany(), Note.deleteMany()])}
        )
    .then(() => {
        const pepito = new User({
            name: 'Pepito Grillo',
            email: 'pepito@grillo.com',
            password: '123123123'
        })

        const wendy = new User({
            name: 'Wendy Darling',
            // email: 'wendy@darling.com',
            email: 'pepito@grillo.com',
            password: '12312123'
        })

        const peter = new User({
            name: 'Peter Pan',
            email: 'peter@pan.com',
            password: '123123123'
        })

        const james = new User({
            name: 'James Hook',
            email: 'james@hook.com',
            password: '123123123'
        })
        const monica = new User({
            name: 'monica Hook',
            email: 'monica@hook.com',
            password: '123123123'
        })

        // te devuelve el mismo modelo pero ya salvado .save y te permite seguir operando
        return Promise.all([
            pepito.save(),
            wendy.save(),
            peter.save(),
            james.save(),
            monica.save()
        ])
    })
    // .then(users => {
    //     const [pepito, wendy, peter, james] = users
    //     ...
    .then(([pepito, wendy, peter, james]) => {
        const note1 = new Note({ user: pepito.id, text: 'Hola, Pepito!' })
        const note2 = new Note({ user: wendy.id, text: 'Hola, Wendy!' })
        const note3 = new Note({ user: peter.id, text: 'Hola, Peter!' })
        const note4 = new Note({ user: james.id, text: 'Hola, James!' })
        const note5 = new Note({ user: monica.id, text: 'Hola, Monica!' })
        return Promise.all([
            note1.save(),
            note2.save(),
            note3.save(),
            note4.save(),
            note5.save()
        ])
    })
    // para probar este es un playground
    
    .catch(error => {
     debugger
    })
    .then(() => disconnect())

//npm run populate-inspect-cli
// exec error
//exec error.code