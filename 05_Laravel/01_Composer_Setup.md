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

### Check PHP for CL
Composer is a PHP command line tool. Given that, before you install Composer on Windows, you'll need to get your configurations right for running PHP from command line. To do this, **follow [these instructions](https://github.com/susanBuck/notes/blob/master/07_SysAdmin/999_PHP_from_CL.md)**.

To confirm you're ready for the next steps, test this command:

	$ php -v
	
If this outputs info about your PHP installation including version number, you're good to move on. 

<img src='http://making-the-internet.s3.amazonaws.com/sysadmin-php-v@2x.png' class='' style='max-width:892px; width:75%' alt=''>


### Check for admin privileges
Next, you're going to need to make sure you're running Cmder as *Administrator*  in order to install Composer in your *Program Files* directory.

If you're logged in as an Administrator already, you'll be good to go. Here's how to test&mdash; run this command...

	$ net session

And compare your results with this screenshot:
	
<img src='http://making-the-internet.s3.amazonaws.com/laravel-windows-admin-test@2x.png' class='' style='max-width:586px; width:75%' alt=''>

If you're *not* running as Admin, locate the Cmder app in your Program Files, right click it, and choose *Run as Administrator*. 

<img src='http://making-the-internet.s3.amazonaws.com/laravel-run-cmdr-as-admin@2x.png' class='' style='max-width:869px; width:75%' alt=''>

If you need more assistance with running apps as admin (including details on how to do it from the Windows App screen, via a pinned program, etc. [check out these instructions](http://www.eightforums.com/tutorials/9564-run-administrator-windows-8-a.html).)

Alternatively, instead of running just Cmder as an admin, you can switch Windows users to one with administrator privileges. Then everything you do will  be done as an admin.

### Install
With PHP for CL set up and admin privileges confirmed, you're ready to install Composer. Move into your *Program Files* directory where you'll install Composer:

	$ cd c:\Program Files
	
Download and install `composer.phar`:

	$ curl -sS https://getcomposer.org/installer | php	
Test it out:

	$ php composer.phar
	
You should see a bunch of details about Composer.

This works, but it only works because you're in the `c:\Program Files` directory. Create an alias so you can call it from anywhere:

	$ alias composer=php C:\PROGRA~1\composer.phar $*
	
FYI: Note how the path is `PROGRA~1` instead of `Program Files`? This is the shortfilename ([8.3 filename](http://en.wikipedia.org/wiki/8.3_filename)), which must be used since `Program Files` has a space in the name.

The `$*` at the end tells the alias to also accept any argument variables.


## Tips

__Alias__

`alias` is a command specific to Cmder. Open the file `c:\Program Files\cmder\cmder\config\aliases` to edit any existing aliases.

__openssl__

If you get a message saying *openssl* is not enabled, first identify what `php.ini` file you're using with this command:

	$ php --ini
	
Open the indicated `php.ini` file you're using and look for the following line:

	extension=php_openssl.dll

If this line has a semi-colon in front of it, it means the openssl extension is disabled; remove the semi-colon to enable and try again ([ref](http://stackoverflow.com/questions/14291151/you-must-enable-the-openssl-extension-to-download-files-via-https)).

See the notes in [PHP from CL](https://github.com/susanBuck/notes/blob/master/07_SysAdmin/999_PHP_from_CL.md) if you need more assistance with PHP CL's `php.ini` file.

