$(document).ready(function() {

  $('#fullpage').fullpage({
    anchors: ['home', 'experience', 'skills', 'contact'],
    onLeave: function(index, nextIndex){
      var $nav = $('.navigation-list li');

      $nav.eq(index - 1).removeClass('active');
      $nav.eq(nextIndex - 1).addClass('active');
    }
  });

  $('h1#salutations').fitText();

});
