const firebase = require('firebase-admin')
const serviceAccount = require('../config/firebase.json')

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://platzioverflow-d4f9b.firebaseio.com'
})

const db = firebase.database()
// importando el modelo de users
const Users = require('./users')
// importando el modelo de questions
const Questions = require('./questions')

module.exports = {
  users: new Users(db),
  questions: new Questions(db)
}
