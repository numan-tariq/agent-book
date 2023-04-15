require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const cors = require("cors");
const { sequelize } = require("./models");

// Database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("🚀 ~ Database Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("🚀 ~ Unable to connect to the database: ", err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api documentation
app.use('/docs', express.static('./docs'))

// for general apis
app.use(require("./routes/routes"));

app.use((req, res, next) => {
  return res.status(200).send("AGENT BOOK!");
});

app.use(express.static("public"));

const PORT = process.env.PORT;
http.listen(PORT, () => console.log("🚀 API running at port", PORT));
