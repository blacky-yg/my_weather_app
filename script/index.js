let appKey = "1053611b0afa04a52917542a549de5ec"
let units = "imperial"
let searchMethod

function getSearchMethod(search) {
    if (search.length === 5 && Number.parseInt(search) + '' === search)
        searchMethod = 'zip'
    else
        searchMethod = 'q'
}

function searchWeather(search) {
    getSearchMethod(search)
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${search}&APPID=${appKey}&units=${units}`).then(result => {
        return result.json()
    }).then(result => {
        init(result)
    })
}

function init(ServerResult) {
    // switch (ServerResult.weather[0].main) {
    //     case 'Clear':
    //         document.body.style.backgroundImage = 'url()'
    //         break;

    //     case 'Clouds':
    //         document.body.style.backgroundImage = 'url("clear.jpg")'
    //         break;

    //     case 'Rain':
    //     case 'Drizzle':
    //     case 'Mist':
    //         break;

    //     case 'Thunderstorm':
    //         break;

    //     case 'Snow':
    //         break;

    //     default:
    //         break;
    // }
    let weatherDesc = document.getElementById('weather-desc-header')
    let temp = document.getElementById('temperature')
    let humidity = document.getElementById('humidity')
    let speed = document.getElementById('wind-speed')
    let city = document.getElementById('city-name')
    let weatherIcon = document.getElementById('doc-icon')
    weatherIcon.src = 'http://openweathermap.org/img/wn/' +  ServerResult.weather[0].icon + '.png'  
    let resultDescription = ServerResult.weather[0].description
    weatherDesc.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1)
    temp.innerHTML = Math.floor(ServerResult.main.temp) + '&#176'
    speed.innerHTML = 'Winds at ' + Math.floor(ServerResult.wind.speed) + ' m/s'
    city.innerHTML = ServerResult.name
    humidity.innerHTML = 'Humidity Level at ' + ServerResult.main.humidity + '%'
    setPosition()
}

function setPosition() {
    let weatherContainer = document.getElementById('weather-container')
    let weatherContainerHeight = weatherContainer.clientHeight
    let weatherContainerWidth = weatherContainer.clientWidth
    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`
    weatherContainer.style.top = `calc(50% - ${weatherContainerWidth/1.3}px)`
    weatherContainer.style.visibility = 'visible'
}

document.getElementById('search-btn').addEventListener('click', () => {
    let search = document.getElementById('search-input').value
    if (search) {
        searchWeather(search)
    }
})