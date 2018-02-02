$(document).ready(() => {

  const anchors = {
    HOME: 'home',
    EXPERIENCE: 'experience',
    SKILLS: 'skills',
    SIDEPROJECTS: 'side-projects'
  };

  // Fullpage
  $('#fullpage').fullpage({
    anchors: Object.values(anchors),
    onLeave(index, nextIndex, direction) {
      const $nav = $('.navigation-list li');

      $nav.eq(index - 1).removeClass('active');
      $nav.eq(nextIndex - 1).addClass('active');

      // Re-enable autoscrolling after leaving the lastest slide (side-projects)
      // from bottom to top
      if('up' === direction) {
        $.fn.fullpage.setAutoScrolling(true);
      }
    },
    afterLoad(anchorLink, index) {
      // Disable autoscrolling on the side-projects section if its the content overflows
      if (anchors.SIDEPROJECTS === anchorLink && $('.projects:eq(0)').height() > $('#side-projets').height()) {
        $.fn.fullpage.setAutoScrolling(false);
      }
    }
  });

  // Presentation text
  $('h1#salutations').fitText();

  const spreadsheetURL = 'https://docs.google.com/spreadsheets/d/1SlsDx4UUZ-eJYqrzh-gj7heafo8N--LuEbCV7uD57Ic/pubhtml';

  // Timeline
  const options = {
    start_at_end: true,
    language: 'fr',
    // Use 0.5 instead of 0 as the most zoom out value because of the following issues
    // https://github.com/NUKnightLab/TimelineJS/issues/829
    scale_factor: 0.5,
    initial_zoom: 0.5
  };

  const timeline = new TL.Timeline('timeline-embeded', spreadsheetURL, options);

  // Side-projects

  const vm = new Vue({
    el: '#side-projets',
    data: {
      projects:[]
    },
    created() {
      // Use Tabletop to retrieve spreadsheet rows as key / value
      Tabletop.init({
        key: spreadsheetURL,
        callback:({projects})=> {
          this.projects = projects.elements;
        }
      });
    }
  });
});
