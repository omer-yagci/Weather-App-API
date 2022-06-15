const ınputValue = document.querySelector("#weather-input");
const button = document.querySelector(".btn-search");
const container = document.querySelector(".weather-container");

button.addEventListener("click", (event) => {
  event.preventDefault();
  const getWeatherData = async () => {
    if (
      container.innerHTML.toLowerCase().includes(ınputValue.value.toLowerCase())
    ) {
      alert(ınputValue.value + " already written data");
    } else {
      try {
        const key = "07ccc6c8229f822f8f5f8dbbc0bfbc92";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ınputValue.value}&units=metric&APPID=${key}`;
        let res = await fetch(url);
        let data = await res.json();
        // console.log(data);
        createWeaterData(data);
      } catch (error) {
        alert(error);
      }
    }
  };

  const createWeaterData = (data) => {
    let { name } = data;
    let { temp } = data.main;
    let { icon, description } = data.weather[0];
    let { country } = data.sys;
    const weatherEl = document.createElement("div");
    weatherEl.classList.add("weather-box");

    weatherEl.innerHTML = `
    <h4 class="city-name">
         ${name} <span> <sup>${country}</sup></span>
        </h4>
        <p class="degree">
        ${temp.toFixed()} <span><sup>°C</sup></span>
        </p>
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" </img>
        <p class="weather-type">${
          description.toLowerCase().charAt(0).toUpperCase() +
          description.slice(1)
        }</p>
    `;
    container.appendChild(weatherEl);
    ınputValue.value = "";
  };

  getWeatherData();
});
