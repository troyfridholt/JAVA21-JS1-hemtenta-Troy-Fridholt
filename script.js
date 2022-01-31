
const KEY = `d764aaab5f834e948ed26fdf55e7f049`;


const btn_search_weather = document.querySelector('button');
const inp_city = document.querySelector('input');

btn_search_weather.addEventListener('click', e => removeOldSearch()); 
btn_search_weather.addEventListener('click', e => getCurrentWeather(inp_city.value, KEY));


function getCurrentWeather(city, key){
  
    const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${key}&lang=sv`;

    fetch(url) 
    .then(responseFunction) 
    .then(getWeather) 
    .catch(errorFunction); 
}

function responseFunction(resp){

    if(resp.status>=200 && resp.status<300){
        return resp.json();
    }
    else{
        displayErrorMsg(resp.status);
        throw 'Error.';
    }
}

function getWeather(data){
  
    const res_desc = document.querySelector('#current-description');
    const res_temperature = document.querySelector('#current-temp');
    const res_wind = document.querySelector('#current-wind');
    const res_humidity = document.querySelector('#current-humidity');
    const img_icon = document.querySelector('#current-weather div img');

    res_desc.innerText = 'Vädret idag: ' + data.data[0].weather.description;
    res_temperature.innerText = "Temp: " + Math.round(data.data[0].temp) + " °C";
    res_wind.innerText = "Vindhastighet: " + Math.round(data.data[0].wind_spd) + " m/s";
    res_humidity.innerText = "Luftfuktighet: " + Math.round(data.data[0].rh) + " %";

    img_icon.src = `https://www.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png`;
    img_icon.alt = 'Icon not found.';
    
}

function removeOldSearch(){
    const res_desc = document.querySelector('#current-description');
    const res_temperature = document.querySelector('#current-temp');
    const res_wind = document.querySelector('#current-wind');
    const res_humidity = document.querySelector('#current-humidity');
    const img_icon = document.querySelector('#current-weather div img');
    const forecast = document.querySelectorAll('#forecast-weather');
    

    res_desc.innerText = "";
    res_temperature.innerText = "";
    res_wind.innerText = "";
    res_humidity.innerText = "";

    img_icon.src = "";
    img_icon.alt = "";

    displayErrorMsg(""); 
}

function errorFunction(error){
    console.log('Error: ' , error);
    displayErrorMsg('Testa ändra stavningen på din stad.');
}

function displayErrorMsg(errorText){
    const errorMsg = document.querySelector('#error-message');
    errorMsg.innerText = errorText;
  }

  