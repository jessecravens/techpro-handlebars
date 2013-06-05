
  var $emberTesting = $('<div id="ember-testing"/></div>');

  var $close = '<span><a class="close" href="#">close</a></span>';
  $emberTesting.append($close);
  $('#qunit').before($emberTesting);

  $('.close').on('click', function(){
    $('#ember-testing').hide();
  })

  App.rootElement = '#ember-testing';
  App.setupForTesting();
  App.injectTestHelpers();