const express = require('express')
const { Router, json } = express
const jsonBodyParser = json()
const { registerUserHandler, authenticateUserHandler, retrieveUserHandler, updateUserPasswordHandler } = require('./users')
const { createNoteHandler, retrieveNotesHandler,updateNoteTextHandler, deleteNoteHandler } = require('./notes')



const usersRouter = Router()

usersRouter.post('/users', jsonBodyParser, registerUserHandler)
usersRouter.post('/users/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.get('/users', retrieveUserHandler)
usersRouter.patch('/users/password/',jsonBodyParser, updateUserPasswordHandler)
// TODO usersRouter.patch('/users/email', jsonBodyParser, updateUserEmailHandler)
// TODO usersRouter.patch('/users/info', jsonBodyParser, updateUserInfoHandler)

const notesRouter = Router()

notesRouter.post('/notes', jsonBodyParser, createNoteHandler)
notesRouter.get('/notes', retrieveNotesHandler)
notesRouter.patch('/notes/:noteId',jsonBodyParser, updateNoteTextHandler)
notesRouter.delete('/notes/:noteId', deleteNoteHandler)

module.exports = {
    usersRouter,
    notesRouter
}