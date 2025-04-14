# Weather App 

A beautiful, responsive weather application that displays real-time weather information for any location around the world. The app features a modern, glass-morphic UI with dynamic backgrounds that change based on weather conditions and time of day.


## Features

- **Real-time Weather Data**: Fetches current weather information using the OpenWeatherMap API
- **Location Search**: Search for weather by city name
- **Temperature Units**: Toggle between Celsius and Fahrenheit
- **Dynamic UI**: Background and visuals change based on:
  - Current weather conditions (rain, snow, clear, cloudy)
  - Time of day (day/night mode)
- **Responsive Design**: Works on all device sizes from mobile to desktop
- **Beautiful Animations**: Smooth transitions and subtle animations enhance the user experience
- **Weather Details**: Displays temperature, feels like, wind speed, humidity, and UV index
- **Error Handling**: Graceful error handling with helpful user feedback

## Technologies Used

- HTML5
- CSS3 (with animations and glassmorphism effects)
- JavaScript (ES6+)
- OpenWeatherMap API
- Font Awesome Icons
- Google Fonts

## Setup and Usage

1. **Clone or download** the project files to your local machine
2. **API Key Setup**: 
   - The app is already configured with an API key
   - For your own deployment, you can replace it with your own key from [OpenWeatherMap](https://openweathermap.org/api)
   - Edit the `API_KEY` variable in `script.js`
3. **Open `index.html`** in any modern web browser
4. **Search for a location** using the search bar
5. **Toggle temperature** units using the switch at the bottom

## API Usage

The app uses three main endpoints from OpenWeatherMap:

1. **Geocoding API**: Converts location names to coordinates
2. **Current Weather API**: Gets current weather data
3. **One Call API**: Used for additional data like UV index (requires separate subscription)

## Project Structure

- `index.html` - Main HTML structure
- `style.css` - Styling and animations
- `script.js` - JavaScript functionality and API calls
- `README.md` - This documentation file

## Customization

You can easily customize the app by:

- Modifying the color scheme in the CSS `:root` variables
- Changing the default location in `script.js`
- Adding additional weather metrics
- Customizing animations and transitions

## Browser Compatibility

The app works in all modern browsers including:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Future Enhancements

Potential features for future versions:
- Weather forecast for upcoming days
- Weather history charts
- User location detection
- More detailed weather information
- Weather alerts and notifications
- Saving favorite locations

## License

This project is open source and available for personal and educational use.

## Credits

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [Font Awesome](https://fontawesome.com/)
- Fonts by [Google Fonts](https://fonts.google.com/)

---

Created with ❤️ by Weather App 
