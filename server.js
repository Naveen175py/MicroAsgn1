const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const app = express();
const discover = require("./routes/discover");
const admin = require("./routes/admin");
const initializeDatabase = require("./config/db");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initializeDatabase();
app.get("/api/health", (req, res) => {
  res.send(`backend server is up and running:${new Date()}`);
});

app.use("/api/admin", admin);

app.use("/api/discover", discover);

app.use((err, req, res, next) => res.status(500).send("Something went wrong! Please try after some time."));
app.use((req, res, next) => res.status(404).send("You are looking for something that we not have! Route not found"));

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.listen(port, () => {
  console.log(`Express server is listening at https://${host}:${port}`);
});
