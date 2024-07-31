const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const Connection = require("./src/libs/connection");
const taskRouter = require("./src/routes/task-route");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("App is working...");
});

app.use("/task", taskRouter);

app.listen(PORT, () => {
  console.log(`App is working in PORT: ${PORT}`);
});

Connection();
