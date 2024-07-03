require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');   
const app = express();
const ingredientsRoute = require('./routes/ingredients');
const recipesRoute = require('./routes/recipes');
const finalsRoute = require('./routes/finals');
const usersRoute = require('./routes/users');
const fgsRoute = require('./routes/fgs');
const PackagesRoute = require('./routes/Packages');

//console.log('ingredientsRoute:', ingredientsRoute); // Debugging line

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/kapl-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use('/ingredients', ingredientsRoute);
app.use('/recipes', recipesRoute);
app.use('/finals' , finalsRoute);
app.use('/users' , usersRoute);
app.use('/fgs' , fgsRoute);
app.use('/Packages' , PackagesRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
