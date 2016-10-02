const mongoMain = require(`${__dirname}/../mongomain.js`);

exports.getModel = () => {
  const cabinSchema = mongoMain.handle.Schema({
    Name: String,
    Code: String,
    Reservations: [{
      StartDate: Date,
      EndDate: Date,
      Name: String,
      PersNr: String,
      Street: String,
      Zip: String,
      City: String,
      Phone: String,
      Email: String,
      Reserves: [{
        PersNr: String,
        Name: String,
        Phone: String,
      }],
    }],
    Prices: [{
      Type: String,
      StartWeek: Number,
      EndWeek: Number,
      Price: Number,
    }],
  });

  return mongoMain.handle.model('cabins', cabinSchema);
};
