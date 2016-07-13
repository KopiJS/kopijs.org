(function(){
  var $kopiList = document.getElementById('kopi-list');
  var $kopis = $kopiList.getElementsByTagName('li');
  var $kopiState1 = document.getElementById('kopi-state-1');
  var $kopiState2 = document.getElementById('kopi-state-2');
  var $kopiState3 = document.getElementById('kopi-state-3');
  var $nextMeetup = document.getElementById('next-meetup');

  var checkState = function(){
    $kopiList.classList.toggle('warm', $kopiState1.checked);
    $kopiList.classList.toggle('lukewarm', $kopiState2.checked);
    $kopiList.classList.toggle('iced', $kopiState3.checked);
  };
  checkState();
  setTimeout(checkState, 1000);
  $kopiState1.addEventListener('change', checkState, false);
  $kopiState2.addEventListener('change', checkState, false);
  $kopiState3.addEventListener('change', checkState, false);

  for (var i=0, l=$kopis.length; i<l; i++){
    var $kopi = $kopis[i];
    var name = $kopi.textContent;
    $kopi.innerHTML = makeKopi(name);
  }

  function makeKopi(name){
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
      // Returns 8 to 26
      return (Math.random()*18 + 8).toFixed();
    };
    iceHTML = '<div class="ice-blocks">'
        + '<div class="ice" style="transform: rotate(' + randDeg() + 'deg); -webkit-transform: rotate(' + randDeg() + 'deg); left: ' + randLeft() + 'px"></div>'
        + '<div class="ice" style="transform: rotate(' + randDeg() + 'deg); -webkit-transform: rotate(' + randDeg() + 'deg); left: ' + randLeft() + 'px"></div>'
        + '<div class="ice" style="transform: rotate(' + randDeg() + 'deg); -webkit-transform: rotate(' + randDeg() + 'deg); left: ' + randLeft() + 'px"></div>'
      + '</div>';

    var state = ingredients.state;
    ingredients.state = 'lukewarm';
    var lukewarmName = Kopi.stringify(ingredients);
    ingredients.state = 'iced';
    var icedName = Kopi.stringify(ingredients);

    // Finally render the whole Kopi in its full glory
    var html = '<div class="kopi kopi-' + state + '">'
        + sugarHTML
        + '<div class="cup">'
          + '<div class="ingredients">' + internalIngredientsHTML + '</div>'
          + iceHTML
        + '</div>'
        + '<div class="plate"></div>'
      + '</div>'
      + '<div class="kopi-name">'
        + '<span class="kopi-warm-name">' + name + '</span>'
        + '<span class="kopi-lukewarm-name">' + lukewarmName + '</span>'
        + '<span class="kopi-iced-name">' + icedName + '</span>'
      + '</div>';
    return html;
  }

  // Kopi maker
  var $makerItem = document.getElementById('maker-item');
  var $makerForm = document.getElementById('maker-form');
  var $makerName = document.getElementById('maker-name');
  function renderKopi(){
    var kopiName = ['kopi_milkiness', 'kopi_strength', 'kopi_sweetness', 'kopi_state'].map(function(name){
      return $makerForm[name].value || $makerForm.querySelector('[name=' + name + ']:checked').value;
    }).join(' ').trim();
    var kopiHTML;
    try {
      kopiHTML = makeKopi(kopiName);
      $makerName.innerHTML = kopiName;
    } catch (e) {
      kopiHTML = e.message;
      $makerName.innerHTML = 'Kopi ???';
    }
    $makerItem.innerHTML = kopiHTML;
  };
  renderKopi();
  $makerForm.onsubmit = $makerForm.oninput = $makerForm.onchange = function(e){
    e.preventDefault();
    setTimeout(renderKopi, 100);
    if ($makerItem.scrollIntoViewIfNeeded){
      $makerItem.scrollIntoViewIfNeeded();
    } else {
      $makerItem.scrollIntoView();
    }
  }

  // Check for our next meetup
  var xhr = new XMLHttpRequest();
  var apiKey = 'AIzaSyBQ5UHrT9VP0H9s0Ud1xrDETuWqT-wExkw';
  var today = new Date();
  var yesterday = new Date((+today) - 43200000);
  xhr.open('get', 'https://www.googleapis.com/calendar/v3/calendars/dnhunu42fotmefouusg4j8ip0k@group.calendar.google.com/events?key=' + apiKey + '&timeMin=' + yesterday.toISOString(), true);
  xhr.onload = function(){
    try {
      var res = JSON.parse(this.responseText);
      if (!res || !res.items || !res.items.length) return;
      var firstEvent = res.items[0];
      var url = firstEvent.description.trim();
      var date = new Date(firstEvent.start.dateTime);
      var momentDate = moment(date);
      var humanDate = momentDate.format('dddd, D MMMM YYYY');
      var humanTime = momentDate.format('h:mm A');
      var html = '<a href="' + url + '">'
        + '<h3>' + firstEvent.summary + '</h3>'
        + '<p class="iconic"><i class="fa fa-fw fa-calendar-o"></i> <time title="' + date.toString() + '">' + humanDate + '<br>' + humanTime + '</time></p>'
        + '<p class="iconic"><i class="fa fa-fw fa-map-marker"></i> ' + firstEvent.location + '</p>'
        + '</a>';
      if (firstEvent.location){
        html += '<iframe width="100%" height="300" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=' + encodeURIComponent(firstEvent.location) + '&key=' + apiKey + '"></iframe>';
      }
      $nextMeetup.innerHTML = html;
    } catch(e){}
  };
  xhr.send();
})();
