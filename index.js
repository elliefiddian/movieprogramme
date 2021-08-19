
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
//const fs = require("fs");
//const { add, deleteMovie, updateMovie } = require("./utils");
require("dotenv").config();
const mongoose = require("mongoose");
const connectionstring = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}`

mongoose.connect(
  connectionstring,
  { useNewUrlParser: true, useUnifiedTopology: true},
); // need this for mongoose set-up, keys and processes in env file map up to the process.env things

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("Connected to mongo");
});
// need this to check if have connection and is running 

const Movie = mongoose.model(
  "Movie", 
  { 
    title: {
      type: String,
      required: true 
  }, 
  
    release: { 
      type: Number 
  },

    genre: { 
      type: String
},

    rating: { 
      type: Number
},

    length: {
      type: Number 

},

    director: { 
    type: String 
},

} 
); 

  const main = async () => {     
    if (argv.add) {
        await createMovie(argv.title, argv.release, argv.genre, argv.rating, argv.length, argv.director); 
    } else if (argv.find) {
        await findMovie(argv.tite);
    } else if (argv.findall) {
        await findAll();
    } else if (argv.findrelease) {
        await findByRelease(argv.release);
    } else if (argv.findgenre) {
        await findByGenre(argv.genre);
    } else if (argv.findrating) {
        await findByRating(argv.rating);
    } else if (argv.findlength) {
        await findByLength(argv.length);
    } else if (argv.finddirector) {
        await findByDirector(argv.director);
    } else if (argv.updatename) {
        await updateMovieTitle(argv.updatetitle, argv.newtitle);
    } else if (argv.updaterelease) {
        await updateMovieRelease(argv.title, argv.newrelease);
    }
    process.exit();
  } 


// create movie 
  const createMovie= async(title, release,genre,rating,length,director) => {
    const newMovie = new Movie({title, release, genre, rating, length, director});
    await newMovie.save ();
    console.log(newMovie); 
  }; 

  //read/find title 
  const findMovie = async (title) => {
    const movieFindTitle = await Movie.find({title});
    console.log(movieFindTitle); 
  }

//read/find all movies?
  const findAll = aysnc () => {
  const movieFindAll = await Movie.find({}); 
   console.log(movieFindAll); 
}

//read/find release 
const findByRelease = aysnc (release) => {
  const movieFindRelease = await Movie.find({release});
  console.log(movieFindRelease); 
}
  
//read/find genre 
const findByGenre = aysnc (genre) => {
  const movieFindByGenre = await Movie.find({genre});
  console.log(movieFindByGenre);
  }

//read/find rating 
const findByRating = aysnc (rating) => {
  const movieFindByRating = await Movie.find({rating}); 
  console.log(movieFindByRating);
  }

//read/find length 
const findByLength = aysnc (length) => {
  const movieFindByLength = await Movie.length({length});
  console.log(movieFindByLength);
  }

//read/find director 
const findByDirector = aysnc (director) => {
  const movieFindByDirector = await Movie.director({director});
  console.log(movieFindByDirector); 
  }

  //update movie title 
const updateMovieTitle= aysnc (updateTitle, newTitle) => {
  const movieUpdateTitle = await Movie.updateOne({title: updateTitle}, {$set:{title: newTitle}}); 
  console.log(movieUpdateTitle); 
}

//update movie release 
const updateMovieRelease = aysnc (title, newRelease) => {
  const movieUpdateRelease = await Movie.updateOne({title: title}, {$set:{release: newRelease}}); 
  console.log(movieUpdateRelease); 
} 

// delete movie 
const deleteMovie = aysnc (title) => {
  const movieDelete = await Movie.deleteOne({title});
  console.log(movieDelete)
} 

main();



// const app = () => {
//   let movieListArr;
//   try {
//     movieListArr = JSON.parse(fs.readFileSync("./netflix.json"));
//   } catch (error) {
//     movieListArr = [];
//   }

//   if (argv.add) {
//     add(movieListArr, argv.add);
//   } else if (argv.delete) {
//     deleteMovie(movieListArr, argv.delete);
//   } else if (argv.edit) {
//     updateMovie(movieListArr, argv.edit, argv.info);
//   } else {
//     console.log("Invalid option");
//   }
// };

// app();
// process.exit();
