const bcrypt = require('bcryptjs');

const password = "admin123";   // your password
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(password, salt);

console.log(hashedPassword);