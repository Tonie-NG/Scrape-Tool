const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const taskRoute = require("./taskRoute");
const app = express();

dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/query", taskRoute);

port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running`);
});
