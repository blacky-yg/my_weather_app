const api = {
    key: "1053611b0afa04a52917542a549de5ec",
    base: "https://api.openweathermap.org/data/2.5/",
    method: ''
}

document.getElementById('search-btn').addEventListener('click', () => {
    let search = document.getElementById('search-input').value
    if (search)
        searchWeather(search)
})

function getMethod(location) {
    if (location.length === 5 && Number.parseInt(location) + '' === location)
        api.method = 'zip'
    else
        api.method = 'q'
}

function searchWeather(location) {
    getMethod(location)
    fetch(`${api.base}weather?${api.method}=${location}&APPID=${api.key}&units=imperial`).then(result => {
        return result.json()
    }).then(result => {
        setWeather(result)
    })
}

function setWeather(ServerResult) {
    let weatherDescription = document.getElementById('weather-desc-header')
    let temp = document.getElementById('temp')
    let humidity = document.getElementById('humidity')
    let speed = document.getElementById('wind-speed')
    let city = document.getElementById('location')
    let weatherIcon = document.getElementById('icon')
    let resultDescription = ServerResult.weather[0].description

    if (ServerResult.weather[0].main.temp > 16)
        document.body.style.backgroundImage = 'url("../images/cold-bg.jpg")'
    else
        document.body.style.backgroundImage = 'url("../images/warm-bg.jpg")'
    weatherDescription.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1)
    temp.innerHTML = Math.floor(ServerResult.main.temp) + '&#176'
    humidity.innerHTML = 'Humidity Level at ' + ServerResult.main.humidity + '%'
    speed.innerHTML = 'Winds at ' + Math.floor(ServerResult.wind.speed) + ' m/s'
    city.innerHTML = ServerResult.name
    weatherIcon.src = 'http://openweathermap.org/img/wn/' +  ServerResult.weather[0].icon + '.png'
    setPosition()
}

function setPosition() {
    let weatherContainer = document.getElementById('weather-container')
    let weatherContainerWidth = weatherContainer.clientWidth
    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`
    weatherContainer.style.top = `calc(50% - ${weatherContainerWidth/1.3}px)`
    weatherContainer.style.visibility = 'visible'
}