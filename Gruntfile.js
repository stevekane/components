var path = require('path');

module.exports = function (grunt) {
  grunt.initConfig({
    emberTemplates: {
      compile: {
        options: {
           templateBasePath: /public\/templates\//
        },
        files: {
          "public/dist/templates.js": "public/templates/**/*.handlebars",
        } 
      } 
    },

    browserify: {
      dist: {
        files: {
          "public/dist/components.js": ["public/source/ember.js"]
        }
      } 
    },

    watch: {
      scripts: {
        files: ["public/source/**/*.js", "modules/**/*.js"], 
        tasks: ["browserify"],
        options: {
          livereload: true 
        }
      },
      templates: {
        files: ["public/templates/**/*.handlebars"],
        tasks: ["emberTemplates"],
        options: {
          livereload: true 
        }
      } 
    }
  });

  grunt.loadNpmTasks("grunt-ember-templates");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.registerTask("default", [
    "emberTemplates", 
    "browserify",
    "watch"
  ]);
};
