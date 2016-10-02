const mongoMain = require(`${__dirname}/../mongomain.js`);

exports.getModel = () => {
  const sessionSchema = mongoMain.handle.Schema({
    id: String,
    expirationDate: String,
    userRole: String,
  });

  return mongoMain.handle.model('sessions', sessionSchema);
};
