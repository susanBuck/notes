## What is Composer?

* Dependency Manager for PHP
* Command Line utility
<img src='http://making-the-internet.s3.amazonaws.com/laravel-composer-logo-in-command-line@2x.png' class='' style='max-width:776px; width:100%' alt='Composer called in command line'>

* Similar to Node's NPM and Ruby's Bundler
* Installs dependencies on a project by project basis, all configured by `composer.json`
<img src='http://making-the-internet.s3.amazonaws.com/laravel-composer-required@2x.png' class='' style='max-width:425px; width:100%' alt=''>
* Packagist <http://packagist.org>
* Powers autoloading - On-demand Class loading
* Docs <https://getcomposer.org/doc/>


## Install Composer on Mac

Move into your bin directory:
	
	$ cd /usr/local/bin
	
Download and install composer.phar:

	$ curl -sS https://getcomposer.org/installer | php 

Rename `composer.phar` to `composer` so it's easier to call:

	$ mv composer.phar composer

Test it works:

	$ composer
	
That's it for Mac users. You can move on to the next steps. Window's users, keep reading.


## Install Composer on Windows

*Before digging into these instructions, confirm you're logged into Windows as a user with **Administrator privileges**. This can generally be configured via Control Panel > User Accounts. However, it may vary across different Windows versions and you may have to search around Google for further guidance.*


### Check PHP for CL
Composer is a PHP command line tool. Given that, before you install Composer on Windows, you'll need to get your configurations right for running PHP from command line. 

To do this, follow these instructions: **[PHP from CL](https://github.com/susanBuck/notes/blob/master/07_SysAdmin/999_PHP_from_CL.md)**.

Let's make sure everything is set up as it should be.

First, where is CL PHP? It should be pointing to a php.exe in MAMP.

	$ where.exe php
	
<img src='http://making-the-internet.s3.amazonaws.com/laravel-where-php@2x.png' class='' style='max-width:520px; width:100%' alt=''>
	
Second, what `php.ini` file is CL PHP using? It should be in `c:\Windows\php.ini`

	$ php --ini

<img src='http://making-the-internet.s3.amazonaws.com/sysadmin-php-from-command-line-ini-location-set@2x.png' class='' style='max-width:533px; width:100%' alt=''>

If either of the above tests failed, revisit the **[PHP from CL](https://github.com/susanBuck/notes/blob/master/07_SysAdmin/999_PHP_from_CL.md)** doc.

No matter which php.exe you use, the key thing you need to know is what `php.ini` file is being used when running PHP from the CL. That way, if you run into any issues, you know where to find your configurations. 

Also, it should be noted that the `php.ini` file we gave you has `openssl` enabled by default, which is an extension Composer is going to require.



### Install

There's a handy installer for Window's Composer, which you can download here: <https://getcomposer.org/Composer-Setup.exe>.

Running through the installer, you should see the following screens. 

Make sure the `php.exe` path on the **third screen** matches the same MAMP php.exe you set up in the above steps. This way you know what PHP Composer is using, and you know it's using a `php.ini` file with `openssl` enabled.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-composer-install-on-windows@2x.png' class='' style='max-width:928px; width:100%' alt=''>

When the installer is complete, close and restart Cmder. 

Now, you should be able to run the `composer` command from within any directory. This works because the installer updated your PATH variable for you.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-windows-composer-confirm@2x.png' class='' style='max-width:888px; width:100%' alt=''>

That's it! Composer is installed and ready to go.


## Tips

__openssl__

If you get a message saying *openssl* is not enabled, first identify what `php.ini` file you're using with this command:

	$ php --ini
	
Open the indicated `php.ini` file you're using and look for the following line:

	extension=php_openssl.dll

If this line has a semi-colon in front of it, it means the openssl extension is disabled; remove the semi-colon to enable and try again ([ref](http://stackoverflow.com/questions/14291151/you-must-enable-the-openssl-extension-to-download-files-via-https)).

See the notes in [PHP from CL](https://github.com/susanBuck/notes/blob/master/07_SysAdmin/999_PHP_from_CL.md) if you need more assistance with PHP CL's `php.ini` file.

