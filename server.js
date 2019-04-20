const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

app = express()
config = require("./server/configure")
app.set("port", process.env.PORT || 3300)
app.set("views", __dirname + "/views")

app = config(app)

// const MongoClient = require('mongodb').MongoClient;
// const uri = "";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
mongoose.connect(
  `mongodb+srv://TaeseongYun:${
    process.env.DB_PASSWORD
  }@imageregistercluster-okmle.mongodb.net/test?retryWrites=true`,
  { useNewUrlParser: true }
)
mongoose.connection.on("open", () => {
  console.log("Mongoose connected.")
})
app.get("/", (req, res) => {
  res.send("Hello world")
})

app.listen(app.get("port"), () => {
  console.log("Server up : http://localhost:" + app.set("port"))
})
