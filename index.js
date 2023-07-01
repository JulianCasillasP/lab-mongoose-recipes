const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to the database: "${mongoose.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create({
      title: "Lemon pie",
      level: "Easy Peasy",
      ingredients: ["Lemon", "Eggs", "Milk", "Cookies"],
      cuisine: "VegaBajo",
      dishType: "dessert",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 60,
      creator: "Julian Casillas",
    });
  })
  .then(recipe => {
    console.log(`Recipe created: ${recipe.title}`);
    return Recipe.insertMany(data);
  })
  .then(recipes => {
    recipes.forEach(recipe => {
      console.log(`Recipe inserted: ${recipe.title}`);
    });
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
  })
  .then(() => {
    console.log("Recipe updated successfully!");
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log("Recipe deleted successfully!");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

 