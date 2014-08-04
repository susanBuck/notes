## Is PHP for CL set up?

Let's see if you already have the ability to run PHP from CL.

Mac or Windows, run this command:

	$ php -v
	
If it reports back on the version of PHP, you're all set and you don't need to do anything else in this doc.

If, however, it says the command is not found, you have some configuring to do. 

The following instructions are Windows-centric, as PHP is installed by default on Mac computers.

Before digging into these instructions, confirm you're logged into Windows as a user with **Administrator privileges**. This can generally be configured via *Control Panel > User Accounts*. However, it may vary across different Windows versions and you may have to search around Google for further guidance.




## Where is php.exe?
First: Locate a copy of `php.exe`. Assuming you have MAMP installed, you should find one in `C:\MAMP\bin\php\php5.5.7\` (replace the version number with whichever you want to use). 

To test this out, try the `-v` flag again, this time specifying the full path to php:

	$ C:\MAMP\bin\php\php5.5.7\php.exe -v

If this doesn't report back on the version of PHP, dig around your `C:\MAMP\bin\php` folder for a copy of `php.exe`.

Now that you know where `php.exe` lives, you can add its directory to your *PATH variable*...





## Add php to your PATH variable

**What is a PATH variable?** When you run a command in the CL, it looks for the corresponding executable file using the directories listed in your *PATH variables* as a map. 

Given this, when you add a new executable, you may need to specify its directory in your PATH variable. 

Mac users, this command will show you your PATH variable:

	$ echo $PATH
	
Windows users, this command will show you your PATH variable:

	$ PATH

To edit your PATH variable on a Mac, follow these instructions: [Mac OSX Change Path Variables](http://www.tech-recipes.com/rx/2621/os_x_change_path_environment_variable/).

Windows users, to edit your PATH variable navigate to the following menu:

__My Computer > Properties > Advanced > Environment Variables__

In the *Environment Variables* screen look for `Path` under *System variables*:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-getting-to-path-on-windows@2x.png' class='' style='max-width:939px; width:100%' alt=''>

Each path in your PATH variable is separated by a semi-colon. Here's an example:

	%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;%SYSTEMROOT%\System32\WindowsPowerShell\v1.0\;C:\Program Files\Git\cmd;C:\Program Files\nodejs\;

Since you now know that there's a `php.exe` in `C:\MAMP\bin\php\php5.5.7\` you want to add this directory to your PATH variable:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-setting-path-variable-on-windows.png?@2x' class='' style='max-width:1371px; width:100%' alt=''>

Tip: The text input for editing the PATH variable is small and hard to work with... Copy your variable to a text editor to work with it there, then paste it back when you're done.

Make sure you end your path with a trailing backslash. The idea is to point to the directory where `php.exe` can be found, not the actual `php.exe` file..

Ok/Save your changes.

Restart your Cmder.

Test it out:

This command will tell you where PHP is loading from:

	$ where.exe php
	
<img src='http://making-the-internet.s3.amazonaws.com/laravel-where-php@2x.png' class='' style='max-width:520px; width:100%' alt=''>
	
And this command will tell you what version of PHP you're running

	$ php -v
	
<img src='http://making-the-internet.s3.amazonaws.com/laravel-php-v@2x.png' class='' style='max-width:520px; width:100%' alt=''>
	
If the above two commands work, you have confirmed that you can execute PHP from the command line.





## Specify your php.ini file

To see what `php.ini` file CL is using when running PHP from CL, run this command:

```bash
$ php --ini
```
	
You should see that it's looking in `c:\Windows` by default:

<img src='http://making-the-internet.s3.amazonaws.com/sysadmin-php-from-command-line-ini-location@2x.png' class='' style='max-width:520px; width:100%' alt=''>

Given this, you need to create a `php.ini` file in `c:\Windows`. 

For the contents of this file, copy the text from our example: [php.ini template](https://gist.github.com/susanBuck/73f7ca03344331fb9edf). This `php.ini` file has a variable called `extension_dir` which is set to `C:\MAMP\bin\php\php5.5.7\ext\`; if you're using a different PHP version you should update it accordingly.

If you have any access issues creating your `php.ini` file in `c:\Windows`, you can try the following workarounds:

1. Create the `php.ini` file in a place you have access, like your Documents folder, then *move* it into `c:\Windows`.

2. Right click on Notepad and choose the option to *Open as Administrator*. Once you're running Notepad as an admin, you should be able to save the file with `c:\Windows`.

Once you've got `c:\Windows\php.ini` created and saved, check your ini settings again and confirm the *Loaded Configuration File* is `c:\Windows\php.ini`:

```bash
$ php --ini
```
	
<img src='http://making-the-internet.s3.amazonaws.com/sysadmin-php-from-command-line-ini-location-set@2x.png' class='' style='max-width:533px; width:100%' alt=''>

Moving forward, remember that whenever you use PHP from the CL it's loading this particular configuration file. 





## Tips:
All PHP info (equivalent of `phpinfo()`)

```bash
$ php -i
````

Use *grep* to search for something specific in PHP info:
For example, search for &ldquo;php.ini&rdquo;:

```bash
$ php -i | grep php.ini
```





## Reference
+ [SO: Adding directory to PATH Environment Variable in Windows](http://stackoverflow.com/questions/9546324/adding-directory-to-path-environment-variable-in-windows)
+ [How to set path and environment variables in Windows](http://www.computerhope.com/issues/ch000549.htm)
+ [PHP Configuration file (php.ini)](http://nl3.php.net/manual/en/configuration.file.php)

<!--
Run PHP with a specific `php.ini` file
$ php -c C:\MAMP\conf\php5.5.7\php.ini
-->