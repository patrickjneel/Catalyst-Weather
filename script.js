const clearInput = () => {
  $('.field').val('');
};

const fetchWeather = (e) => {
  e.preventDefault();
  console.log($('.field').val())
  clearInput();
}

$('.button').on('click', fetchWeather)
