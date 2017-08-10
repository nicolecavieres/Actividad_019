

var map;
var coords = {
  'stgo' : {lat:-33.4724228,lng:-70.7699155},
  'arica' : {lat:-18.4782534,lng:-70.3125987},
  'chiloe' : {lat:-42.6239686,lng:-73.9265732},
}

var image = {
  'clear-day': 'images/i-01.png',
  'clear-night': 'images/i-02.png',
  'rain': 'images/i-03.png',
  'snow': 'images/i-04.png',
  'sleet': 'images/i-05.png',
  'wind': 'images/i-06.png',
  'fog': 'images/i-07.png',
  'cloudy': 'images/i-08.png',
  'partly-cloudy-day': 'images/i-09.png',
  'partly-cloudy-night': 'images/i-10.png',
  'thunderstorm': 'images/i-11.png'
}

var url = 'https://crossorigin.me/https://api.darksky.net/forecast/';
var key = '0a88845a716599e401f2d977923f126a';
var queryParams = ['exclude=[minutely,hourly,daily,alerts,flags]','lang=es', 'units=auto'];



function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: coords['stgo'],
      zoom: 8
    });

    var marker = new google.maps.Marker({
      position: coords['stgo'],
      map: map,
      title: 'Santiago de Chile'
    });
}


$('#city').on('change',function(event){


        var coordenadas = coords[$(this).val()] 
        var latitud = coordenadas.lat.toString();
        var longitud = coordenadas.lng.toString();
   
        map.setCenter(coordenadas)
           
        var marker = new google.maps.Marker({
              position: coordenadas,
              map: map,
              title: 'Estás aquí'
        });

    $.ajax({
        url: url + key + '/' + latitud + ',' + longitud + '?' + queryParams[0] + '&' + queryParams[1] + '&' + queryParams[2],
        method: 'GET'
      }).then(function(data){
        console.log(data)
        $('#resumen').text(parseInt(data.currently.temperature) + '° ' + data.currently.summary);
        $('.img-responsive').attr('src', image[data.currently.icon]);
      });

})



/* $('#sensacion').text(data.currently.apparentTemperature + '°');
    $('#probabilidad').text(data.currently.precipProbability * 100 + '%'); 
*/



