const questions = require('../models/index').questions

async function setAnswerRight (questionId, answerId, user) {
  let result
  try {
    result = await questions.setAnswerRight(questionId, answerId, user)
  } catch (error) {
    console.error(error)
    return false
  }
  return result
}

async function getLast (amount) {
  let data
  try {
    data = await questions.getLast(10)
  } catch (error) {
    console.error(error)
  }
  // se ejecuta el metodo de cache
  console.log('Se ejecuto el metodo')
  return data
}

module.exports = {
  setAnswerRight,
  getLast
}
