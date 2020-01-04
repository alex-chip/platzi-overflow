const bcrypt = require('bcrypt')

class Users {
  constructor (db) {
    this.db = db
    this.ref = this.db.ref('/')
    this.collection = this.ref.child('users')
  }

  async create (data) {
    const user = {
      ...data
    }
    user.password = await this.constructor.encrypt(user.password)
    const newUser = this.collection.push(user)
    newUser.set(user)

    return newUser.key
  }

  async validateUser (data) {
    const userQuery = await this.collection.orderByChild('email').equalTo(data.email).once(('value'))
    const userFound = userQuery.val()
    let result
    if (userFound) {
      const userId = Object.keys(userFound)[0]
      const passwordRight = await bcrypt.compare(data.password, userFound[userId].password)
      result = (passwordRight) ? userFound[userId] : false
      return result
    }
    return false
  }

  static async encrypt (passwd) {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(passwd, saltRounds)

    return hashedPassword
  }
}

module.exports = Users
