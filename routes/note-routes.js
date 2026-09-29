// DEPENDANCIES
const express = require('express');
const router = express.Router();

const { createNote } = require('../controllers/note-controllers');
const { verifyToken } = require('../middleware/auth-middleware');

// Protected route
router.post('/', verifyToken, createNote);

module.exports = router;