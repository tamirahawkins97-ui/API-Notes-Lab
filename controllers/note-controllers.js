// controllers/note-controllers.js
const Note = require('../models/note-model'); // Adjust path to  Note model

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // Safety check: verify req.user exists and has id / _id
    const userId = req.user?.id || req.user?._id; 
    if (!userId) {
      return res.status(401).json({ message: 'User identity not found in token' });
    }

    const note = await Note.create({
      title,
      content,
      user: userId 
    });

    return res.status(201).json(note);
  } catch (error) {
    console.error('Error creating note:', error);
    return res.status(500).json({ message: 'Server error creating note', error: error.message });
  }
};

module.exports = { createNote };