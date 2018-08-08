const clearInput = () => {
  $('.field').val('');
};

const fetchWeather = async (e) => {
  e.preventDefault();
  const zipCode = $('.field').val();
  const fetchData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&appid=2ef1600da6ac3da492e419f46a52a671`);
  const weatherData = await fetchData.json();

  if($('.weather-card').length !== 0) {
    $('.weather-card').remove()
  }
  showLocation(weatherData.city.name, weatherData.city.country);
  forecast(weatherData.list);
  clearInput();
};

const showLocation = (cityName, countryName) => {
  $('.city-info').html(`<div class="location">${cityName}, ${countryName}</div>`);
};

const forecast = (array) => {
  array.forEach(day => {
    const timeAndDay = day.dt_txt.split(' ').reverse();
    const timeOfDay = timeAndDay[0].slice(0, -3);
    const dayOfWeek = timeAndDay[1].slice(-5).split('-').join('-');
    const temp = day.main.temp * (9 / 5) - 459.67;
    const icon = `http://openweathermap.org/img/w/${day.weather[0].icon}.png`;
    $('.weather-data').append(`
        <div class="weather-card">
          <div>Day: ${dayOfWeek}</div>
          <div>Time: ${timeOfDay}</div>
          <img src="${icon}" alt="weather-icon">
          <div>Temp: ${temp.toString().slice(0, 2)} F</div>
          <div>${day.weather[0].description}</div>
        </div>
      `)
  })
}

$('.button').on('click', fetchWeather);
