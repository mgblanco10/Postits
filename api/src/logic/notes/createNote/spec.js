const {connect, disconnect, Types: {ObjectId}} = require('mongoose')
const {User, Note} = require ('../../../models')
const {NotFoundError} = require ('../../../errors')
const createNote = require('.')

describe ('createNote', ()=>{
    beforeAll(()=> connect ('mongodb://localhost:27017/postits-test'))

    beforeEach(()=> Promise.all([User.deleteMany(), Note.deleteMany()]))

    it('succeeds on correct data', ()=>{ //happy path
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'

        const text = 'hola mundo'

        return User.create({ name, email, password })
            .then(user =>
                createNote(user.id, text)
                    .then(res => {
                        expect(res).toBeUndefined()

                        return Note.find()
                    })
                    .then(notes => {
                        expect(notes).toHaveLength(1)

                        const [note] = notes

                        expect(note.user.toString()).toEqual(user.id)
                        expect(note.text).toEqual(text)
                        expect(note.visibility).toEqual('private')
                        expect(note.createdAt).toBeInstanceOf(Date)
                        expect(note.modifiedAt).toBeUndefined()
                    })
            )

    })

    it('fails on non-existing user', () => {  //   unhappy path
        const userId = new ObjectId().toString()
//truco para forzar un error porque si no falla saltaria el then y asi podriamos saber si realmente falla el test
        // return createNote(userId)
        // .then(()=>{throw new Error ('should not reach this point')})
        // .catch(error => {
        //     expect(error).toBeInstanceOf(NotFoundError)
        //     expect(error.message).toEqual(`user with id ${userId} not found`)
       // })

       return expect (createNote(userId)).rejects.toThrowError(NotFoundError, `user with id ${userId} not found`)
       //en mocha expect (createNote(userId)).to.eventually.be.rejectedWith(NotFoundError...)
    })

    afterAll(() => disconnect())
})