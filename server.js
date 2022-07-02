const express = require("express");
const session = require("express-session");
const path = require("path");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const handlebars = require("express-handlebars");
const hbs = handlebars.create({});
const { v4: uuid } = require("uuid");

const routes = require("./controllers/home-routes");

const app = express();

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/avatar-legends-db"
);
mongoose.set("debug", true);

const hours = 1;
app.use(
  session({
    genid: () => uuid(),
    secret: "Jotaro is best Jojo",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: hours * 3600000,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/avatar-legends-db",
    }),
  })
);

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

app.listen(PORT, () => console.log(`Connected to Port: ${PORT}`));
