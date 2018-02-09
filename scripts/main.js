$(document).ready(() => {

  // Fullpage
  const anchors = {
    HOME: 'home',
    EXPERIENCE: 'experience',
    TECHNOS: 'technos',
    SIDEPROJECTS: 'side-projects'
  };

  $('#fullpage').fullpage({
    anchors: Object.values(anchors),
    onLeave(index, nextIndex, direction) {
      const $nav = $('.navigation-list li');

      $nav.eq(index - 1).removeClass('active');
      $nav.eq(nextIndex - 1).addClass('active');
    }
  });

  const spreadsheetURL = 'https://docs.google.com/spreadsheets/d/1PzlSrtWpkWfE7Mn-weoVVSCxT30OrjS8hulbKBle9Qw/pubhtml';

  // Timeline
  const timeline = new TL.Timeline('timeline-embeded', spreadsheetURL, {
    start_at_end: true,
    language: 'fr',
    // Use 0.5 instead of 0 as the most zoom out value because of the following issues
    // https://github.com/NUKnightLab/TimelineJS/issues/829
    scale_factor: 0.5,
    initial_zoom: 0.5
  });

  // Side-projects
  const vm = new Vue({
    el: '#projects',
    data: {
      projects: [],
      selectedProjectIndex: 0,
      selectedProject: {}
    },
    created() {
      // Use Tabletop to retrieve spreadsheet rows as key / value
      Tabletop.init({
        key: spreadsheetURL,
        callback: ({projects}) => {
          this.projects = projects.elements;
          this.selectedProject = this.projects[0];
        }
      });
    },
    methods: {
      expandProject(index) {
        this.selectedProject = this.projects[index];
        this.selectedProjectIndex = index;
      },
      isProjectSelected(index) {
        return index === this.selectedProjectIndex;
      }
    },
    computed: {
      tagsList() {
        return this.projects.reduce((acc, project)=> {
          let tags = project.tags.split(',');

          // Remove dupplicated tags
          return acc.concat(tags.filter(el=> acc.indexOf(el) < 0));
        }, []);
      }
    }
  });

  $('body').removeClass('loading');
});
