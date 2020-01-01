const firebase = require('firebase-admin')
const serviceAccount = require('../config/firebase.json')

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://platzioverflow-d4f9b.firebaseio.com'
  // apiKey: 'AIzaSyDMTwzJqC11QBfyXS8Otw9w6_g6x-PrlZM',
  // authDomain: 'platzioverflow-d4f9b.firebaseapp.com',
  // databaseURL: 'https://platzioverflow-d4f9b.firebaseio.com',
  // projectId: 'platzioverflow-d4f9b',
  // storageBucket: 'platzioverflow-d4f9b.appspot.com',
  // messagingSenderId: '327218320784',
  // appId: '1:327218320784:web:0ef627715a65c3cf764f15',
  // measurementId: 'G-L9FK4J70Y9'
})

const db = firebase.database()
const Users = require('./users')

module.exports = {
  users: new Users(db)
}
