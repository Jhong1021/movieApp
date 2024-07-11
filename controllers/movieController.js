const Movie = require('../models/Movie');

module.exports.createMovie = async (req, res) => {
  const { title, director, year, description, genre } = req.body;
  try {
    const movie = new Movie({ title, director, year, description, genre });
    await movie.save();
    res.status(201).send({ message: 'Movie created successfully', movie });
  } catch (error) {
    res.status(400).send({ error: 'Failed to create movie' });
  }
};

module.exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send(movies);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve movies' });
  }
};

module.exports.getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).send({ error: 'Movie not found' });
    }
    res.send(movie);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve movie' });
  }
};

module.exports.updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, director, year, description, genre } = req.body;
  try {
    const movie = await Movie.findByIdAndUpdate(id, { title, director, year, description, genre }, { new: true });
    if (!movie) {
      return res.status(404).send({ error: 'Movie not found' });
    }
    res.send({ message: 'Movie updated successfully', movie });
  } catch (error) {
    res.status(400).send({ error: 'Failed to update movie' });
  }
};

module.exports.deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return res.status(404).send({ error: 'Movie not found' });
    }
    res.send({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete movie' });
  }
};

module.exports.addComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).send({ error: 'Movie not found' });
    }
    movie.comments.push({ userId: req.user.userId, comment });
    await movie.save();
    res.send({ message: 'Comment added successfully', movie });
  } catch (error) {
    res.status(500).send({ error: 'Failed to add comment' });
  }
};
