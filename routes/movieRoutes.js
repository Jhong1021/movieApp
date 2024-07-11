const express = require('express');
const {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  addComment
} = require('../controllers/movieController');
const { authenticate, authorizeAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/movies', authenticate, authorizeAdmin, createMovie);
router.get('/movies', getMovies);
router.get('/movies/:id', getMovieById);
router.put('/movies/:id', authenticate, authorizeAdmin, updateMovie);
router.delete('/movies/:id', authenticate, authorizeAdmin, deleteMovie);
router.post('/movies/:id/comments', authenticate, addComment);

module.exports = router;
