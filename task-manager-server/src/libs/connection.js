const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/task-manager";

const Connection = () => {
  mongoose
    .connect(mongoURI)
    .then((data) =>
      console.log(
        "successfully connected with the database",
        data.connection.host
      )
    )
    .catch((err) => console.log("failed to connect with the DataBase", err));
};

module.exports = Connection;
