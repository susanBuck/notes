## Install Composer on Mac

Move into your bin directory:
	
	$ cd /usr/local/bin
	
Download and install composer.phar:

	$ curl -sS https://getcomposer.org/installer | php 

Rename `composer.phar` to `composer` so it's easier to call:

	$ mv composer.phar composer

Test it works:

	$ composer
	



## Install Composer on Windows

Move into your Program Files directory where you'll install Composer:

	$ mv c:\Program Files
	
Download and install composer.phar:

	$ curl -sS https://getcomposer.org/installer | php	
Test it out:

	$ php composer.phar
	
You should see a bunch of details about Composer.

This works, but it only works because you're in the `c:\Program Files` directory. Create an alias so you can call it from anywhere:

	$ alias composer=php C:\PROGRA~1\composer.phar $*
	
FYI: Note how the path is `PROGRA~1` instead of `Program Files`? This is the shortfilename ([8.3 filename](http://en.wikipedia.org/wiki/8.3_filename)), which must be used since `Program Files` has a space in the name.

The `$*` at the end tells the alias to also accept any argument variables.


## Tips

`alias` is a command specific to Cmder. Open the file `c:\Program Files\config\aliases` to edit any existing aliases.

If you get a message saying *openssl* is not enabled, open the `php.ini` file you're using and look for the following line:

	extension=php_openssl.dll

If this line has a semi-colon in front of it, it means the openssl extension is disabled; remove the semi-colon to enable and try again ([ref](http://stackoverflow.com/questions/14291151/you-must-enable-the-openssl-extension-to-download-files-via-https)).

See the notes in SysAdmin/PHP_From_CL if you need more assistance with PHP CL's php.ini file.

