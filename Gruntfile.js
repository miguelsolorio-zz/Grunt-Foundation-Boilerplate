'use strict';

module.exports = function(grunt) {

  var globalConfig = {
    dist: '_public',
    source: 'src'
  };

  grunt.initConfig({

    globalConfig: globalConfig,
    pkg: grunt.file.readJSON('package.json'),

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: '<%= globalConfig.source  %>/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= globalConfig.dist  %>/images/'
        }]
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          '<%= globalConfig.dist  %>/css/main.min.css': '<%= globalConfig.source  %>/css/main.scss'
        }
      },

      dev: {
        options: {
          style: 'expanded',
          lineNumbers: 'true',
        },
        files: {
          '<%= globalConfig.dist  %>/css/main.css': '<%= globalConfig.source  %>/css/main.scss'
        }
      }
    },

    requirejs: {
      compile: {
        options: {
          name: "app",
          baseUrl: "src/js",
          mainConfigFile: "src/js/config.js",
          out: "<%= globalConfig.dist  %>/js/main.js",
          include: ['../../node_modules/grunt-contrib-requirejs/node_modules/requirejs/require.js']
        }
      }
    },

    modernizr: {

        // [REQUIRED] Path to the build you're using for development.
        "devFile" : "src/js/app.js",

        // [REQUIRED] Path to save out the built file.
        "outputFile" : "<%= globalConfig.dist  %>/js/modernizr.js",

        // Based on default settings on http://modernizr.com/download/
        "extra" : {
            "shiv" : true,
            "printshiv" : false,
            "load" : true,
            "mq" : false,
            "cssclasses" : true
        },

        // Based on default settings on http://modernizr.com/download/
        "extensibility" : {
            "addtest" : false,
            "prefixed" : false,
            "teststyles" : false,
            "testprops" : false,
            "testallprops" : false,
            "hasevents" : false,
            "prefixes" : false,
            "domprefixes" : false
        },

        // By default, source is uglified before saving
        "uglify" : false,
    },

    uglify: {
      my_target: {
        files: {
          '<%= globalConfig.dist  %>/js/main.min.js': ['<%= globalConfig.dist  %>/js/main.js']
        }
      }
    },

    clean: {
     all: ['<%= globalConfig.dist  %>/**/*']
    },


    watch: {
      options: {
        livereload: true
      },

      html: {
        files: ['<%= globalConfig.source  %>/**/*.hbs'],
        tasks: ['assemble:site'],
        livereload: true
      },

      css: {
        files: ['<%= globalConfig.source  %>/css/*.scss'],
        tasks: ['sass'],
        options:{
          spawn: false
        }
      },

      js: {
        files: ['<%= globalConfig.source  %>/js/*.js'],
        tasks: ['requirejs'],
        livereload: true
      },

      images: {
        files: ['<%= globalConfig.source  %>/images/**/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        livereload: true
      }

    },

    connect: {
      options: {
        port: 4000,
        livereload: 35729,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= globalConfig.dist  %>'
          ]
        }
      }
    },

    site: grunt.file.readYAML('src/template/data/site.yml'),
    assemble: {
      options: {
        prettify: {indent: 2},
        marked: {sanitize: false},
        data:   "src/template/data/site.yml",
        layoutdir: '<%= globalConfig.source  %>/template/layouts',
      },
      site: {
        options: {production: false,layout: 'default.hbs'},
        files: [
          { expand: true, cwd: '<%= globalConfig.source  %>/template/pages', src: ['**/*.hbs'], dest: '<%= site.destination %>' }
        ]
      },
      production: {
        options: {production: true,layout: 'default.hbs'},
        files: [
          { expand: true, cwd: '<%= globalConfig.source  %>/template/pages', src: ['**/*.hbs'], dest: '<%= site.destination %>' }
        ]
      }
    }



  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks("grunt-modernizr");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('assemble' );
  grunt.loadNpmTasks('grunt-newer' );

  // Default
  grunt.registerTask('default', ['clean', 'sass:dev', 'modernizr', 'requirejs', 'imagemin', 'assemble:site', 'connect', 'watch']);

  // Build Task
  grunt.registerTask('build', ['clean', 'sass:dist', 'modernizr', 'requirejs', 'uglify', 'imagemin', 'assemble:production', 'newer:assemble']);

};
