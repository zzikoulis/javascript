/* LISTENER */
$(document).ready(function() {

    var debounceTimeout = null
    // calls the service
    $('#searchInput').on('input', function() {
        clearTimeout(debounceTimeout)
        debounceTimeout = setTimeout(() => getMoviePoster(this.value.trim()), 1500)
    })
})

/* SERVICE */
function getMoviePoster(movieTitle) {
    hideImage()
    hideError()
    hideNoPosterError()

    $("#searchInput").val("")
    if(!movieTitle) {
        return
    }
    // calls the CRUD method
    fetchPoster(movieTitle)
}

/* CRUD */
function fetchPoster(movieTitle) {
    let ajaxRequest = new XMLHttpRequest()
    
    ajaxRequest.open('GET', `https://www.omdbapi.com/?t=${movieTitle}&apiKey=APIKEY`, true)
    
    ajaxRequest.timeout = 5000
    ajaxRequest.ontimeout = (e) => onApiError()

    ajaxRequest.onreadystatechange = function() {
        if (ajaxRequest.readyState === 4) { 
            if (ajaxRequest.status === 200) {
                handleResults(JSON.parse(ajaxRequest.responseText)) // calls the handler
            } else {
                onApiError()
            }
        }
    }

    ajaxRequest.send()
}

/* HANDLER */
function handleResults(results) {

    if (results.Response === "False") {
        showError()
        return
    }

    if (results.Poster === "N/A") {
        showNoPosterError()
        return
    }
    
    let poster = results.Poster
    // calls the builder
    buildResults(poster)
}

/* BUILDER */
function buildResults(poster) {
    $('.result-div').find('.search-img').attr("src", `${poster}`)
        .removeClass("hidden")

}

function onApiError() {
    console.log("Error on API")
}

/* CLEAR METHODS */
function hideImage() {
    $('.result-div').find('.search-img').addClass("hidden").attr("src", "")
}

function hideError() {
    $('.result-div').find('.not-found').addClass("hidden")
}

function hideNoPosterError() {
    $('.result-div').find('.not-poster').addClass("hidden")
}

function showError() {
    $('.result-div').find('.not-found').removeClass("hidden")
}

function showNoPosterError() {
    $('.result-div').find('.not-poster').removeClass("hidden")
}