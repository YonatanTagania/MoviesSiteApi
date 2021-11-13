let url = "https://moviesmern.herokuapp.com/movies/all"

class Movie {
    movieName
    image
    linkToMovie
    synopsis
    rating
    constructor(movieName, image, synopsis, linkToMovie, rating) {
        this.movieName = movieName
        this.image = image
        this.synopsis = synopsis
        this.linkToMovie = linkToMovie
        this.rating = rating
    }
}


function aWaitingGif() {
    infoDiv.innerHTML = `<center><img id="waitGif" src="../images/waitingGif.gif" width="400px" height="500p"></center>`
}

async function getApiInfo(api, options) {
    try {
        aWaitingGif()
        return await fetch(api, options)
            .then(response => response.json())
    }
    catch (error) {
        return error
    }
}

addForm.addEventListener("submit", addNewMovie);
function addNewMovie(e) {
    e.preventDefault();
    let movie = new Movie(movieName.value, moviesPicture.value, moviesLink.value, movieSynopsis.value, movieRating.value);
    console.log(movie);
    const option = {
        method: "POST",
        body: JSON.stringify({ movie }),
        headers: { "Content-Type": "application/json" },
    };

    getApiInfo(`https://moviesmern.herokuapp.com/movies/saveMovie`, option)
        .then((res) => {
            alert("movie added succesfully")
            console.log(res);

        })
        .catch((rej) => {
            alert("adding movie failed")
            console.log(rej);

        })
        .finally(() => { waitGif.style.display = "none" });
}
