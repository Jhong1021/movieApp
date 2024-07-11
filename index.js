const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,  // no longer necessary
  useUnifiedTopology: true,  // no longer necessary
}).then(() => {
  console.log("Connected to the database");
}).catch((error) => {
  console.error("Error connecting to the database", error);
});

app.use("/auth", userRoutes);
app.use("/api", movieRoutes);

if(require.main === module) {
    app.listen(port, () => console.log(`Server running at port ${port}`));
}

module.exports = { app, mongoose };
