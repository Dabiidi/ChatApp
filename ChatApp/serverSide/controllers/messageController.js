const Messages = require("../model/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        attachment: msg.message.attachment, // Assuming 'attachment' is a field in the message model
      };
    });

    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};




module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    let attachment = null;

    if (req.file) {
      // If a file was uploaded, store the file path or information in the 'attachment' field
      attachment = req.file.path; // Assuming you want to store the file path
    }

    const data = await Messages.create({
      message: { text: message, attachment: attachment },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.json({ msg: "Message added successfully." });
    } else {
      return res.json({ msg: "Failed to add message to the database." });
    }
  } catch (ex) {
    next(ex);
  }
};