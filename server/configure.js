const path = require("path"),
  routes = require("./routes"),
  exphbs = require("express-handlebars"),
  express = require("express"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  morgan = require("morgan"),
  methodOverride = require("method-override"),
  errorHandler = require("errorhandler"),
  moment = require("moment"),
  multer = require("multer")

module.exports = app => {
  app.use(morgan("dev"))
  app.use(bodyParser.json())
  app.use(multer({ dest: path.join(__dirname, "public/upload/temp") }).any())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser("some-secret-value-here"))
  app.use(methodOverride())
  routes(app)

  app.use("/public/", express.static(path.join(__dirname, "../public")))
  if ("development" === app.get("env")) {
    app.use(errorHandler())
  }
  app.engine(
    "handlebars",
    exphbs.create({
      defaultLayout: "main",
      layoutsDir: app.get("views") + "/layouts",
      partialsDir: [app.get("views") + "/partials"],
      helpers: {
        timeago: timestamp => {
          return moment(timestamp)
            .startOf("minute")
            .fromNow()
        }
      }
    }).engine
  )
  app.set("view engine", "handlebars")
  return app
}
