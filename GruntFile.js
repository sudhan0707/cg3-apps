/**
 * Created by sgnaneshwar on 1/19/17.
 */
'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    defaultAssets = require('./config/assets/default'),
    testAssets = require('./config/assets/tests'),
    //testConfig = require('./config/env/test'),
    fs = require('fs'),
    path = require('path');

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        env: {
            test: {
                NODE_ENV: 'test'
            },
            dev: {
                NODE_ENV: 'development'
            },
            prod: {
                NODE_ENV: 'production'
            }
        },
        watch: {
            serverViews: {
                files: defaultAssets.server.views,
                options: {
                    livereload: true
                }
            },
            serverJS: {
                files: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.allJS),
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientViews: {
                files: defaultAssets.client.views,
                tasks: ['index:build'],
                options: {
                    livereload: true
                }
            },
            clientJS: {
                files: defaultAssets.client.js,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientCSS: {
                files: defaultAssets.client.css,
                tasks: ['csslint'],
                options: {
                    livereload: true
                }
            },
            clientSCSS: {
                files: defaultAssets.client.sass,
                tasks: ['sass', 'csslint'],
                options: {
                    livereload: true
                }
            },
            clientLESS: {
                files: defaultAssets.client.less,
                tasks: ['less', 'csslint'],
                options: {
                    livereload: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    nodeArgs: ['--debug'],
                    ext: 'js,html',
                    watch: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.views, defaultAssets.server.allJS, defaultAssets.server.config)
                }
            }
        },
        concurrent: {
            default: ['nodemon', 'watch'],
            debug: ['nodemon', 'watch', 'node-inspector'],
            live: ['connect:livereload', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        jshint: {
            all: {
                src: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.allJS, defaultAssets.client.js, testAssets.tests.server, testAssets.tests.client, testAssets.tests.e2e),
                options: {
                    jshintrc: true,
                    node: true,
                    mocha: true,
                    jasmine: true
                }
            }
        },
        eslint: {
            options: {},
            target: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.allJS, defaultAssets.client.js, testAssets.tests.server, testAssets.tests.client, testAssets.tests.e2e)
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            all: {
                src: defaultAssets.client.css
            }
        },
        ngAnnotate: {
            production: {
                files: {
                    'public/dist/application.js': defaultAssets.client.js
                }
            }
        },
        uglify: {
            production: {
                options: {
                    mangle: false
                },
                files: {
                    'public/dist/application.min.js': 'public/dist/application.js'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'public/dist/application.min.css': defaultAssets.client.css
                }
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    src: defaultAssets.client.sass,
                    ext: '.css',
                    rename: function (base, src) {
                        return src.replace('/scss/', '/css/');
                    }
                }]
            }
        },
        less: {
            dist: {
                files: [{
                    expand: true,
                    src: defaultAssets.client.less,
                    ext: '.css',
                    rename: function (base, src) {
                        return src.replace('/less/', '/css/');
                    }
                }]
            }
        },
        index:{
          build:{
              dir: defaultAssets.client.destination,
              src: _.union(defaultAssets.client.lib.js, defaultAssets.client.js, defaultAssets.client.lib.css, defaultAssets.client.css)
          }
        },
        'node-inspector': {
            custom: {
                options: {
                    'web-port': 1337,
                    'web-host': 'localhost',
                    'debug-port': 5858,
                    'save-live-edit': true,
                    'no-preload': true,
                    'stack-trace-limit': 50,
                    'hidden': []
                }
            }
        },
        mochaTest: {
            src: testAssets.tests.server,
            options: {
                reporter: 'spec',
                timeout: 10000
            }
        },
        mocha_istanbul: {
            coverage: {
                src: testAssets.tests.server,
                options: {
                    print: 'detail',
                    coverage: true,
                    require: 'test.js',
                    coverageFolder: 'coverage/server',
                    reportFormats: ['cobertura', 'lcovonly'],
                    check: {
                        lines: 40,
                        statements: 40
                    }
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        protractor: {
            options: {
                configFile: 'protractor.conf.js',
                noColor: false,
                webdriverManagerUpdate: true
            },
            e2e: {
                options: {
                    args: {} // Target-specific arguments
                }
            }
        },
        copy: {
            localConfig: {
                src: 'config/env/local.example.js',
                dest: 'config/env/local.js',
                filter: function () {
                    return !fs.existsSync('config/env/local.js');
                }
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729

            },
            livereload: {
                options: {
                    open: true,
                    keepalive: true,
                    middleware: function (connect) {
                        return [
                            connect().use(
                                '/public/lib',
                                connect.static('./public/lib')
                            ),
                            connect().use(
                                '/' + defaultAssets.client.destination,
                                connect.static('./' + defaultAssets.client.destination )
                            ),
                            connect.static(defaultAssets.client.destination)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: 'dist'
                }
            }
        }
    });

    grunt.event.on('coverage', function (lcovFileContents, done) {
        // Set coverage config so karma-coverage knows to run coverage
        testConfig.coverage = true;
        require('coveralls').handleInput(lcovFileContents, function (err) {
            if (err) {
                return done(err);
            }
            done();
        });
    });

    var filterForExtensions = function(extension, files, dir){
        var regex = new RegExp('\\.'+ extension +'$');

        return files.filter(function(file){
            return file.match(regex);
        })
    };

    grunt.registerMultiTask('index','Process index.html template', function(){
        var jsFiles = filterForExtensions('js', this.filesSrc),
            cssFiles = filterForExtensions('css', this.filesSrc);

        grunt.file.copy(defaultAssets.client.index, this.data.dir + '/index.html', {
           process: function( contents, path){
               return grunt.template.process(contents, {
                  data: {
                      scripts: jsFiles,
                      styles: cssFiles
                  }
               });
           }
        });

    });

// Load NPM tasks
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-protractor-coverage');
    // Lint CSS and JavaScript files.
    grunt.registerTask('lint', [ 'less', 'jshint', 'eslint', 'csslint']);

    // Lint project files and minify them into two production files.
    grunt.registerTask('build', ['env:dev', 'lint', 'ngAnnotate', 'uglify', 'cssmin']);

    // Run the project tests
    grunt.registerTask('test', ['env:test', 'lint', 'mkdir:upload', 'copy:localConfig', 'server', 'mochaTest', 'karma:unit', 'protractor']);
    grunt.registerTask('test:server', ['env:test', 'lint', 'server', 'mochaTest']);
    grunt.registerTask('test:client', ['env:test', 'lint', 'karma:unit']);
    grunt.registerTask('test:e2e', ['env:test', 'lint', 'dropdb', 'server', 'protractor']);
    // Run project coverage
    grunt.registerTask('coverage', ['env:test', 'lint', 'mocha_istanbul:coverage', 'karma:unit']);

    // Run the project in development mode
    grunt.registerTask('default', ['env:dev', 'lint', 'mkdir:upload', 'copy:localConfig', 'concurrent:default']);

    // Run the project in development mode in live
    grunt.registerTask('live', ['index:build', 'concurrent:live']);

    // Run the project in debug mode
    grunt.registerTask('debug', ['env:dev','lint', 'copy:localConfig', 'concurrent:debug']);

    // Run the project in production mode
    grunt.registerTask('prod', ['build', 'env:prod', 'mkdir:upload', 'copy:localConfig', 'concurrent:default']);

};


