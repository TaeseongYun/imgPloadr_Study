const express = require("express")

app = express()
config = require("./server/configure")
app.set("port", process.env.PORT || 3300)
app.set("views", __dirname + "/views")

app = config(app)

app.get("/", (req, res) => {
  res.send("Hello world")
})

app.listen(app.get("port"), () => {
  console.log("Server up : http://localhost:" + app.set("port"))
})
