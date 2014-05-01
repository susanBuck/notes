## Gulp Taskrunner

Resources:
	* [Laracasts: Gulp This](https://laracasts.com/lessons/gulp-this)
	* [Gulp on Github](https://github.com/gulpjs/gulp)
	* [Gulp Getting Started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started)
	* [Gulp.js Plugins Search](http://gulpjs.com/plugins/)

Assumptions: You've already installed Node and have access to npm

Gulp is a Taskrunner (another popular Taskrunner you may have heard of is Grunt).

A taskrunner is a method of automatic tasks such as minifying CSS files, concatenating JS files, etc.

Install gulp globally:

	$ npm install -g gulp

Now create a new file called  `package.json` in the root of your app (This is Node's equivalent of Composer's `composer.json` file). 

Start off your `package.json` file as a blank slate:

	{
	
	}

Now install gulp as part of your app's dependencies:

	$ npm install gulp --save-dev
	
The `--save-dev` flag indicates we only need this dependency for development, i.e. we don't need it on our production server.
This will add it in devDependencies in `package.json`

You should now see a folder called `node_modules/` in your app's route.

Your `package.json` will also be updated to look like this:

	{
	  "devDependencies": {
	    "gulp": "~3.6.0"
	  }
	}

This tells Node that your app depends on gulp.
	
	
		
## Plugins
Let's install a plugin to practice with; we'll use a minification plugin that we'll use to minify CSS files: <https://www.npmjs.org/package/gulp-minify-css/>

	$ npm install gulp-minify-css --save-dev
	
Now let's set up some tasks.

Create a new file called `gulpfile.js` in the root of your app and fill it with this starting template:

	// Pull in modules
	var gulp      = require('gulp');
	var minifycss = require('gulp-minify-css');
	
	// Set up task for the css minification called 'css'
	gulp.task('css', function() {
	
	// Fetch source files
	// pipe them through to minifycss()
	// pipe them through to the distnation
	return gulp.src('public/css/*.css')
		.pipe(minifycss())
		.pipe(gulp.dest('public/css/min'));
	});
	
	// Specify what your default tasks are... i.e what should run when you run 'gulp' in CL
	// Our tasks here are 'css' and 'watch'
	gulp.task('default', ['css','watch']);
	
	// Set up watch task
	gulp.task('watch', function() {
	
	// Watch the css folder, and upon updates run the css task
	gulp.watch(paths.css, ['css']);
	
	});
		
Read through the comments to understand what that file is doing.

To run your tasks and start and watches just run gulp:

	$ gulp
	
This should:

	1. Run the task 'css'
	2. Run the task 'watch', which will continue to run in CL

If you had any .css files already in `public/css/` there should now be a minified copy of them in `public/css/min/`. If you didn't have any files to start, create one...

Make an edit to one of your .css files, and you should note the minified version gets updated.

Remember that gulp has to be running in CL in order for this watcher to keep working.


# Tips:

You can run individual tasks from gruntfile.js:

	$ gulp css
	
You can throw `console.logs` into your gulpfile.js for debugging. Example:

	console.log('Minified CSS...');
	
