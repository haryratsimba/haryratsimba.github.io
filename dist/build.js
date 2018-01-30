$(document).ready(function() {

  // Fullpage
  $('#fullpage').fullpage({
    anchors: ['home', 'experience', 'skills', 'contact'],
    onLeave: function(index, nextIndex) {
      var $nav = $('.navigation-list li');

      $nav.eq(index - 1).removeClass('active');
      $nav.eq(nextIndex - 1).addClass('active');
    }
  });

  // Presentation text
  $('h1#salutations').fitText();

  // Timeline
  var options = {
    start_at_end: true,
    language: 'fr',
    // Use 0.5 instead of 0 as the most zoom out value because of the following issues
    // https://github.com/NUKnightLab/TimelineJS/issues/829
    scale_factor: 0.5,
    initial_zoom: 0.5
  };

  var timeline = new TL.Timeline('timeline-embeded', 'https://docs.google.com/spreadsheets/d/1SlsDx4UUZ-eJYqrzh-gj7heafo8N--LuEbCV7uD57Ic/pubhtml', options);
});
