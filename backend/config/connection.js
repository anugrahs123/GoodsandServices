const mongoClient = require("mongodb").MongoClient;

const state = {
  db: null,
};

module.exports.connect = function (done) {
  const url="mongodb://localhost:27017";
  // const url = "mongodb+srv://nihal:nihal@cluster0.aukqj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
 // const url="mongodb+srv://pas:pas123@cluster0.ti6yh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const dbname = "baithulliza";

  mongoClient.connect(url, { useUnifiedTopology: true }, (err, data) => {
    if (err) {
      return done(err);
    }
    state.db = data.db(dbname);

    done();
  });
};

module.exports.get = function () {
  return state.db;
};
