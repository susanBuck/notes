## Is PHP from CL set up?

In addition to running PHP on a server, you can also run PHP from Command Line.

To see if PHP for CL is setup, and what PHP executable (`php.exe`) CL is using, run these commands:

Mac:
```bash
$ which php
```

Windows:
```bash
$ where.exe php
```

Mac Users, your results may show CL is using a PHP executable found in `/usr/bin/php`, which is what ships with OSX by default.

Windows users, your results may show that it can't find it a PHP executable since PHP does not ship with Windows by default.

We want to fix both cases so that your PHP from CL is using the same PHP you use on your local server (MAMP or XAMPP). Here's how...


## Mac: PHP from CL
First, identify the location of a PHP executable (`php.exe`) within MAMP's bin folders.

As of this writing, we're working with `php5.5.5.15` so we located this PHP executable:

```bash
/Applications/MAMP/bin/php/php5.5.14/bin/php.exe
```

Now that you know where your `php.exe` is, you want to update your **PATH variable** via `~/.bashrc` so it can be found:

```bash
export PATH=$PATH:"/Applications/MAMP/bin/php/php5.5.15/bin/"
```

If any of the above is confusing, re-read in the instructions on editing PATH variables.

Save `~/.bashrc` and restart Terminal.

Check which PHP is now being used in CL:

```bash
$ which php
/Applications/MAMP/bin/php/php5.5.14/bin/php
```

You can also verify the same `php.ini` file that your MAMP server uses is now being used by PHP in CL:

```bash
$ php --ini
Configuration File (php.ini) Path: /Applications/MAMP/bin/php/php5.5.14/conf
Loaded Configuration File:         /Applications/MAMP/bin/php/php5.5.14/conf/php.ini
Scan for additional .ini files in: (none)
Additional .ini files parsed:      (none)
```

If the above commands work as expected, you have confirmed that you can execute PHP from the command line.




## Windows: PHP from CL
Before digging into these instructions, confirm you're logged into Windows as a user with **Administrator privileges**. This can generally be configured via *Control Panel > User Accounts*. However, it may vary across different Windows versions and you may have to search around Google for further guidance.

In addition to logging in to Windows as an administrator, you may have to explicitly load Cmder as an admin. To do this, right click the Cmder icon and choose *Run as Administrator*.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-run-cmder-as-admin@2x.png' class='' style='max-width:869px; width:100%' alt='Run Cmder as Administrator'>

### Where is php.exe?

First, identify the location of a PHP executable (`php.exe`). Assuming you have XAMPP installed, you should find one in `c:\XAMPP\php`.

Once you know where `php.exe` lives, you can add its directory to your **PATH variable**, which is covered in full details in the previous instructions, [PATH Variable](04_PATH-Variable.md).

After you've added the appropriate path, restart Cmder and test it out...

This command will tell you where PHP is loading from:

```bash
$ where.exe php
```

<img src='http://making-the-internet.s3.amazonaws.com/laravel-where-php@2x.png' class='' style='max-width:516px; width:100%' alt=''>

And this command will tell you what version of PHP you're running

```bash
$ php -v
```

<img src='http://making-the-internet.s3.amazonaws.com/laravel-php-v@2x.png' class='' style='max-width:509px; width:100%' alt=''>

You can also verify the same `php.ini` file that your XAMPP server uses is now being used by PHP in CL:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-xampp-win-ini-location@2x.png' class='' style='max-width:536px; width:100%' alt=''>

If the above commands work as expected, you have confirmed that you can execute PHP from the command line.





## Tips:
All CL PHP info (equivalent of `phpinfo()`)

```bash
$ php -i
````

See what `php.ini` file CL is using when running PHP from CL:
```bash
$ php --ini
```

Use *[grep](http://ss64.com/bash/grep.html)* to search for something specific in PHP info:
For example, search for &ldquo;php.ini&rdquo;:

```bash
$ php -i | grep --ignore-case --line-number php.ini
```






## Reference
+ [SO: Adding directory to PATH Environment Variable in Windows](http://stackoverflow.com/questions/9546324/adding-directory-to-path-environment-variable-in-windows)
+ [PHP Configuration file (php.ini)](http://nl3.php.net/manual/en/configuration.file.php)

<!--
Run PHP with a specific `php.ini` file
$ php -c C:\MAMP\conf\php5.5.7\php.ini
-->
