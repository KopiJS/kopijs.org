(function(){
  var $kopiList = document.getElementById('kopi-list');
  var $kopis = $kopiList.getElementsByTagName('li');
  for (var i=0, l=$kopis.length; i<l; i++){
    var $kopi = $kopis[i];
    var name = $kopi.textContent;
    var ingredients = Kopi.parse(name);
    var internalIngredients = 'water condensed_milk evaporated_milk coffee'.split(' ');
    var internalHTML = internalIngredients.map(function(ingredient){
      var value = ingredients[ingredient];
      if (!value) return;
      var height = value * 100 + '%';
      return '<div class="' + ingredient + '" style="height: ' + height + '"></div>';
    }).join('');
    var html = '<div class="kopi">'
        + '<div class="cup">'
          + '<div class="ingredients">' + internalHTML + '</div>'
        + '</div>'
        + '<div class="plate"></div>'
      + '</div>'
      + '<div class="kopi-name">' + name + '</div>';
    $kopi.innerHTML = html;
  }
})();
