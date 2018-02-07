'use strict';

$(document).ready(function () {

  // Fullpage
  var anchors = {
    HOME: 'home',
    EXPERIENCE: 'experience',
    SKILLS: 'skills',
    SIDEPROJECTS: 'side-projects'
  };

  $('#fullpage').fullpage({
    anchors: Object.values(anchors),
    onLeave: function onLeave(index, nextIndex, direction) {
      var $nav = $('.navigation-list li');

      $nav.eq(index - 1).removeClass('active');
      $nav.eq(nextIndex - 1).addClass('active');
    }
  });

  // Presentation text
  $('h1#salutations').fitText();

  var spreadsheetURL = 'https://docs.google.com/spreadsheets/d/1PzlSrtWpkWfE7Mn-weoVVSCxT30OrjS8hulbKBle9Qw/pubhtml';

  // Timeline
  var timeline = new TL.Timeline('timeline-embeded', spreadsheetURL, {
    start_at_end: true,
    language: 'fr',
    // Use 0.5 instead of 0 as the most zoom out value because of the following issues
    // https://github.com/NUKnightLab/TimelineJS/issues/829
    scale_factor: 0.5,
    initial_zoom: 0.5
  });

  // Side-projects
  var vm = new Vue({
    el: '#projects',
    data: {
      projects: [],
      selectedProjectIndex: 0,
      selectedProject: {}
    },
    created: function created() {
      var _this = this;

      // Use Tabletop to retrieve spreadsheet rows as key / value
      Tabletop.init({
        key: spreadsheetURL,
        callback: function callback(_ref) {
          var projects = _ref.projects;

          _this.projects = projects.elements;
          _this.selectedProject = _this.projects[0];
        }
      });
    },

    methods: {
      expandProject: function expandProject(index) {
        this.selectedProject = this.projects[index];
        this.selectedProjectIndex = index;
      },
      isProjectSelected: function isProjectSelected(index) {
        return index === this.selectedProjectIndex;
      }
    },
    computed: {
      tagsList: function tagsList() {
        return this.projects.reduce(function (acc, project) {
          // Accumulated tags
          var tags = project.tags.split(',');

          // Remove dupplicate tags
          return acc.concat(tags.filter(function (el) {
            return acc.indexOf(el) < 0;
          }));
        }, []);
      }
    }
  });

  console.log(vm);

  $('body').removeClass('loading');
});