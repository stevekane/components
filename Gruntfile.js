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

    less: {
      compile: {
        options: {
          paths: ["public/stylesheets", "public/vendor/bootstrap/less"]
        },
        files: {
          "public/dist/index.css": "public/stylesheets/index.less"
        }
      } 
    },
     

    browserify: {
      dist: {
        files: {
          "public/dist/components.js": ["public/source/main.js"]
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

      styles: {
        files: "public/stylesheets/**/*.less",
        tasks: ["less"],
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
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.registerTask("default", [
    "emberTemplates", 
    "browserify",
    "less",  
    "watch"
  ]);
};
