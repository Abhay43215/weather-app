document.addEventListener('DOMContentLoaded', function() {
    // Toggle between Celsius and Fahrenheit
    const tempToggle = document.getElementById('temp-toggle');
    const tempDisplay = document.querySelector('.temp p');
    let isCelsius = false;
    
    tempToggle.addEventListener('change', function() {
        if (this.checked) {
            // Convert to Celsius
            isCelsius = true;
            const fahrenheit = parseInt(tempDisplay.innerText);
            const celsius = Math.round((fahrenheit - 32) * 5/9);
            tempDisplay.innerHTML = `${celsius}<sup>o</sup>C`;
        } else {
            // Convert to Fahrenheit
            isCelsius = false;
            const celsius = parseInt(tempDisplay.innerText);
            const fahrenheit = Math.round(celsius * 9/5 + 32);
            tempDisplay.innerHTML = `${fahrenheit}<sup>o</sup>F`;
        }
    });
    
    // Animation for search form
    const searchArea = document.querySelector('.search_area');
    
    searchArea.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.05)';
    });
    
    searchArea.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
    
    // Simulate weather loading on search
    const searchForm = document.querySelector('nav form');
    const weatherContainer = document.querySelector('.weather_container');
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchValue = searchArea.value.trim();
        
        if (searchValue) {
            // Add loading animation
            weatherContainer.style.opacity = '0.5';
            
            // Simulate API request delay
            setTimeout(() => {
                // Update UI with "new" weather data
                document.querySelector('.time_location p:first-child').textContent = searchValue;
                weatherContainer.style.opacity = '1';
                searchArea.value = '';
            }, 1000);
        }
    });
}); 