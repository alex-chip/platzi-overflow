const users = require('../models/index').users

async function createUser (req, h) {
  let result
  try {
    result = await users.create(req.payload)
  } catch (error) {
    console.error(error)
    return h.response('Problemas creando el usuario').code(500)
  }

  return h.response(`Usuario creado ID: ${result}`)
}

async function validateUser (req, h) {
  let result
  try {
    result = await users.validateUser((req.payload))
  } catch (e) {
    console.error(e)
    return h.response('Problema validando el usuario').code(500)
  }
  return result
}

module.exports = {
  createUser,
  validateUser
}
