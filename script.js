const container = document.querySelector('.container');
const searchButton = document.querySelector('.searchbox button');
const searchInput = document.querySelector('.searchbox input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

// Initially hide weather details and set container size
container.style.width = '400px';
container.style.height = '120px';
weatherDetails.classList.remove('show');

// Function to perform the search
const performSearch = () => {
    const APIKey = '23bc7eda0ac12613245e2ee41a5b8c8a';
    const city = searchInput.value.trim();

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (json.cod === '404') {
                // City not found, use 404 image
                image.src = 'images/404.png';
                temperature.innerHTML = '';
                description.innerHTML = 'City not found';
                humidity.innerHTML = '';
                wind.innerHTML = '';
                return;
            }

            // Mapping weather conditions to the 5 general icons
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Clouds':
                case 'Haze':
                case 'Fog':
                case 'Smoke':
                case 'Dust':
                case 'Sand':
                case 'Ash':
                case 'Squall':
                case 'Tornado':
                case 'Windy':
                case 'Overcast':
                    image.src = 'images/cloud.png';
                    break;
                case 'Mist':
                    image.src = 'images/mist.png';
                    break;
                case 'Rain':
                case 'Drizzle':
                case 'Thunderstorm':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                default:
                    image.src = 'images/cloud.png'; // Default to cloud if no match
            }

            // Update the weather details
            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${Math.round(json.wind.speed)} Km/h`;

            // Expand the container to show weather details
            container.style.width = '400px';
            container.style.height = '555px'; // Adjust as needed
            weatherBox.style.display = 'flex';
            weatherDetails.classList.add('show'); // Use class to show details
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            // Optionally handle network errors or other issues
        });
};

// Event listener for search button click
searchButton.addEventListener('click', performSearch);

// Event listener for Enter key press
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    }
});
