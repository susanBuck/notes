## Blank white screen

	chmod -R o+w app/storage/

ref: http://stackoverflow.com/questions/20678360/laravel-blank-white-screen


## Bus watch error on Mac Mavericks

<http://stephentvedt.com/2013/11/16/grunt-js-watch-bus-error/>


## "Error in exception handler" when running brand new Laravel App

Ensure that all the storage directories (`app/storage/*`) are writable by the web server

	sudo chmod -R 777 app/storage
	
## General error: 14 unable to open database file	
	
	sudo chmod -R 777 app/database/
	

## Class not found

	composer dump-auto