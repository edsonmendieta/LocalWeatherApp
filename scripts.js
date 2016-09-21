
// when window loads, sends GET request to IP Geo API
window.addEventListener('load', ipGeo, false);

var cityName; // user's city
var countryCode; // user's country

var tempNum; // contains numerical temperature

var mainForecast; // contains the 'main' weather description...
// (i.e. cloudy, rainy, snowing, clear etc.)

// IP GEOlocator API request & functionality -------------------
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


            openWeather(); // executes openWeather global function
        }
    }
    xhr.send();
}
//-------------------------------------------

// OpenWeather API request & functionality ------------------
function openWeather() {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' +cityName + ',' + countryCode +'&units=metric&appid=659c3dd6c7263dc3cd1bc77834892385');
    xhr.onreadystatechange  = function() {

        if(this.readyState == 4 && this.status == 200) {

            console.log(JSON.parse(this.response));

            var parsedWeather = JSON.parse(this.response);

            var roundedTemp = Math.round(parsedWeather.main.temp);

            // creates & appends string for #temperatureP
            var temperatureText=document.createTextNode(roundedTemp + ' \xB0');

                   //Inserts temperature numbers BEFORE symbol & letter
                   document.getElementById('temperatureP').insertBefore(temperatureText, document.getElementById('temperatureP').childNodes[0]);


            // creates & appends string for #statusP
            var statusText=document.createTextNode(parsedWeather.weather[0].main);

            document.getElementById('statusP').appendChild(statusText);

            tempNum = parsedWeather.main.temp;

            mainForecast = parsedWeather.weather[0].main.toLowerCase();


            weatherPic(); // executes weatherPic global function

        }
    }
    xhr.send();
}
//---------------------------------------------------

function weatherPic() { // adds appropriate pic to #iconPic

    var weatherImg = document.getElementById('iconPic');

    // regexp patterns assigned to variables
    var clearRe = /clear/;
    var cloudRe = /cloud/;
    var rainRe = /rain/;
    var snowRe = /snow/;

    var checkMatch = clearRe.exec(mainForecast);

    if(clearRe.exec(mainForecast)) { // if 'clear' is in word...

            weatherImg.setAttribute('src', 'https://c1.staticflickr.com/9/8433/29508504720_bf8015fafa_m.jpg');
            weatherImg.setAttribute('alt', 'sunIcon');
    }

    else if(cloudRe.exec(mainForecast)) { // if 'cloud' is in word...

        weatherImg.setAttribute('src', 'https://c8.staticflickr.com/9/8294/29800837055_922aa68f42_m.jpg');
        weatherImg.setAttribute('alt', 'cloudIcon');
    }

    else if(rainRe.exec(mainForecast)) { // if 'rain' is in word...

        weatherImg.setAttribute('src', 'https://c4.staticflickr.com/9/8458/29800854715_86ab837b7e_m.jpg');
        weatherImg.setAttribute('alt', 'rainIcon');
    }

    else if(snowRe.exec(mainForecast)) { // if 'snow' is in word...

        weatherImg.setAttribute('src', 'https://c3.staticflickr.com/8/7484/29508505010_45c2a0b64e_m.jpg');
        weatherImg.setAttribute('alt', 'snowIcon');
    }
}
//------------------------------------------------

// temp. unit system conversion --------------------------
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
        tempNum = Math.round((tempNum * 1.8) + 32);

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
        tempNum = Math.round((tempNum - 32) * (5/9));

        // creates new temp. text
        var newTempText = document.createTextNode(tempNum  + ' \xB0')

        // removes old temp. text
        temperatureNumbers.removeChild(temperatureNumbers.childNodes[0]);

        // inserts new temp. text...in front of temp. letter
         temperatureNumbers.insertBefore(newTempText, temperatureNumbers.childNodes[0]);
    }
}
//--------------------------------------------------
