module.exports = function(grunt) {

    grunt.initConfig({

        jshint: {
            scripts: {
                src: ['public/javascript/**/*.js']
            }
        },

        uglify: {
            my_target: {
                files: {
                    'public/javascript/script.min.js': ['public/javascript/script.min.js']
                }
            }
        },

        concat: {
            options: {
                separator: '\n',
            },
            script: {
                src: [
                    'public/javascript/libraries/jquery.min.js',
                    'public/javascript/libraries/angular.min.js',
                    'public/javascript/libraries/angular.route.min.js',
                    'public/javascript/libraries/bootstrap.js',
                    'public/javascript/utilities/extensions.js',
                    'public/javascript/application.js',
                    'public/javascript/angular/routes/routes.js',
                    'public/javascript/angular/factories/db-provider.js',
                    'public/javascript/angular/controllers/attendance.js',
                    'public/javascript/angular/controllers/student.js',
                    'public/javascript/angular/controllers/notification.js',
                    'public/javascript/angular/controllers/class-room.js'
                ],
                dest: 'public/javascript/script.min.js'
            }
        },

        cssmin: {
            target: {
                files: {
                    'public/css/style.min.css': [
                        'public/css/bootstrap.css',
                        'public/css/style.css'
                    ]
                }
            }
        },

        watch: {
            scripts: {
                files: 'scripts/**.js',
                task: 'jshint:scripts'
            },

            styles: {
                files: 'styles/**.less',
                task: 'less:styles'
            }
        }

    });

    // grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // grunt.registerTask('default', ['jshint', 'less']);
    // grunt.registerTask('build', ['jshint', 'uglify', 'less']);
    grunt.registerTask('minify', ['cssmin', 'concat', 'uglify']);

};
