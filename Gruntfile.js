module.exports = function(grunt) {

    require('jit-grunt')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                mangle: true,
                banner: '/*!\n' +
                ' * <%= pkg.name %> - <%= pkg.description %>\n' +
                ' * <%= pkg.homepage %>\n' +
                ' * Version: <%= pkg.version %>\n' +
                ' * <%= pkg.author %>\n' +
                ' */\n'
            },
            default: {
                files: {
                    './handleit/handleit.min.js': [ './handleit/handleit.js' ]
                }
            }
        },

        watch: {
            default: {
                files: './handleit/handleit.js',
                tasks: [ 'uglify' ]
            }
        }

    });

    grunt.registerTask('default', ['uglify']);

};