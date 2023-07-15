const { addMessage, getMessages } = require("../controllers/messageController");
const router = require("express").Router();
const multer = require("multer");

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Set the file name for uploaded files
  },
});

// Set up multer upload
const upload = multer({ storage: storage });

// Endpoint for adding a message with a file
router.post("/addmsg/", upload.single("file"), addMessage);

// Endpoint for getting messages
router.post("/getmsg/", getMessages);

module.exports = router;
