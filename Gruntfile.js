/*!
 *   Copyright 2014-2015 CoNWeT Lab., Universidad Politecnica de Madrid
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */


module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        isDev: grunt.option('target') === 'release' ? '' : '-dev',

        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src/js', src: '*', dest: 'build/src/js'}
                ]
            }
        },

        strip_code: {
            multiple_files: {
                src: ['build/src/js/**/*.js']
            }
        },

        compress: {
            widget: {
                options: {
                  archive: 'dist/<%= pkg.vendor %>_<%= pkg.name %>_<%= pkg.version %><%= isDev %>.wgt',
                  mode: 'zip',
                  level: 9,
                  pretty: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: [
                            'css/**/*',
                            'doc/**/*',
                            'images/**/*',
                            'index.html',
                            'config.xml'
                        ]
                    },
                    {
                        expand: true,
                        cwd: 'build/lib',
                        src: [
                            'lib/**/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: 'build/src',
                        src: [
                            'js/**/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.',
                        src: [
                            'LICENSE'
                        ]
                    }
                ]
            }
        },

        clean: {
            build: {
                src: ['build', 'dist']
            },
            temp: {
                src: ['build/src']
            }
        },

        replace: {
            version: {
                overwrite: true,
                src: ['src/config.xml'],
                replacements: [{
                    from: /version=\"[0-9]+\.[0-9]+\.[0-9]+(-dev)?\"/g,
                    to: 'version="<%= pkg.version %>"'
                }]
            }
        },

        jscs: {
            src: 'src/js/**/*',
            options: {
                config: ".jscsrc"
            }
        },

        jshint: {
            options: {
                jshintrc: true
            },
            all: {
                files: {
                    src: ['src/js/**/*.js']
                }
            },
            grunt: {
                options: {
                    jshintrc: '.jshintrc-node'
                },
                files: {
                    src: ['Gruntfile.js']
                }
            },
            test: {
                options: {
                    jshintrc: '.jshintrc-jasmine'
                },
                files: {
                    src: ['src/test/**/*.js', '!src/test/fixtures/']
                }
            }
        },

        karma: {
          headless: {
            configFile: 'karma.conf.js',
            options: {
              browsers: ['PhantomJS']
            }
          },

          all: {
            configFile: 'karma.conf.js'
          },

          debug: {
            configFile: 'karma.conf.js',
            options: {
              preprocessors: [],
              singleRun: false
            }
          }
        },

        wirecloud: {
          publish: {
            file: 'build/<%= pkg.vendor %>_<%= pkg.name %>_<%= pkg.version %>-dev.wgt'
          }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-jscs");
    grunt.loadNpmTasks('grunt-strip-code');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-wirecloud');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('test', [
        'jshint:grunt',
        'jshint',
        'jscs',
        'karma:headless'
    ]);

    grunt.registerTask('default', [
        'test',
        'clean:temp',
        'copy:main',
        'strip_code',
        'replace:version',
        'compress:widget'
    ]);

};
