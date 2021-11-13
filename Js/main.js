let url = "https://moviesmern.herokuapp.com/movies/all"

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



function displaySingleOnScreen(info) {
    moviesDisplaySec.innerHTML = " "
    moviesDisplayByRating.innerHTML = " "
    moviesDisplayById.innerHTML = " "
    moviesDisplayByName.innerHTML = " "
    console.log(info);
    movieLearnMore.innerHTML += `<div  class="singleMovieDiv" id="${info._id}" ><img src="${info.image}" width="300px" height="300px" alt="movieImg">
    <p>${info.movieName}</p><p>Rating:${info.rating}</p>
<p>synopsis:${info.synopsis}</p>
    <a href="${info.linkToMovie}" target="_blank">Movie's site</a><br>
    <br>
    <a href="./MoviesPage.html"><button id="backToAllButt">return to list</button></a>
    </div>`}


function displayAllInfoByRating(info) {
    info.data.sort(function (a, b) { return (b.rating) - (a.rating) })
    for (let inf of info.data) {
        moviesDisplaySec.innerHTML = " "
        moviesDisplayById.innerHTML = " "
        movieLearnMore.innerHTML = " "
        moviesDisplayByRating.innerHTML += `<div  class="moviesInfDiv" id="${inf._id}" ><img src="${inf.image}" width="300px" height="300px" alt="movieImg">
        <p>${inf.movieName}</p><p>Rating:${inf.rating}</p>
        <a href="${inf.linkToMovie}" target="_blank">Movie's site</a>
    <button id="moreInfo">more Info</button></a>
        </div>`
    }
}

function displayAllInfoByName(info) {
    info.data.sort((a, b) => (a.movieName.toLowerCase() > b.movieName.toLowerCase()) ? 1 : -1)
    for (let inf of info.data) {
        moviesDisplaySec.innerHTML = " "
        moviesDisplayByRating.innerHTML = " "
        moviesDisplayById.innerHTML = " "
        movieLearnMore.innerHTML = " "
        moviesDisplayByName.innerHTML += `<div  class="moviesInfDiv" id="${inf._id}" ><img src="${inf.image}" width="300px" height="300px" alt="movieImg">
        <p>${inf.movieName}</p><p>Rating:${inf.rating}</p>
        <a href="${inf.linkToMovie}" target="_blank">Movie's site</a>
        </div>`
    }
}

function displayAllInfoById(info) {
    console.log(info.data.sort((a, b) => (a.date > b.date) ? 1 : -1))
    for (let inf of info.data) {
        moviesDisplaySec.innerHTML = " "
        moviesDisplayByRating.innerHTML = " "
        moviesDisplayByName.innerHTML = " "
        movieLearnMore.innerHTML = " "
        moviesDisplayById.innerHTML += `<div  class="moviesInfDiv" id="${inf._id}" ><img src="${inf.image}" width="300px" height="300px" alt="movieImg">
        <p>${inf.movieName}</p><p>Rating:${inf.rating}</p>
        <a href="${inf.linkToMovie}" target="_blank">Movie's site</a>
        </div>`
    }
}

function displayAllInfoTable(info) {
    for (let inf of info.data) {
        moviesTable.innerHTML += `<tr>
    <th>movie name</th><td>${inf.movieName}</td>
    <th>rating</th><td>${inf.rating}</td>
    <th>synopsis</th><td>${inf.synopsis}</td>
    <th>id</th><td>${inf._id}</td>
    <th>image</th><td><img src="${inf.image}" width="200px" height="200px"></td>
    <th><a href="${inf.linkToMovie}" target="_blank">link to movie</a></th>
    </tr>`
    }
}


// getApiInfo(url).then((res) => { displayAllInfoTable(res) })
//     .catch((rej) => { console.log(rej); })
//     .finally(() => { waitGif.style.display = "none" });


orderForm.onsubmit = (event) => {
    event.preventDefault();
    switch (sortByThis.value) {
        case "rating": return getApiInfo(url).then((res) => { displayAllInfoByRating(res) })
            .catch((rej) => { console.log(rej); })
            .finally(() => { waitGif.style.display = "none" });


        case "movieName": return getApiInfo(url).then((res) => { displayAllInfoByName(res) })
            .catch((rej) => { console.log(rej); })
            .finally(() => { waitGif.style.display = "none" });


        case "_date": return getApiInfo(url).then((res) => { displayAllInfoById(res) })
            .catch((rej) => { console.log(rej); })
            .finally(() => { waitGif.style.display = "none" });

        default:

            break;
    }
}

async function searchByName(nameInput) {
    try {
        aWaitingGif()
        return await fetch(`https://moviesmern.herokuapp.com/movies/movie/searchByName/${nameInput}`)
            .then((response) => response.json());
    } catch (error) {
        return error;
    }
}

function searchWithName() {
    searchByName(searchByNameInput.value).then((res) => { displayOneMovieInfo(res); })
        .catch((rej) => { console.log(rej) })
        .finally(() => { waitGif.style.display = "none" });

}

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



// addForm.addEventListener("submit", addNewMovie);
// function addNewMovie(e) {
//     e.preventDefault();
//     let movie = new Movie(movieName.value, moviesPicture.value, moviesLink.value, movieSynopsis.value, movieRating.value);
//     console.log(movie);
//     const option = {
//         method: "POST",
//         body: JSON.stringify({ movie }),
//         headers: { "Content-Type": "application/json" },
//     };

//     getApiInfo(`https://moviesmern.herokuapp.com/movies/saveMovie`, option)
//         .then((res) => {
//             alert("movie added succesfully")
//             console.log(res);

//         })
//         .catch((rej) => {
//             alert("adding movie failed")
//             console.log(rej);

//         });
// }



function getMovieByID(id) {
    getApiInfo(`https://moviesmern.herokuapp.com/movies/movie/${id}`)
        .then((res) => { displaySingleOnScreen(res.data) })
        .catch((rej) => { console.log(rej); })
        .finally(() => { waitGif.style.display = "none" });
}

//! search area info


