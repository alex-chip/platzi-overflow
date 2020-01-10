const questions = require('../models/index').questions
async function home (req, h) {
  const data = await req.server.methods.getLast(10)
  return h.view('index', {
    title: 'Home',
    user: req.state.user,
    questions: data
  })
}

function register (req, h) {
  if (req.state.user) {
    return h.redirect('/')
  }
  return h.view('register', {
    title: 'Registro',
    user: req.state.user
  })
}

function login (req, h) {
  if (req.state.user) {
    return h.redirect('/')
  }
  return h.view('login', {
    title: 'Ingrese',
    user: req.state.user
  })
}

async function viewQuestion (req, h) {
  let data
  try {
    data = await questions.getOne(req.params.id)
    if (!data) {
      return notFound(req, h)
    }
  } catch (error) {
    console.error(error)
  }
  return h.view('question', {
    title: 'Detalles de la pregunta',
    user: req.state.user,
    question: data,
    key: req.params.id
  })
}

function notFound (req, h) {
  return h.view('404', {}, { layout: 'error-layout' }).code(404)
}

// funcion para controlar el error si no se encuentra un archivo en los assets del proyecto
function fileNotFound (req, h) {
  const response = req.response
  if (response.isBoom && response.output.statusCode === 404) {
    return h.view('404', {}, { layout: 'error-layout' }).code(404)
  }
  return h.continue
}

function ask (req, h) {
  if (!req.state.user) {
    return h.redirect('/login')
  }
  return h.view('ask', {
    title: 'Crear pregunta',
    user: req.state.user
  })
}

module.exports = {
  register,
  login,
  notFound,
  fileNotFound,
  ask,
  viewQuestion,
  home
}
