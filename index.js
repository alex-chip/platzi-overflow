const Hapi = require('@hapi/hapi')
const inert = require('@hapi/inert')
const handlebars = require('handlebars')
const vision = require('@hapi/vision')
const path = require('path')
const routes = require('./routes')

const server = Hapi.Server({
  port: process.env.PORT || 3000,
  host: 'localhost',
  routes: {
    files: {
      relativeTo: path.join(__dirname, 'public')
    }
  }
})

async function init () {
  try {
    await server.register(inert)
    await server.register(vision)

    // Configurar el servidor para validar una session con una cookie de Hapi
    server.state('user', {
      // el periodo de validez se mide en milisegundos
      ttl: 1000 * 60 * 60 * 24 * 7,
      // parametro para hacer seguro la cookie
      isSecure: process.env.NODE_ENV === 'prod',
      // tipo de encoding para la cookie
      encoding: 'base64json'
    })
    server.views({
      engines: {
        hbs: handlebars
      },
      relativeTo: __dirname,
      path: 'views',
      layout: true,
      layoutPath: 'views'
    })

    server.route(routes)
    server.start()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

  console.log(`Servidor corriendo en: ${server.info.uri}`)
}

init()
