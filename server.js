const express = require("express");
const app = express();
const hbs = require("hbs");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const recordsRoute = require("./routes/records");

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/records", recordsRoute);

app.listen(2020);