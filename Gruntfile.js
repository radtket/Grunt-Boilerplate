module.exports = function(grunt) {
    grunt.initConfig({

        uglify: {
            build: {
                options: {
                    beautify: true,
                    compress: true
                },
                src: ['js/plugins.js', 'js/main.js'],
                dest: 'dist/script.min.js',
            },
            dev: {
                options: {
                    beautify: true,
                    compress: false,
                    preserveComments: 'all'
                },
                src: ['js/plugins.js', 'js/main.js'],
                dest: 'dist/script.min.js',
            }
        },

        watch: {
            files: ['scss/**/*.scss', 'js/*.js'],
            tasks: ['uglify:dev', 'sass:dev', 'postcss']
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'dist/application.css': 'scss/application.scss'
                },
            },
            build: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'dist/application.css': 'scss/application.scss'
                },
            },
        },
        postcss: {
            options: {
                map: true, // inline sourcemaps
                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('postcss-flexboxfixer'),
                    require('postcss-gradientfixer'),
                    require('autoprefixer')({
                        browsers: ['last 2 versions', 'ie >= 10']
                    }) // add vendor prefixes
                ]
            },
            dist: {
                src: 'dist/*.css',
            },
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'dist/*.css',
                        '*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: '.'
                }
            }
        }
    });

    // load npm tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browser-sync');

    // define default task
    grunt.registerTask('default', ['browserSync', 'uglify:dev', 'sass:dev', 'postcss', 'watch']);
    grunt.registerTask('build', ['uglify:build', 'sass:build']);
};