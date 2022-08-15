let weather = {
  apiKey: "bd48f414362f45369ed5755a328d6ffc",
  fetchWeather: function (city) {
    try{
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
            )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data))
    }catch(err){
        console.log('errcgghjd', err)
    } 
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind; 
    document.body.style.backgroundImage=`url("https://source.unsplash.com/1600x900/?${name}")` 
    document.querySelector(".search-bar").value = ""
    document.querySelector(".weather").classList.remove("loading");
    // selectors

    document.querySelector(".city").innerText = `Weather in ${name}`;
    document.querySelector(".icon").src = 
        `http://openweathermap.org/img/wn/${icon}.png`
    document.querySelector(".desription").innerText = description;
    document.querySelector(".temp").innerText = `${temp}°C`;
    document.querySelector(".humidity").innerText = `${humidity}%`;
    document.querySelector(".wind").innerText = ` Wind speed: ${speed} km/h`;
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value)
  }
};

document
    .querySelector(".search button")
    .addEventListener("click", function (){
        weather.search()
    });

document
    .querySelector(".search button")
    .addEventListener("keyup", function(event){
        if(event.key == "Enter"){
            weather.search()
        }
    })

weather.fetchWeather("Tbilisi")