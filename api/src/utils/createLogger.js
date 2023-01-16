const { createLogger, format, transports } = require('winston')
const { combine, timestamp, simple, splat, colorize, printf, align, label } = format

function createLabelForModule(callingModule) {
    const parts = callingModule.filename.split('/')

    return parts[parts.length - 2] + '/' + parts.pop()
}

module.exports = function (callingModule) {
    return createLogger({
        level: 'debug',
        format: combine(
            timestamp(),
            label({ label: createLabelForModule(callingModule) }),
            printf(log => `${log.level.toUpperCase()} ${log.timestamp} ${log.label} | ${log.message}`)
        ),
        transports: [
            new transports.Console(),
            new transports.File({ filename: 'server.log' }),
        ],
    })
}

// logger en servidor para guardar registro de los errores
// lo guarda en un fichero - Winston 
//puedes elegir el formato en disco en consola
// esto es una manera de ver en un servidor los errores, y para aplicaciones destock
// los ordenares tienen su logger en mac es: finder>Applications>utilities>console
// npm i winston //logger para cualquier cosa 
// se configura al arrancar el servidor



    //return callingModule.filename
// preguntar respecto a este module.exports :s

//Otra manera de hacerlo + SENCILLA Formato simple
//Sacado de página oficial de logger OJO
//TE DA UN JSON
// const logger = winston.createLogger({
//     level: 'debug', 'info'---> yo decido
//     format: winston.format.simple,
//     transports :[
//         new winston.transports.Console(),
//         new winston.transports.File({filename:'server.log'}),
//     ],
// })
// module.exports = logger

//server logs es el error más común que guarda cualquier tipo de sucesos
// lo adaptaremos en el index y podremos este logger cuando se produzca un error
//con esto veremos TODO EN UN fichero

//en la carpeta de la api hago npm start y me crearia la carpeta server.log
//esta me la hace gris porque me la ignora