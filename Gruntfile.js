module.exports = function(grunt) {
    grunt.initConfig({

        uglify: {
            build: {
                options: {
                    beautify: true,
                    compress: true
                },
                src: ['dist/script.min.js'],
                dest: 'dist/script.min.js',
            },
            dev: {
                options: {
                    beautify: true,
                    compress: false,
                    preserveComments: 'all'
                },
                src: ['js/main.js'],
                dest: 'dist/script.min.js',
            }
        },

        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'dist/script.min.js' : 'js/main.js'
                }
            }
        },


        watch: {
            dev: {
                files: ['scss/**/*.scss', 'js/*.js'],
                tasks: ['sass:dev', 'postcss', 'babel']
            },
            build: {
                files: ['scss/**/*.scss', 'js/*.js'],
                tasks: ['sass:build', 'postcss', 'babel']
            },
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
                    require('postcss-flexbox'),
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
                        '*.html',
                        'clients/*.html'
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
    grunt.loadNpmTasks('grunt-babel');

    // define default task
    grunt.registerTask('default', ['browserSync', 'sass:dev', 'postcss', 'watch:dev']);
    grunt.registerTask('build', ['sass:build', 'postcss', 'postcss', 'uglify:build']);
};