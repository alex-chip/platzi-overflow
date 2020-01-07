const Joi = require('@hapi/joi')
const site = require('./controllers/site')
const user = require('./controllers/user')
const question = require('./controllers/questions')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: site.home
  },

  {
    method: 'GET',
    path: '/register',
    handler: site.register
  },
  {
    path: '/create-user',
    method: 'POST',
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required().min(3),
          email: Joi.string().email().required(),
          password: Joi.string().required().min(6)
        }),
        failAction: user.failValidation
      }
    },
    handler: user.createUser
  },
  {
    method: 'GET',
    path: '/login',
    handler: site.login
  },
  {
    method: 'GET',
    path: '/logout',
    handler: user.logout
  },
  {
    method: 'GET',
    path: '/ask',
    handler: site.ask
  },
  {
    path: '/validate-user',
    method: 'POST',
    options: {
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required().min(6)
        }),
        failAction: user.failValidation
      }
    },
    handler: user.validateUser
  },
  {
    path: '/create-question',
    method: 'POST',
    options: {
      validate: {
        payload: Joi.object({
          title: Joi.string().required(),
          description: Joi.string().required()
        }),
        failAction: user.failValidation
      }
    },
    handler: question.createQuestion
  },
  {
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
      directory: {
        path: '.',
        index: ['index.html']
      }
    }
  },
  {
    // se declara en un arreglo para que acepte varias peticiones
    method: ['GET', 'POST'],
    // en el path se usa el comodin {any*} para que acepte cualquiera
    path: '/{any*}',
    handler: site.notFound
  }
]
