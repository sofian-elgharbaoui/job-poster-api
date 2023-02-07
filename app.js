const express = require("express");
const app = express();

// connect DB
const connectDB = require("./database/connectDB");
require("dotenv").config();

require("express-async-errors");

// middlewares
const errorsHandler = require("./middlewares/errors_handler");
const notFound = require("./middlewares/not_found");

// routers
const authRouter = require("./routers/auth");
const jobsRouter = require("./routers/jobs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(notFound);
app.use(errorsHandler);

const port = process.env.PORT || 3000;
(async () => {
  try {
    await connectDB(process.env.URI);
    app.listen(port, () => console.log(`Serer is listening on port ${port}!`));
  } catch (error) {
    console.log(error);
  }
})();
