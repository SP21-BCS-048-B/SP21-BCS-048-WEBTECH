// models/user.js
const bcrypt = require('bcryptjs');

class User {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.passwordHash = bcrypt.hashSync(password, 10);
  }

  // Method to compare hashed passwords
  comparePassword(password) {
    return bcrypt.compareSync(password, this.passwordHash);
  }
}

module.exports = User;
