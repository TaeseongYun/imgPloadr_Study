const fs = require("fs")
const path = require("path")
const sidebar = require("../helpers/sidebar")
const Model = require("../models")

module.exports = {
  index: (req, res) => {
    const viewModel = {
      image: {},
      comments: []
    }

    Model.Image.findOne({ filename: { $regex: req.params.image_id } }, (err, image) => {
      if (err) throw err

      if (image) {
        image.views = image.views + 1
        viewModel.image = image
        image.save()

        Model.Comment.find(
          { image_id: image._id },
          {},
          { sort: { timestamp: 1 } },
          (err, comments) => {
            if (err) throw err

            viewModel.comments = comments

            sidebar(viewModel, viewModel => {
              res.render("image", viewModel)
            })
          }
        )
      } else {
        res.redirect("/")
      }
    })
    sidebar(viewModel, viewModel => {
      res.render("image", viewModel)
    })
  },

  create: (req, res) => {
    const saveImage = () => {
      var possible = "abcdefghijklmnopqrstuvwxzyz0123456789",
        imgUrl = ""

      for (var i = 0; i < 6; i += 1) {
        imgUrl += possible.charAt(Math.floor(Math.random() * possible.length))
      }

      Model.Image.find({ filename: imgUrl }, (err, images) => {
        if (images.length > 0) {
          saveImage()
        } else {
          console.log(`req.files: ${req.files}`)
          // const tempPath = req.files.file.path
          // const ext = path.extname(req.files.file.name).toLowerCase()
          // const targetPath = path.resolve("./public/upload/" + imgUrl + ext)

          // if (ext === ".jpg" || ext === ".gif" || ext === ".jpeg" || ext === ".png") {
          //   fs.rename(tempPath, targetPath, err => {
          //     if (err) throw err

          //     const newImg = new Model.Image({
          //       title: req.body.title,
          //       filename: imgUrl + ext,
          //       description: req.body.description
          //     })

          //     newImg.save((err, image) => {
          //       console.log("Successfully inserted image: " + image.filename)
          //       res.redirect("/images/" + image.uniqueId)
          //     })
          //   })
          // } else {
          //   fs.unlink(tempPath, () => {
          //     if (err) throw err

          //     res.json(500, { error: "Only image files are allowed" })
          //   })
          // }
        }
      })
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
