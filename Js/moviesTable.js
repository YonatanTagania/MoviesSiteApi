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

getApiInfo(url).then((res) => { displayAllInfoTable(res) })
    .catch((rej) => { console.log(rej); })
    .finally(() => { waitGif.style.display = "none" });

    