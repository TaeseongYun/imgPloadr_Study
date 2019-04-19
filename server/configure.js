const path = require("path"),
  routes = require("./route"),
  exphbs = require("express-handlebars"),
  express = require("express"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  morgan = require("morgan"),
  methodOverride = require("method-override"),
  exphbs = require("express-handlebars")

module.exports = app => {
  app.use(morgan("dev"))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser("some-secret-value-here"))
  app.use(methodOverride())
  routes(app)
  app.use("/public", express.static(path.join(__dirname, "../public")))
  if ("development" === app.get("env")) {
    app.use(errorHandler())
  }
  return app
}
