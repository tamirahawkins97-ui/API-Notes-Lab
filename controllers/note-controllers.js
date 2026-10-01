// controllers/note-controllers.js
const Note = require('../models/note-model');

// Helper to safely extract user ID
const getAuthUserId = (req) => req.user?.id || req.user?._id;

// POST /notes - Create Note
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = getAuthUserId(req);

    if (!userId) {
      return res.status(401).json({ message: 'User identity not found in token' });
    }

    const note = await Note.create({
      title,
      content,
      user: userId,
    });

    return res.status(201).json(note);
  } catch (error) {
    console.error('Error creating note:', error);
    return res.status(500).json({ message: 'Server error creating note', error: error.message });
  }
};

// 1. GET /notes - Filter "Get All Notes" to authenticated user
const getAllNotes = async (req, res) => {
  try {
    const userId = getAuthUserId(req);
    if (!userId) {
      return res.status(401).json({ message: 'User identity not found in token' });
    }

    const notes = await Note.find({ user: userId });
    return res.status(200).json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return res.status(500).json({ message: 'Server error fetching notes', error: error.message });
  }
};

// 4. (Optional) GET /notes/:id - Secure "Get Single Note"
const getSingleNote = async (req, res) => {
  try {
    const userId = getAuthUserId(req);
    if (!userId) {
      return res.status(401).json({ message: 'User identity not found in token' });
    }

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Ownership check
    if (note.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'User is not authorized to access this note.' });
    }

    return res.status(200).json(note);
  } catch (error) {
    console.error('Error fetching note:', error);
    return res.status(500).json({ message: 'Server error fetching note', error: error.message });
  }
};

// 2. PUT /notes/:id - Secure "Update Note"
const updateNote = async (req, res) => {
  try {
    const userId = getAuthUserId(req);
    if (!userId) {
      return res.status(401).json({ message: 'User identity not found in token' });
    }

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Ownership check
    if (note.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'User is not authorized to update this note.' });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedNote);
  } catch (error) {
    console.error('Error updating note:', error);
    return res.status(500).json({ message: 'Server error updating note', error: error.message });
  }
};

// 3. DELETE /notes/:id - Secure "Delete Note"
const deleteNote = async (req, res) => {
  try {
    const userId = getAuthUserId(req);
    if (!userId) {
      return res.status(401).json({ message: 'User identity not found in token' });
    }

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Ownership check
    if (note.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'User is not authorized to delete this note.' });
    }

    await note.deleteOne();
    return res.status(200).json({ message: 'Note deleted successfully.' });
  } catch (error) {
    console.error('Error deleting note:', error);
    return res.status(500).json({ message: 'Server error deleting note', error: error.message });
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
};