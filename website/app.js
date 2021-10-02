/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
// let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
let newDate = d.toDateString();

// Personal API Key for OpenWeatherMap API
const apiBaseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=fcf1358907314b3dfbe735387426845b&units=metric';
const server = 'http://localhost:8000';
const error = document.getElementById('error');

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', async () => {
	let apiData;
	const zip = document.getElementById('zip').value.trim();
	const feelings = document.getElementById('feelings').value;
	const makeUrl = apiBaseUrl + zip + apiKey;

	/* Functions called by event listener */

	/* Function to GET Web API Data*/
	await fetch(makeUrl)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			if (
				data.cod != 200 &&
				(data.message === 'city not found' ||
					data.message === 'invalid zip code')
			) {
				error.innerHTML = data.message;
				setTimeout(() => {
					error.innerHTML = '';
				}, 3000);
			} else if (
				data.cod != 200 &&
				data.message === 'Nothing to geocode'
			) {
				error.innerHTML = 'please enter valid zip code';
				setTimeout(() => {
					error.innerHTML = '';
				}, 3000);
			} else {
				apiData = data;
			}
		})
		.catch((err) => {
			console.log(err);
		});

	/* Function to POST data */
	const postData = async (url = '', info = {}) => {
		const resp = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(info),
		});

		try {
			const newData = await resp.json();
			return newData;
		} catch (erro) {
			console.log(erro);
		}
	};

	// function to display data in html
	const displayData = async () => {
		const respo = await fetch(server + '/all');
		try {
			const finalData = await respo.json();

			document.getElementById('temp').innerHTML =
				finalData.temp + '&degC';
			document.getElementById('city').innerHTML = finalData.city;
			document.getElementById('condition').innerHTML =
				document.getElementById('date').innerHTML =
					finalData.newDate;
			finalData.description;
			document.getElementById('content').innerHTML =
				finalData.feelings;
		} catch (er) {
			console.log(er);
		}
	};

	/*GET Project Data */
	if (apiData) {
		const {
			main: { temp },
			name: city,
			weather: [{ description }],
		} = apiData;

		const info = {
			newDate,
			city,
			temp: Math.round(temp),
			description,
			feelings,
		};

		postData(server + '/add', info);

		displayData();

		document.getElementById('entry').style.display = 'block';
	}
});
