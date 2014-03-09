module.exports = function(grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    nodeWebkitExcutable: '/Applications/node-webkit.app/Contents/MacOS/node-webkit',
    watch: {
      compass: {
        files: ['sass/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },
      handlebars: {
        files: [
          'templates/**/*.hbs'
        ],
        tasks: ['handlebars']
      },
      livereload: {
        options: { livereload: true },
        files: [
          'index.html',
          'js/**/*.js',
          '!js/bower_components/**',
          'images/**/*.{png,jpg,jpeg,gif,webp,svg}',
          'fonts/*',
          'css/**/*.css'
        ]
      }
    },
    compass: {
      dist: {
        files: {
          'css/app.css': 'sass/app.scss'
        }
      }
    },
    handlebars: {
      compile: {
        options: {
          processName: function(filename) {
            return filename.replace('templates/', '').replace('.hbs', '');
          },
          partialRegex: /.*/,
          partialsPathRegex: /\/partials\//
        },
        files: {
          'js/templates.js': 'templates/**/*.hbs'
        }
      }
    },
    concurrent: {
      boot: [
        'compass',
        'handlebars'
      ],
    },
    bgShell: {
      launch: {
        cmd: '<%= nodeWebkitExcutable %> .',
        bg: true
      },
      launchDebug: {
        cmd: '<%= nodeWebkitExcutable %> . --debug',
        bg: true
      }
    },
  });

  grunt.registerTask('launch', [
    'concurrent:boot',
    'bgShell:launch',
    'watch'
  ]);

  grunt.registerTask('debug', [
    'concurrent:boot',
    'bgShell:launchDebug',
    'watch'
  ]);

  grunt.registerTask('default', ['launch']);
};
