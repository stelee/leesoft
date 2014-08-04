module.exports = function(grunt)
{
	grunt.initConfig({
		hogan: {
	      publish: {
	        options: {
	          prettify: true,
	          commonJsWrapper: true,
	          defaultName: function(file) {
	            return file.toUpperCase();
	          }
	        },
	        files:{
	          "app/views/templates.js": ["templates/**/*.html"]
	        }
	      }
	    }
	})
	grunt.loadNpmTasks('grunt-templates-hogan');
	grunt.registerTask('hogan',['hogan'])
}