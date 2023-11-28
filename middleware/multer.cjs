const multer = require("multer");
const path = require("path");
let oneStepBack = path.join(__dirname, "../");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, oneStepBack + "uploads");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = {
  upload,
};
