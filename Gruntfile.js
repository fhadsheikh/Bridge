module.exports = function(grunt){

    // Dev - Serve bower_component files with connect
    var serveStatic = require('serve-static');
    // Dev - Mod rewrite for pretty URLs
    var modRewrite = require('connect-modrewrite');

    var path = {
        dist: '.tmp',
        dev: 'app',
        server: '192.168.1.128',
    }

    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            dist: {
                options: {
                    port: 9000,
                    hostname: path.server,
                    livereload:true,
                    base: path.dist,
                    middleware: function(connect){
                        return [
                            modRewrite(['^[^\\.]*$ /index.html [L]']),
                            connect().use('/bower_components', serveStatic('./bower_components')),
                            serveStatic(path.dist)
                        ];
                    }
                }
            },
            dev: {
                options: {
                    port: 9000,
                    hostname: path.server,
                    livereload:true,
                    base: path.dev,
                    middleware: function(connect){
                        return [
                            modRewrite(['^[^\\.]*$ /index.html [L]']),
                            connect().use('/bower_components', serveStatic('./bower_components')),
                            serveStatic(path.dev)
                        ];
                    }
                }
            }
        },

        clean: {
            dist: {
                src: [path.dist]
            },
            reset: {
                src: [path.dist, 'app/images', 'app/fonts','fonts']
            }
        },

        wiredep: {
            dist: {
                src: ['app/index.html']
            }
        },

        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: path.dist
            }
        },

        compass: {
            dist: {
                options:{
                    sassDir: 'app/core/styles',
                    cssDir: 'app/core/styles'
                }
            }
        },
        
        copy: {
            dist: {
                files: [
                    {
                        src: 'app/index.html',
                        dest: path.dist + '/index.html'
                    },
                    {
                        cwd: 'app/',
                        expand: true,
                        flatten:true,
                        filter: 'isFile',
                        src: ['**/*.png','**/*.gif'],
                        dest: path.dist + '/images'
                    },
                    {
                        expand: true,
                        flatten:true,
                        filter: 'isFile',
                        src: ['bower_components/font-awesome/fonts/*.*'],
                        dest: path.dist + '/fonts'
                    },                    
                    {
                        expand: true,
                        flatten:true,
                        filter: 'isFile',
                        src: ['bower_components/summernote/dist/font/*.*'],
                        dest: path.dist + '/fonts'
                    }
                ]
            },
            dev: {
                files: [
                    {
                        cwd: 'app/',
                        expand: true,
                        flatten:true,
                        filter: 'isFile',
                        src: ['**/*.png','**/*.gif'],
                        dest: 'app/images'
                    },
                    {
                        expand: true,
                        flatten:true,
                        filter: 'isFile',
                        src: ['bower_components/font-awesome/fonts/*.*'],
                        dest: 'app/fonts'
                    },                
                    {
                        expand: true,
                        flatten:true,
                        filter: 'isFile',
                        src: ['bower_components/summernote/dist/font/*.*'],
                        dest: 'app/fonts'
                    }
                ]
            }
        },

        ngtemplates: {
            dist:    {
                cwd: 'app',
                src: '**/*.html',
                dest: path.dist+ '/template.js',
                options: {
                    module: 'portal',
                    usemin: 'scripts/scripts.js'
                }
            }
        },

        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: path.dist + '/concat/scripts',
                    src: '*.js',
                    dest: path.dist + '/concat/scripts'
                }]
            }
        },

        usemin: {
            html: [path.dist + '/index.html'],
            css: [path.dist + '/styles/main.css']
        },

        filerev: {
            dist: {
                src: [
                    path.dist + '/scripts/*.js',
                    path.dist + '/styles/*.css'
                ]
            }
        },
        
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    '.tmp/index.html' : '.tmp/index.html'
                }
            }
        },

        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep'],
            },
            views: {
                files: '**/*.*.html',
                options: {
                    livereload:true
                }
            },
            html: {
                files: '**/*.html',
                options: {
                    livereload:true
                }
            },
            js: {
                files: '**/*.*.js',
                options: {
                    livereload:true
                }
            },
            scss: {
                files: '**/*.scss',
                tasks: ['compass'],
                options: {
                    livereload:true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-filerev');

    grunt.registerTask('build', [
        'clean',
        'wiredep',
        'useminPrepare',
        'compass',
        'ngtemplates',
        'concat',
        'ngAnnotate',
        'copy',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin:dist',
        'connect:dist',
        'watch'
    ]);

    grunt.registerTask('dev', [
        'compass',
        'copy:dev',
        'connect:dev',
        'watch'
    ]);

    grunt.registerTask('reset', [
        'clean:reset'
    ])

}