
function aWaitingGif() {
    infoDiv.innerHTML = `<center><img id="waitGif" src="../images/waitingGif.gif" width="400px" height="500p"></center>`
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


function displayOneMovieInfo(info) {
    for (let inf of info.data) {
        console.log(info.data);
        oneMoviesDisplaySec.innerHTML += `<div class="moviesInfDiv" id="${inf._id}"><img src="${inf.image}" width="300px" height="300px" alt="movieImg">
    <p>${inf.movieName}</p><p>Rating:${inf.rating}</p>
    <a href="${inf.linkToMovie}" target="_blank">Movie's site</a>

    </div>`
    }
}

function searchWithName() {
    searchByName(searchByNameInput.value).then((res) => { displayOneMovieInfo(res); })
        .catch((rej) => { console.log(rej) })
        .finally(() => { waitGif.style.display = "none" });

}