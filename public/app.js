var app = function(){
  var url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestComplete);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
};

var requestComplete = function(){
  if(this.status != 200) return;
  var jsonString = this.responseText;
  var beers = JSON.parse(jsonString);
  populateSelect(beers);
}

var populateSelect = function(beers){

  var select = document.getElementById('beer-select');
  
  beers.forEach(function(beer, index){
    var option = document.createElement('option');
    option.innerText = beer.name;
    option.value = index;
    select.appendChild(option);
  });

  select.addEventListener('change', function(){
    var beer = beers[this.value];
    var ul = document.getElementById('beer-details');

    while(ul.firstChild){
      ul.removeChild(ul.firstChild);
    }

    var li = document.createElement('h2');
    li.innerText = beer.name;
    ul.appendChild(li);

    var urlLi = document.createElement('p');
    var image = new Image(80);
    image.src = beer.image_url;
    urlLi.appendChild(image);
    ul.appendChild(urlLi);

    var ingredientsLi = document.createElement('li');

    beer.ingredients.malt.forEach(function(ingredient){
      var ingLi = document.createElement('li');
      ingLi.innerText = ingredient.name;
      ingredientsLi.appendChild(ingLi);
    })

    ul.appendChild(ingredientsLi);

  });
}

window.addEventListener('load', app);