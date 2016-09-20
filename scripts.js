// when window loads, sends GET request to IP Geo API
window.addEventListener('load', ipGeo, false);

function ipGeo() {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://ip-api.com/json');
    xhr.onreadystatechange = function() {

        if(this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.response));

            // creates & appends string for #locationP
            var locationText = document.createTextNode(JSON.parse(this.response).city + ',' + ' ' + JSON.parse(this.response).region);
            console.log(locationText);
            document.getElementById('locationP').appendChild(locationText);
        }
    }
    xhr.send();
}

// when window loads, sends GET request to OpenWeatherMap appendChild
