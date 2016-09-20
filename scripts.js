// when window loads, sends GET request to IP Geo API
window.addEventListener('load', ipGeo, false);

var cityName;
var countryCode;

function ipGeo() {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://ip-api.com/json');
    xhr.onreadystatechange = function() {

        var weatherParameters;

        if(this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.response));

            // creates & appends string for #locationP
            var locationText = document.createTextNode(JSON.parse(this.response).city + ',' + ' ' + JSON.parse(this.response).region);
            document.getElementById('locationP').appendChild(locationText);

            cityName = JSON.parse(this.response).city;
            countryCode = JSON.parse(this.response).countryCode;

            weatherParameters = 'hello!';
            console.log(weatherParameters);
            console.log(cityName);
            console.log(countryCode);

            openWeather(); // executes openWeather function last.
        }
    }
    xhr.send();
}

    function openWeather() {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + ',' + countryCode + '&appid=659c3dd6c7263dc3cd1bc77834892385');
        xhr.onreadystatechange  = function() {

            if(this.readyState == 4 && this.status == 200) {

                console.log(JSON.parse(this.response));

                
            }
        }
        xhr.send();
    };
