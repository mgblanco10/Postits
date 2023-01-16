const { connect, disconnect } = require('mongoose')
const { User } = require('../../../models')
const { DuplicityError, FormatError } = require('../../../errors')
const registerUser = require('.')

describe('registerUser', () => {
    beforeAll(() => connect('mongodb://localhost:27017/postits-test'))

    beforeEach(() => User.deleteMany())

    it('succeeds on new user', async () => {  // happy path
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'

        const res = await registerUser(name, email, password)

        expect(res).toBeUndefined()

        const users = await User.find({ email })

        expect(users).toHaveLength(1)

        const [user] = users

        expect(user.name).toEqual(name)
        expect(user.email).toEqual(email)
        expect(user.password).toEqual(password)
    })

    it('fails on existing user', async () => {  // unhappy path
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'

        await User.create({ name, email, password })
        
        // try {
        //     await registerUser(name, email, password)
        // } catch (error) {
        //     expect(error).toBeInstanceOf(DuplicityError)
        //     expect(error.message).toEqual('user already exists')
        // }

        await expect(registerUser(name, email, password)).rejects.toThrowError(DuplicityError, 'user already exists')
    })

    it('fails on non-string name', () => { // unhappy path
        const name = 123
        const email = 'pepito@grillo.com'
        const password = '123123123'

        expect(() => registerUser(name, email, password)).toThrowError(TypeError, 'name is not a string')
    })

    it('fails on empty name', () => { // unhappy path
        const name = ''
        const email = 'pepito@grillo.com'
        const password = '123123123'

        expect(() => registerUser(name, email, password)).toThrowError(FormatError, 'name is empty or blank')
    })

    it('fails on invalid email', () => { // unhappy path
        const name = 'Pepito Grillo'
        const email = 'pepito_grillo.com'
        const password = '123123123'

        expect(() => registerUser(name, email, password)).toThrowError(FormatError, 'email is not valid')
    })

    afterAll(() => disconnect())
})