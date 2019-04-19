module.exports = {
  index: (req, res) => {
    res.render("image")
  },
  create: (req, res) => {
    res.send("The image:create POST controller ")
  },
  like: (req, res) => {
    res.send("The image:like POST controller ")
  },
  comment: (req, res) => {
    res.send("The image:comment POST controller ")
  }
}
