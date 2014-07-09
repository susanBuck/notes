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

If the above procedure doesn't work, scroll down to see if your issue is listed in the *Common Problems* section.

---

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

No matter which `php.exe` you use, the key thing you need to know is *which* `php.ini` file is being used when running PHP from the CL. That way, if you run into any issues, you know where to find your configurations. 

Also, it should be noted that the `php.ini` file we gave you has `openssl` enabled by default, which is an extension you're going to need.




### Install

There's a handy installer for Window's Composer, which you can download here: <https://getcomposer.org/Composer-Setup.exe>.

Running through the installer, you should see the following screens. 

Make sure the `php.exe` path on the **third screen** matches the same MAMP php.exe you set up in the above steps. This way you know what PHP Composer is using, and you know it's using a `php.ini` file with `openssl` enabled.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-composer-install-on-windows@2x.png' class='' style='max-width:928px; width:100%' alt=''>

When the installer is complete, close and restart Cmder. 

Now, you should be able to run the `composer` command from within any directory. This works because the installer updated your PATH variable for you.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-windows-composer-confirm@2x.png' class='' style='max-width:888px; width:100%' alt=''>

That's it! Composer is installed and ready to go.

If the above procedure doesn't work, scroll down to see if your issue is listed in the *Common Problems* section.




## Common Issues

*The following is a work in progress and will be updated to reflect common issues and solutions as identified in Piazza.*.

### Issue: openssl

__Symptoms:__ You get a message saying *openssl* is not enabled.

__Solution:__ Identify what `php.ini` file you're using with this command:

	$ php --ini
	
Open the indicated `php.ini` file and make sure the following line is not commented out (i.e. it does *not* have a semi-colon in front of it:

	extension=php_openssl.dll




### Issue: SSL Certificate problem

__Symptoms:__ (Mac) When downloading Composer (via the `curl -sS https://getcomposer.org/installer | php` command), you receive an error regarding SSL certificates:

	curl: (60) SSL certificate problem: unable to get local issuer certificate
	More details here: http://curl.haxx.se/docs/sslcerts.html
	curl performs SSL certificate verification by default, using a "bundle"
	 of Certificate Authority (CA) public keys (CA certs). If the default
	 bundle file isn't adequate, you can specify an alternate file
	 using the --cacert option.
	If this HTTPS server uses a certificate signed by a CA represented in
	 the bundle, the certificate verification probably failed due to a
	 problem with the certificate (it might be expired, or the name might
	 not match the domain name in the URL).
	If you'd like to turn off curl's verification of the certificate, use
	 the -k (or --insecure) option.

__Solution__: [[Pending](https://piazza.com/class/ht1cmoh734q7lz?cid=83)] 


### Issue: Permission Denied

__Symptoms:__ (Mac) You're in your `/usr/local/bin` directory and you run the command to download Composer (`curl -sS https://getcomposer.org/installer | php`). The download fails citing *failed to open stream: Permission denied*.

__Solution:__ [[Pending](https://piazza.com/class/ht1cmoh734q7lz?cid=79)]




