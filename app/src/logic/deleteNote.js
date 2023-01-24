import {  validateText, validateCallback } from 'validators'
import {  ClientError, ServerError } from 'errors'

const API_URL = process.env.REACT_APP_API_URL
/**
 * Deletes a note from database
 * 
 * @param {string} userId The user identifier
 * @param {string} noteId The note identifier
 * @param {funcion} callbback The function expression that provides a result
 *
 * @throws {TypeError} On invalid inputs
 */

function deleteNote(token, noteId, callback) {

    validateText(token, noteId)
    validateCallback(callback)


    const xhr = new XMLHttpRequest


    // response

    xhr.onload = function () {
        const status = xhr.status

        if (status >= 500)
            callback(new ServerError(`server error (${status})`))
        else if (status >= 400)
            callback(new ClientError(`client error (${status})`))
        else if (status === 204)
            callback(null)
    }

    // request

    xhr.open('DELETE', `${API_URL}/notes/${noteId}`)

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.setRequestHeader('Content-type', 'application/json')
    
    xhr.send()
}


export default deleteNote