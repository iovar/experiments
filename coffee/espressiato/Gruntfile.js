module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      coffee: {
        files: ['coffee/*'],
        tasks: ['coffee','uglify','xkbbell']
      },
      htmlIncludes: {
        files: ['templates/**','index.html'],
        tasks: ['includes','xkbbell']
      },
      css: {
        files: ['css/main.css','css/src/*'],
        tasks: ['cssmin','xkbbell']
      },
      csslibs: {
        files: ['css/**','!css/main.css','!css/src/**'],
        tasks: ['copy:csslibs','xkbbell']
      },
      assets: {
        files: ['img/**','icon.png','fonts/**','res/**'],
        tasks: ['clean:assets','copy:assets','xkbbell']
      },
      configxml: {
        files: ['config.xml', 'package.json'],
        tasks: ['replace:version','xkbbell']
      }
    },
    cssmin: {
      combine: {
        options: {
          banner: '/*Version <%=pkg.version%>*/'
        },
        files: {
          'build/css/main.min.css': ['css/main.css']
        }
      }
    },
    uglify: {
      build: {
        src: 'js/main.js',
        dest: 'build/js/main.min.js'
      }
    },
    coffee: {
      compile: {
        options: {
          sourceMap: true
        },
        files: {
          'js/main.js': ['coffee/*.coffee']
        }
      }
    },
    clean: {
      assets: ['build/img/**','build/fonts/**','build/res/**'],
      build: ['build/**']
    },
    copy: {
      assets: {
        files: [
          { expand:true, src: [
            'img/**',
            'icon.png',
            'fonts/**',
            'res/**'
            ],
            dest: 'build/'}
        ]
      },
      csslibs: {
        files: [
          {expand: true, src: [
            'css/**',
            '!css/main.css',
            '!css/src/**'
            ],
            dest: 'build/'}
          ]
      },
      jslibs: {
        files: [
          {expand: true, src: [
            'js/libs/**',
            ],
            dest: 'build/'}
          ]
      }
    },
    includes: {
      files: {
        src: ['index.html'],
        dest: 'build',
        flatten: true,
        options: {
          includePath: 'templates',
          filenameSuffix: '.html'
        }
      }
    },
    replace: {
      version: {
        options: {
          patterns: [
            {
              match: 'version',
              replacement: '<%= pkg.version %>'
            }
          ]
        },
        files: [
          { expand: true, flatten: true, src: ['config.xml'], dest: 'build/'}
        ]
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-replace');

  grunt.registerTask('xkbbell', 'Rings the bell (notification to be added last on task lists)', function() {
    var spawn =  require('child_process').spawn,
      xkbbell = spawn('xkbbell');

    xkbbell.stdin.end();
  });

  grunt.registerTask('default', ['clean:build','copy','includes','coffee','cssmin','replace']);

};

