const fs = require('fs');

const save = (updatedArr) => {
    let stringyObj = JSON.stringify(updatedArr)
    fs.writeFileSync('./netflix.json', stringyObj)
}

exports.add = (movieListArr, input) => {
    let movieObj = {movie: input};
    movieListArr.push(movieObj);
    save(movieListArr)
}

exports.deleteMovie = (movieListArr, input) => {
    let spliceIndex;
    movieListArr.map((movie, index) => {
        if (movie.movie === input) {
            spliceIndex = index
        }
    })
    if (spliceIndex >= 0) {
        movieListArr.splice(spliceIndex, 1);
        save(movieListArr)
    } else {
        console.log("Movie doesn't exist")
    }
    
}

exports.updateMovie = (movieListArr, input, updateInput) => {
    let spliceIndex;
    movieListArr.map((movie, index) => {
        if (movie.movie === input) {
            spliceIndex = index;
        }
    })
    try {
        movieListArr[spliceIndex].movie = updateInput;
        save(movieListArr);
    } catch (error) {
        console.log("Movie doesn't exist");
    }
    
}