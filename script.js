
    document.addEventListener('DOMContentLoaded', function() {
        // API key for OpenWeatherMap - replace with your own after signing up
        const API_KEY = '915222bd8cbbe83142a18c7fd3965904'; // Sign up at https://openweathermap.org/api
        
        // DOM Elements
        const searchForm = document.querySelector('nav form');
        const searchArea = document.querySelector('.search_area');
        const weatherContainer = document.querySelector('.weather_container');
        const tempDisplay = document.querySelector('.temp p');
        const tempToggle = document.getElementById('temp-toggle');
        const locationDisplay = document.querySelector('.time_location h2');
        const timeLocationDisplay = document.querySelector('.time_location p');
        const feelsLikeDisplay = document.querySelector('.condition p:first-child');
        const conditionDisplay = document.querySelector('.weather-description');
        const windDisplay = document.querySelector('.detail:nth-child(1) .detail-value');
        const humidityDisplay = document.querySelector('.detail:nth-child(2) .detail-value');
        const uvDisplay = document.querySelector('.detail:nth-child(3) .detail-value');
        const weatherIcon = document.querySelector('.weather-icon i');
        const clouds = document.querySelectorAll('.cloud');
        
        // Current temperature unit state
        let isCelsius = false;
        let currentTemp = 20; // Default temp
        
        // Add background animation
        animateBackground();
        
        // Toggle between Celsius and Fahrenheit
        tempToggle.addEventListener('change', function() {
            if (this.checked) {
                // Convert to Celsius
                isCelsius = true;
                if (!isNaN(currentTemp)) {
                    const celsius = Math.round((currentTemp - 32) * 5/9);
                    tempDisplay.innerHTML = `${celsius}<sup>o</sup>C`;
                    
                    // Update feels like temperature too
                    const feelsLikeText = feelsLikeDisplay.textContent;
                    const feelsLikeTemp = parseInt(feelsLikeText.match(/\d+/));
                    if (!isNaN(feelsLikeTemp)) {
                        const feelsCelsius = Math.round((feelsLikeTemp - 32) * 5/9);
                        feelsLikeDisplay.textContent = `Feels like: ${feelsCelsius}°C`;
                    }
                }
            } else {
                // Convert to Fahrenheit
                isCelsius = false;
                if (!isNaN(currentTemp)) {
                    tempDisplay.innerHTML = `${currentTemp}<sup>o</sup>F`;
                    
                    // Update feels like temperature too
                    const feelsLikeText = feelsLikeDisplay.textContent;
                    const feelsLikeTemp = parseInt(feelsLikeText.match(/\d+/));
                    if (!isNaN(feelsLikeTemp)) {
                        const feelsLikeFahrenheit = feelsLikeTemp;
                        feelsLikeDisplay.textContent = `Feels like: ${feelsLikeFahrenheit}°F`;
                    }
                }
            }
        });
        
        // Animation for search form
        searchArea.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.05)';
            this.parentElement.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.3)';
        });
        
        searchArea.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
            this.parentElement.style.boxShadow = 'none';
        });
        
        // Function to animate background elements
        function animateBackground() {
            // Randomize cloud positions and animations
            clouds.forEach(cloud => {
                const randomDelay = Math.random() * 10;
                const randomDuration = 15 + Math.random() * 10;
                
                cloud.style.animationDelay = `${randomDelay}s`;
                cloud.style.animationDuration = `${randomDuration}s`;
            });
        }
        
        // Get weather data for a location
        async function getWeatherData(location) {
            // Show loading effect
            weatherContainer.style.opacity = '0.5';
            // Update the condition text to show loading
            conditionDisplay.textContent = 'Loading...';
            
            try {
                // Get coordinates first (geocoding)
                const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`);
                const geoData = await geoResponse.json();
                
                // If geocoding successful, use coordinates
                if (geoData && geoData.length > 0) {
                    const { lat, lon } = geoData[0];
                    
                    // Get weather data using coordinates
                    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`);
                    const weatherData = await weatherResponse.json();
                    
                    // Try to get UV index data (might require separate subscription)
                    let uvIndex = null;
                    try {
                        const oneCallResponse = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=imperial&appid=${API_KEY}`);
                        const oneCallData = await oneCallResponse.json();
                        if (oneCallData && oneCallData.current) {
                            uvIndex = oneCallData.current.uvi;
                        }
                    } catch (uvError) {
                        console.log('UV index data not available:', uvError);
                        // Continue without UV data
                    }
                    
                    // Add animation effect
                    addLoadingAnimation();
                    
                    // Update UI with real weather data
                    updateWeatherUI(weatherData, geoData[0].name, uvIndex);
                } else {
                    // Fallback: Try to get weather directly by city name
                    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API_KEY}`);
                    const weatherData = await weatherResponse.json();
                    
                    if (weatherData.cod === 200) {
                        // Add animation effect
                        addLoadingAnimation();
                        
                        updateWeatherUI(weatherData, weatherData.name, null);
                    } else {
                        throw new Error('Location not found');
                    }
                }
                
            } catch (error) {
                console.error('Error fetching weather data:', error);
                
                // Display specific error message based on error type
                if (error.message.includes('Location not found')) {
                    alert('Location not found. Please try a different city name.');
                } else if (error.message.includes('Network')) {
                    alert('Network error. Please check your internet connection.');
                } else {
                    alert('Failed to fetch weather data. Please try again later.');
                }
                
                // Reset condition text if error occurs
                conditionDisplay.textContent = 'Data unavailable';
            }
            
            // Restore opacity regardless of success or failure
            weatherContainer.style.opacity = '1';
        }
        
        // Add animation during weather updates
        function addLoadingAnimation() {
            // Get all elements to animate
            const elements = [
                tempDisplay,
                locationDisplay,
                timeLocationDisplay,
                feelsLikeDisplay,
                conditionDisplay,
                document.querySelectorAll('.detail')
            ];
            
            // Add fade-out and fade-in animation
            elements.forEach(el => {
                if (NodeList.prototype.isPrototypeOf(el)) {
                    // Handle NodeList (like detail elements)
                    el.forEach(item => {
                        item.style.transition = 'opacity 0.5s ease';
                        item.style.opacity = '0';
                        
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 500);
                    });
                } else if (el) {
                    // Handle single element
                    el.style.transition = 'opacity 0.5s ease';
                    el.style.opacity = '0';
                    
                    setTimeout(() => {
                        el.style.opacity = '1';
                    }, 500);
                }
            });
        }
        
        // Update UI with weather data
        function updateWeatherUI(data, locationName, uvIndex = null) {
            // Update temperature
            currentTemp = Math.round(data.main.temp);
            if (isCelsius) {
                const celsius = Math.round((currentTemp - 32) * 5/9);
                tempDisplay.innerHTML = `${celsius}<sup>o</sup>C`;
            } else {
                tempDisplay.innerHTML = `${currentTemp}<sup>o</sup>F`;
            }
            
            // Update location and time
            locationDisplay.textContent = locationName;
            
            const now = new Date();
            const options = { weekday: 'long', hour: 'numeric', minute: 'numeric' };
            const dateStr = `${now.toLocaleTimeString('en-US', options)} <br>${now.toISOString().split('T')[0]}`;
            timeLocationDisplay.innerHTML = dateStr;
            
            // Update feels like and condition
            const feelsLike = Math.round(data.main.feels_like);
            if (isCelsius) {
                const feelsCelsius = Math.round((feelsLike - 32) * 5/9);
                feelsLikeDisplay.textContent = `Feels like: ${feelsCelsius}°C`;
            } else {
                feelsLikeDisplay.textContent = `Feels like: ${feelsLike}°F`;
            }
            conditionDisplay.textContent = data.weather[0].description;
            
            // Update weather details
            windDisplay.textContent = `${Math.round(data.wind.speed)} mph`;
            humidityDisplay.textContent = `${data.main.humidity}%`;
            
            // UV index (might be null if API doesn't provide it)
            uvDisplay.textContent = uvIndex !== null ? `UV: ${uvIndex}` : 'UV: N/A';
            
            // Update weather icon based on condition
            setWeatherIcon(data.weather[0].id);
            
            // Update background based on weather (daytime or nighttime)
            updateBackgroundBasedOnWeather(data);
        }
        
        // Set weather icon based on condition code
        function setWeatherIcon(conditionCode) {
            // Remove all existing classes except 'fas'
            weatherIcon.className = 'fas';
            
            // Add appropriate icon class based on condition code
            // See https://openweathermap.org/weather-conditions for codes
            if (conditionCode >= 200 && conditionCode < 300) {
                weatherIcon.classList.add('fa-bolt'); // Thunderstorm
            } else if (conditionCode >= 300 && conditionCode < 400) {
                weatherIcon.classList.add('fa-cloud-rain'); // Drizzle
            } else if (conditionCode >= 500 && conditionCode < 600) {
                weatherIcon.classList.add('fa-cloud-showers-heavy'); // Rain
            } else if (conditionCode >= 600 && conditionCode < 700) {
                weatherIcon.classList.add('fa-snowflake'); // Snow
            } else if (conditionCode >= 700 && conditionCode < 800) {
                weatherIcon.classList.add('fa-smog'); // Atmosphere
            } else if (conditionCode === 800) {
                weatherIcon.classList.add('fa-sun'); // Clear
            } else if (conditionCode > 800) {
                weatherIcon.classList.add('fa-cloud-sun'); // Clouds
            }
        }
        
        // Update background based on weather condition and time
        function updateBackgroundBasedOnWeather(data) {
            const container = document.querySelector('.container');
            const isNight = isNightTime(data.sys.sunrise, data.sys.sunset);
            const weatherId = data.weather[0].id;
            
            // Reset classes
            container.className = 'container';
            
            // Add time-based class
            container.classList.add(isNight ? 'night-mode' : 'day-mode');
            
            // Add weather-based class
            if (weatherId >= 200 && weatherId < 600) {
                container.classList.add('rainy');
            } else if (weatherId >= 600 && weatherId < 700) {
                container.classList.add('snowy');
            } else if (weatherId === 800) {
                container.classList.add('clear');
            } else if (weatherId > 800) {
                container.classList.add('cloudy');
            }
        }
        
        // Check if it's night time based on sunrise and sunset
        function isNightTime(sunrise, sunset) {
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            return currentTime < sunrise || currentTime > sunset;
        }
        
        // Handle search form submission
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchValue = searchArea.value.trim();
            
            if (searchValue) {
                getWeatherData(searchValue);
                searchArea.value = '';
                searchArea.blur(); // Remove focus from input
            }
        });
        
        // Load default location on page load
        getWeatherData('Delhi');
    }); 