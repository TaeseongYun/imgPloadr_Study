const fs = require("fs"),
  path = require("path"),
  sidebar = require("../helpers/sidebar")

const viewModel = {
  image: {
    uniqueId: 1,
    title: "Sample Image 1",
    description: "This is a sample",
    filename: "sample1.jpg",
    views: 0,
    likes: 0,
    timestamp: Date.now
  },
  comments: [
    {
      image_id: 1,
      email: "test@testing.com",
      name: "Test Tester",
      gravatar: "http://lorempixel.com/75/75/animals/1",
      comment: "This is a test comment...",
      timestamp: Date.now
    },
    {
      image_id: 1,
      email: "test@testing.com",
      name: "Test Tester",
      gravatar: "http://lorempixel.com/75/75/animals/2",
      comment: "This is a test comment!",
      timestamp: Date.now
    }
  ]
}

module.exports = {
  index: (req, res) => {
    sidebar(viewModel, viewModel => {
      res.render("image", viewModel)
    })
  },

  create: (req, res) => {
    const saveImage = () => {
      let possible = "abcdefghijklmnopqrstuvwxzyz0123456789",
        imgUrl = ""

      for (let i = 0; i < 9; i++) {
        imgUrl += Math.floor(Math.random() * possible.length)
      }

      let tempPath = req.files.file.path,
        ext = path.extname(req.files.file.name).toLowerCase(),
        targetPath = path.resolve("./public/upload/" + imgUrl + ext)

      if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".gif") {
        fs.rename(tempPath, targetPath, err => {
          if (err) throw err

          res.redirect("/images/" + imgUrl)
        })
      } else {
        fs.unlink(tempPath, () => {
          if (err) throw err

          res.json(500, { error: "Only image files are allowed" })
        })
      }
    }
    saveImage()
  },
  like: (req, res) => {
    res.json({ likes: 1 })
  },
  comment: (req, res) => {
    res.send("The image:comment POST controller ")
  }
}
