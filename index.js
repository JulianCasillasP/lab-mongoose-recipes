const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
  
Recipe.insertMany(data)
.then((createdRecipes) => {
  console.log('Recipes created:');
  createdRecipes.forEach((recipe) => {
    console.log(recipe.title);
  });
})
.catch((error) => {
  console.error('Error creating recipes:', error);
});

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to the database: "${mongoose.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create({
      title: 'Lemon Pie',
      level: 'Easy Peasy',
      ingredients: ['Egg', 'Cream Cheese', 'Lemon', 'Milk', 'Cookies'],
      cuisine: 'VegaBajo',
      dishType: 'dessert',
      image: 'https://images.media-allrecipes.com/images/75131.jpg',
      duration: 60,
      creator: 'Julian Casillas',
    });
  })
  .then((recipe) => {
    console.log('Recipe created:', recipe.title);
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

  Recipe.findOneAndUpdate(
    { title: 'Rigatoni alla Genovese' },
    { duration: 100 }
  )
    .then(() => {
      console.log('Recipe updated successfully!');
    })
    .catch((error) => {
      console.error('Error updating recipe:', error);
    });

    Recipe.deleteOne({ title: 'Carrot Cake' })
  .then(() => {
    console.log('Recipe removed successfully!');
  })
  .catch((error) => {
    console.error('Error removing recipe:', error);
  });

  mongoose.connection.close()
  .then(() => {
    console.log('Database connection closed.');
  })
  .catch((error) => {
    console.error('Error closing database connection:', error);
  });
