// Archivo de helpers personalizados
const handlebars = require('handlebars')

function registerHelpers () {
  // Helper que nos ayuda a contar el numero de respuestas de cada pregunta
  handlebars.registerHelper('answerNumber', (answers) => {
    const keys = Object.keys(answers).length
    return keys
  })
  // Helper que nos ayuda a comprar dos usuarios
  handlebars.registerHelper('ifEquals', (userA, userB, options) => {
    if (userA === userB) {
      return options.fn(this)
    }
    return options.inverse(this)
  })
  return handlebars
}

module.exports = registerHelpers()
