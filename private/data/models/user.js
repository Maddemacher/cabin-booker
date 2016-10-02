const mongoMain = require(`${__dirname}/../mongomain.js`);

exports.getModel = () => {
  const userSchema = mongoMain.handle.Schema({
    userName: String,
    password: String,
    userRole: String,
  });

  return mongoMain.handle.model('users', userSchema);
};
