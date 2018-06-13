module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'src/assets/css/screen.css': 'src/sass/screen.scss'
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'docs/assets/img/'
                }]
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src', src: ['favicon.ico'], dest: 'docs/'},
					{expand: true, cwd: 'src', src: ['assets/img/*.svg'], dest: 'docs/'},
                    {expand: true, cwd: 'src', src: ['assets/css/*.css'], dest: 'docs/'},
                    {expand: true, cwd: 'src', src: ['mchugaev_cv.pdf'], dest: 'docs/'}
                ],
            },
        },
        postcss: {
            options: {
                map: false, 
                processors: [
                    require('postcss-focus')(),
                    require('autoprefixer')({browsers: '> 1%, last 2 versions'}),
                    require('cssnano')()
                ]
            },
            dist: {
                src: 'src/assets/css/*.css'
            }
        },
        watch: {
            css: {
                files: ['src/sass/**/*.scss', 'src/sass/*.scss'],
                tasks: ['sass']
            },
        },
        htmlmin: {
          dist: {
            options: {
              removeComments: true,
              collapseWhitespace: true,
              minifyJS: true
            },
            files: {
              'docs/index.html': 'src/index.html'
            }
          }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('default', ['sass', 'postcss', 'imagemin', 'htmlmin', 'copy']);

};