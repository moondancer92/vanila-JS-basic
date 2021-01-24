const weather = document.querySelector(".js-weather");

const API_key = "163cc7285381e359cf74c1cb4ec3f7d0";
const COORDS = "coords";

function getWeather(lat, lng) {
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_key}&units=metric`
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (json) {
			console.log(json);
			const temperature = json.main.temp;
			const place = json.name;
			const tenki = json.weather[0].description;
			weather.innerText = `${tenki}  ${temperature} @ ${place}`;
		});
}

function saveCoords(coordObj) {
	localStorage.setItem(COORDS, JSON.stringify(coordObj));
}

function handleGeoSucces(position) {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordObj = {
		latitude,
		longitude,
	};
	saveCoords(coordObj);
	getWeather(latitude, longitude);
}

function handleGeoError() {
	console.log("cant access geo location");
}

function askForCoords() {
	navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
	const loadedCoords = localStorage.getItem(COORDS);
	if (loadedCoords === null) {
		askForCoords();
	} else {
		const parsedCoords = JSON.parse(loadedCoords);
		getWeather(parsedCoords.latitude, parsedCoords.longitude);
	}
}

function init() {
	loadCoords();
}

init();
