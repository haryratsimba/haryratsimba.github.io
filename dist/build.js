'use strict';

$(document).ready(function () {

  var anchors = {
    HOME: 'home',
    EXPERIENCE: 'experience',
    SKILLS: 'skills',
    SIDEPROJECTS: 'side-projects'
  };

  // Fullpage
  $('#fullpage').fullpage({
    anchors: Object.values(anchors),
    onLeave: function onLeave(index, nextIndex, direction) {
      var $nav = $('.navigation-list li');

      $nav.eq(index - 1).removeClass('active');
      $nav.eq(nextIndex - 1).addClass('active');

      // Re-enable autoscrolling after leaving the lastest slide (side-projects)
      // from bottom to top
      if ('up' === direction) {
        $.fn.fullpage.setAutoScrolling(true);
      }
    },
    afterLoad: function afterLoad(anchorLink, index) {
      // Disable autoscrolling on the side-projects section if its the content overflows
      if (anchors.SIDEPROJECTS === anchorLink && $('.projects:eq(0)').height() > $('#side-projets').height()) {
        $.fn.fullpage.setAutoScrolling(false);
      }
    }
  });

  // Presentation text
  $('h1#salutations').fitText();

  var spreadsheetURL = 'https://docs.google.com/spreadsheets/d/1SlsDx4UUZ-eJYqrzh-gj7heafo8N--LuEbCV7uD57Ic/pubhtml';

  // Timeline
  var options = {
    start_at_end: true,
    language: 'fr',
    // Use 0.5 instead of 0 as the most zoom out value because of the following issues
    // https://github.com/NUKnightLab/TimelineJS/issues/829
    scale_factor: 0.5,
    initial_zoom: 0.5
  };

  var timeline = new TL.Timeline('timeline-embeded', spreadsheetURL, options);

  // Side-projects

  var vm = new Vue({
    el: '#side-projets',
    data: {
      projects: []
    },
    created: function created() {
      var _this = this;

      // Use Tabletop to retrieve spreadsheet rows as key / value
      Tabletop.init({
        key: spreadsheetURL,
        callback: function callback(_ref) {
          var projects = _ref.projects;

          _this.projects = projects.elements;
        }
      });
    }
  });
});