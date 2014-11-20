(function(){
  var $kopiList = document.getElementById('kopi-list');
  var $kopis = $kopiList.getElementsByTagName('li');
  var $kopiPeng = document.getElementById('kopi-peng');

  $kopiPeng.addEventListener('change', function(){
    var isPeng = $kopiPeng.checked;
    $kopiList.classList.toggle('peng');
  }, false);

  for (var i=0, l=$kopis.length; i<l; i++){
    var $kopi = $kopis[i];
    var name = $kopi.textContent;

    // Magic happens from Kopi.js
    var ingredients = Kopi.parse(name);

    // Configure the internal ingredients of the Kopi
    var internalIngredients = 'water condensed_milk evaporated_milk coffee'.split(' ');
    var internalIngredientsHTML = internalIngredients.map(function(ingredient){
      var value = ingredients[ingredient];
      if (!value) return;
      var height = value * 100 + '%';
      return '<div class="' + ingredient + '" style="height: ' + height + '"></div>';
    }).join('');

    // Render the sugar intelligently
    var sugarHTML = '';
    if (ingredients.sugar > 0){
      if (ingredients.sugar <= 0.5){
        sugarHTML = '<div class="sugar"></div>';
      } else if (ingredients.sugar <= 1){
        sugarHTML = '<div class="sugar sugar-double"></div>';
      } else {
        sugarHTML = '<div class="sugar sugar-triple"></div>';
      }
    }

    // Render the (random) ice(s)
    var randDeg = function(){
      // Returns -90 to 90 deg
      return (Math.random()*180).toFixed() - 90;
    };
    var randLeft = function(){
      // Returns 10 to 30
      return (Math.random()*20 + 10).toFixed();
    };
    iceHTML = '<div class="ice-blocks">'
        + '<div class="ice" style="transform: rotate(' + randDeg() + 'deg); left: ' + randLeft() + 'px"></div>'
        + '<div class="ice" style="transform: rotate(' + randDeg() + 'deg); left: ' + randLeft() + 'px"></div>'
        + '<div class="ice" style="transform: rotate(' + randDeg() + 'deg); left: ' + randLeft() + 'px"></div>'
      + '</div>';

    // Finally render the whole Kopi in its full glory
    var html = '<div class="kopi ' + (ingredients.ice ? 'kopi-peng' : '') + '">'
        + sugarHTML
        + '<div class="cup">'
          + '<div class="ingredients">' + internalIngredientsHTML + '</div>'
          + iceHTML
        + '</div>'
        + '<div class="plate"></div>'
      + '</div>'
      + '<div class="kopi-name">' + name + ' <span class="peng-name">Peng</span></div>';
    $kopi.innerHTML = html;
  }
})();
