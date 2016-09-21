// when window loads, sends GET request to IP Geo API
window.addEventListener('load', ipGeo, false);

var cityName;
var countryCode;

var tempNum;

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

            tempNum = parsedWeather.main.temp;;

        }
    }
    xhr.send();
};

document.getElementById('unitLetter').addEventListener('click', convert, false);

function convert() {

    var spanLetter = document.getElementById('unitLetter');

    var temperatureNumbers = document.getElementById('temperatureP');

    var imperial = document.createTextNode('F');
    var metric = document.createTextNode('C');

    if(spanLetter.textContent == 'C') { // if temp is Celsius

        // removes letter 'C'
        spanLetter.removeChild(spanLetter.childNodes[0]);

        // changes letter to 'F'
        spanLetter.appendChild(imperial);

        // converts temp. to Farenheit...assigns to variable 'tempNum'
        tempNum = (tempNum * 1.8) + 32;

        // creates new temp. text
        var newTempText = document.createTextNode(tempNum  + ' \xB0')

        // removes old temp. text
        temperatureNumbers.removeChild(temperatureNumbers.childNodes[0]);

        // inserts new temp. text...in front of temp. letter
         temperatureNumbers.insertBefore(newTempText, temperatureNumbers.childNodes[0]);
    }

    else if(spanLetter.textContent == 'F') {
        // removes letter 'F'
        spanLetter.removeChild(spanLetter.childNodes[0]);

        // changes letter to 'C'
        spanLetter.appendChild(metric);

        // converts temp. to Celsius...assigns to variable 'tempNum'
        tempNum = (tempNum - 32) * (5/9);

        // creates new temp. text
        var newTempText = document.createTextNode(tempNum  + ' \xB0')

        // removes old temp. text
        temperatureNumbers.removeChild(temperatureNumbers.childNodes[0]);

        // inserts new temp. text...in front of temp. letter
         temperatureNumbers.insertBefore(newTempText, temperatureNumbers.childNodes[0]);
    }
}
