const mongoose = require("mongoose");

var uri = `mongodb://${process.env.ADMINNAME}:${process.env.PASSWORD}@ac-hxcfjnj-shard-00-00.4uw4l0n.mongodb.net:27017,ac-hxcfjnj-shard-00-01.4uw4l0n.mongodb.net:27017,ac-hxcfjnj-shard-00-02.4uw4l0n.mongodb.net:27017/${process.env.DATABASE}?ssl=true&replicaSet=atlas-tp4k4h-shard-0&authSource=admin&retryWrites=true&w=majority`;

var uriapp = `mongodb://${process.env.ADMINNAME}:${process.env.APPPASSWORD}@ac-hxcfjnj-shard-00-00.4uw4l0n.mongodb.net:27017,ac-hxcfjnj-shard-00-01.4uw4l0n.mongodb.net:27017,ac-hxcfjnj-shard-00-02.4uw4l0n.mongodb.net:27017/${process.env.DATABASE}?ssl=true&replicaSet=atlas-tp4k4h-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => console.log("Connected To DB"))
  .catch((err) => console.log("error", err));

module.exports = mongoose;
