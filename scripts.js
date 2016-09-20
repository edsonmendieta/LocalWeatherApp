// when window loads, sends GET request to IP Geo API
window.addEventListener('load', ipGeo, false);

var cityName;
var countryCode;

function ipGeo() {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://ip-api.com/json');
    xhr.onreadystatechange = function() {

        if(this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.response));

            // creates & appends string for #locationP
            var locationText = document.createTextNode(JSON.parse(this.response).city + ',' + ' ' + JSON.parse(this.response).region);

            document.getElementById('locationP').appendChild(locationText);

            cityName = JSON.parse(this.response).city;
            countryCode = JSON.parse(this.response).countryCode;

            openWeather(); // executes openWeather function last.
        }
    }
    xhr.send();
}

function openWeather() {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' +cityName + ',' + countryCode +'&units=metric&appid=659c3dd6c7263dc3cd1bc77834892385');
    xhr.onreadystatechange  = function() {

    if(this.readyState == 4 && this.status == 200) {

        console.log(JSON.parse(this.response));

        var parsedWeather = JSON.parse(this.response);

        // creates & appends string for #temperatureP
        var temperatureText=document.createTextNode(parsedWeather.main.temp + ' \xB0');

                   //Inserts temperature numbers BEFORE symbol & letter
        document.getElementById('temperatureP').insertBefore(temperatureText, document.getElementById('temperatureP').childNodes[0]);


        // creates & appends string for #statusP
        var statusText=document.createTextNode(parsedWeather.weather[0].main);

        document.getElementById('statusP').appendChild(statusText);


            }
        }
    xhr.send();
    };
