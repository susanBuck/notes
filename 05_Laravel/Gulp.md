## Gulp Taskrunner

Resources:
	* <https://laracasts.com/lessons/gulp-this>
	* <https://github.com/gulpjs/gulp>
	* <https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started>

Gulp is a Taskrunner (another popular Taskrunner you may have heard of is Grunt).

A taskrunner is a method of automatic tasks such as minifying CSS files, concatenating JS files, etc.

Install gulp globally:

	$ npm install -g gulp

Now create a new file called  `package.json` in the root of your app (This is Node's equivalent of Composer's `composer.json` file). 

Start off your `package.json` file as a blank slate:

	{
	
	}

Now install gulp as part of your app's depndencies:

	$ npm install gulp --save-dev

You should now see a folder called `node_modules/` in your app's route.

Your `package.json` will also be updated to look like this:

	{
	  "devDependencies": {
	    "gulp": "~3.6.0"
	  }
	}

This tells Node that your app depends on gulp.
	
Let's install a plugin: a tool to minify CSS:

	$ npm install gulp-minify-css --save-dev
	
Now let's set up some tasks.

Create a new file called `gulpfile.js` in the root of your app and fill it with this starting template:

	// Pull in modules
	var gulp      = require('gulp');
	var minifycss = require('gulp-minify-css');
	
	// Set up common paths in your app
	var paths = {
	  css: 'public/css/*.css',
	  images: ''
	};
	
	// Set up task for the css minification called 'css'
	gulp.task('css', function() {
		
		// Fetch source file
		// pipe it through to minifycss()
		// pipe it through to the distnation
		return gulp.src('public/css/*.css')
			.pipe(minifycss())
			.pipe(gulp.dest('public/css/min'));
		
	});
	
	// Specify what your default tasks are... 
	// i.e what should run when you run 'gulp' in CL
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

In `public/css/example.css':

	body {
		color:red;
	}

Upon creating this file, and making any updates to it, it will re-generate itself as a minified version in `public/css/min`. 

Remember that gulp has to be running in CL in order for this watcher to keep working.


Tip: you can also run just individual tasks from gruntfile.js:

	$ gulp css