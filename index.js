const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

Recipe
  .create({
    title: "Falafel",
    level: "Amateur Chef",
    ingredients: ["chickpeas", "herbs"],
    cuisine: "Middle Eastern",
    dishType: "Snack",
    duration: 20,
    creater: "Yvana & Fábio",
  })
  .then((recipe) => {
    console.log("Recipe created: ", recipe.title)
  })
  .catch((error)=>{
    console.log("Blip Blop Blip, does not compute!", error)
  })

  Recipe.insertMany(data)
    .then((recipes)=>{
      console.log("Recipes imported:", recipes.title);
      return Recipe
      .updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
    })
    .then((recipe)=>{
      console.log("Recipe updated:", recipe)
    })
    .catch((error)=>{
      console.log("Blip Blop Blip, does not compute!", error);
    })
    
    Recipe
    .deleteOne({title: "Carrot Cake"})
    .then((recipe)=>{
      console.log("Recipe deleted:", recipe)
    })
    .catch((error)=>{
      console.log("Blip Blop Blip, does not compute!", error);
    })

    mongoose.connection.close(() => {
      console.log('You have been terminated! Hasta la vista baby!');
      process.exit(0);
    });