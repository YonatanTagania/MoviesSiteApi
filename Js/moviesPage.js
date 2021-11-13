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

function displayAllInfo(info) {
    for (let inf of info.data) {
        moviesDisplaySec.innerHTML += `<div class="moviesInfDiv" id="${inf._id}"><img src="${inf.image}" width="300px" height="300px" alt="movieImg">
        <p>${inf.movieName}</p><p>Rating:${inf.rating}</p>
        <a href="${inf.linkToMovie}" target="_blank">Movie's site</a><br>
    <button onclick=getMovieByID("${inf._id}") id="moreInfo">more Info</button></a>
    <br>
    <button onclick=deleteWithId("${inf._id}") id="deleteInfo">delete movie</button></a>
    <button onclick=displayEditForm("${inf._id}") id="editInf">edit movie</button></a>
        </div>`
    }
}

getApiInfo(url).then((res) => { displayAllInfo(res) })
    .catch((rej) => { console.log(rej); })
    .finally(() => { waitGif.style.display = "none" });




function displayAllInfoByRating(info) {
    info.data.sort(function (a, b) { return (b.rating) - (a.rating) })
    for (let inf of info.data) {
        moviesDisplaySec.innerHTML = " "
        moviesDisplayById.innerHTML = " "
        movieLearnMore.innerHTML = " "
        moviesDisplayByRating.innerHTML += `<div  class="moviesInfDiv" id="${inf._id}" ><img src="${inf.image}" width="300px" height="300px" alt="movieImg">
        <p>${inf.movieName}</p><p>Rating:${inf.rating}</p>
        <a href="${inf.linkToMovie}" target="_blank">Movie's site</a>
        <button onclick=getMovieByID("${inf._id}") id="moreInfo">more Info</button></a>
        <br>
        <button onclick=deleteWithId("${inf._id}") id="deleteInfo">delete movie</button></a>
        <button onclick=displayEditForm("${inf._id}") id="editInf">edit movie</button></a>
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
        <button onclick=getMovieByID("${inf._id}") id="moreInfo">more Info</button></a>
        <br>
        <button onclick=deleteWithId("${inf._id}") id="deleteInfo">delete movie</button></a>
        <button onclick=displayEditForm("${inf._id}") id="editInf">edit movie</button></a>
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
        <button onclick=getMovieByID("${inf._id}") id="moreInfo">more Info</button></a>
        <br>
        <button onclick=deleteWithId("${inf._id}") id="deleteInfo">delete movie</button></a>
        <button onclick=displayEditForm("${inf._id}") id="editInf">edit movie</button></a>
        </div>`
    }
}


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

function displayEditForm(id, event) {
    moviesDisplaySec.innerHTML = " "
    moviesDisplayByRating.innerHTML = " "
    moviesDisplayById.innerHTML = " "
    movieLearnMore.innerHTML = " "
    moviesDisplayByName.innerHTML = " "
    movieEditSec.innerHTML = `<section id="moviesEditForm">
    <form id="editForm" onsubmit=editMovieFunc("${id}")>
        <h3>edit a movie</h3>
        <label for="fname">movie name:</label><br>
        <input type="text" id="movieName"><br>
        <label for="lname">movie picture:</label><br>
        <input type="text" id="moviesPicture"><br>
        <label for="lname">movie link:</label><br>
        <input type="text" id="moviesLink"><br>
        <label for="fname">movie Synopsis:</label><br>
        <input type="text" id="movieSynopsis"><br>
        <label for="lname">movie Rating:</label><br>
        <input type="text" id="movieRating">
        <br>
        <button type="submit" id="editAMovie">edit movie!</button>
    </form>
</section>`
}


function editMovieFunc(id, event) {
    event.preventDefault()
    let movie = new Movie(movieName.value, moviesPicture.value, moviesLink.value, movieSynopsis.value, movieRating.value);
    movie["id"] = id
    console.log(movie);
    const option = {
        method: "PUT",
        body: JSON.stringify({ movie }),
        headers: { "Content-Type": "application/json" },
        id: id,
    };
    getApiInfo(`https://moviesmern.herokuapp.com/movies/movie/${id}`, option)
        .then((res) => {
            alert("movie edited succesfully")
            console.log(res);
        })
        .catch((rej) => {
            alert("editing movie failed")
            console.log(rej);
        });
}

function deleteWithId(id) {
    const option = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    };
    getApiInfo(`https://moviesmern.herokuapp.com/movies/movie/${id}`, option)
        .then((res) => {
            alert("movie removed succesfully")
            console.log(res);
        })
        .catch((rej) => {
            alert("removing movie failed")
            console.log(rej);
        });
}


function getMovieByID(id) {
    getApiInfo(`https://moviesmern.herokuapp.com/movies/movie/${id}`)
        .then((res) => { displaySingleOnScreen(res.data) })
        .catch((rej) => { console.log(rej); })
        .finally(() => { waitGif.style.display = "none" });
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

