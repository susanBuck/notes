## Preflight check

The Laravel framework has a few system requirements:

* PHP >= 5.4
* MCrypt PHP Extension

In addition to making sure your MAMP server is running PHP >= 5.4, you also need to make sure your PHP for CL setup is up to date.

To confirm your system meets these requirements, find out what PHP executable your system uses when called from the command line...

Mac:

```php
$ which php
```
	
Windows/Cmder:

```php
$ where.exe php
```
	
<img src='http://making-the-internet.s3.amazonaws.com/laravel-confirm-php@2x.png' class='' style='max-width:951px; width:100%' alt='Laravel confirm PHP is installed'>

The results above indicate the `php` command is using MAMP's install of PHP and  the version number is > 5.4.

You can also confirm your version number with this command:

```
$ php -v
```
	
If the above test reveals you're not using MAMP's php.exe, you can switch it following the [PHP for CL doc](https://github.com/susanBuck/notes/blob/master/07_SysAdmin/999_PHP_from_CL.md) which covers how to add MAMP's PHP to your PATH.

If you're using MAMP's php.exe, the **MCrypt extension** required by Laravel will be installed by default. If you use a different PHP, though, you'll need to make sure that extension is running.

### Tips / Notes

* It's not absolutely necessary that you use MAMP's php.exe. You may already have another build of PHP on your system that you wish to use. The above outline is suggested for beginner users; advanced users are welcome to configure your systems however you'd like.

* The command `php --info` will dump out all sorts of info about your php install, including version number and active extensions. This command is the equivalent to running `phpinfo();` in a PHP script.




## Create a new Laravel app

With PHP configured and Composer installed, it's time to spawn your first Laravel app.
	
Change directories into your local document root and use the `composer create-project` command to create a new Laravel app. 

For our demonstrations, we're going to build an application called *Foobooks* which will manage a library of books. Given that, our application name will be `foobook`. Adjust this line to match what you're building.

```bash
$ composer create-project laravel/laravel foobook --prefer-dist
```
	
FYI: Download will take a little bit of time.

When composer is done working, move into the newly created project directory:

```bash
$ cd foobook

```
	
Once in this directory, run `ls -la` command; you should see all the Laravel related files in there.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-fresh-install@2x.png' class='' style='max-width:780px; width:100%' alt='Laravel fresh install'>

**IMPORTANT**: Laravel needs to have the ability to write to the **storage** directory, so set that permission:

```bash
$ chmod -R 777 app/storage
```

(If you want to learn more about permissions, [go here](https://github.com/susanBuck/notes/blob/master/07_SysAdmin/999_Permissions.md))




## Environment setting
By default Laravel runs in `production` mode which suppresses errors. Because we're just getting started out, we want all errors to show to help with debugging, so let's make the default environment mode `local`.

Open `/bootstrap/start.php` and replace the word `homestead` with an asterisk `*`:

```php
$env = $app->detectEnvironment(array(

	'local' => array('*'),

));
```

This is a quick and dirty fix for now. Later we'll spend an entire section on configuring environments.





## Point local server to your new app
To view your new Laravel app on your browser, you'll need to point your localhost's document root to the `public/` directory within your new app. 

The paths will look something like this (adjust accordingly to match your system):

Mac:
```
/Users/YourName/Documents/Sites/foobook/public
```

Windows: 
```
c:\MAMP\htdocs\foobook\public
```

Once you've determined your path, make the change in MAMP:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-app-setup-document-root@2x.png' class='' style='max-width:558px; width:75%' alt=''>

__Save all changes and restart your server.__

If all went well, you should see Laravel's default welcome page when you hit `http://localhost` in your browser:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-app-setup-success.png?@2x' class='' style='max-width:506px; width:75%' alt=''>

Whenever configuring a server to run Laravel, always remember ***the document root has to point to the `public/` folder within your app directory**.




## Version Control your new app

In your project, initiate a new Git repository:

```bash
$ git init
```
	
### Github

Create a new repository at Github.com. When doing this, do *not* initialize the repository with a `README.md` file because you'll be working with a repository that has already been initialized.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-foobook-repo@2x.png' class='' style='max-width:835px; width:100%' alt=''>

Note the Git SSH URL, for example, `git@github.com:username/foobook`

In your project directory, add a new remote origin called `github`, for example:

```bash
$ git remote add github git@github.com:username/foobook.git	
```
	
### First commit
Run git status to see all your untracked files:

```bash
$ git status
```
	
Add all your files for committing:

```bash
$ git add --all
```
	
Commit these changes:

```bash
$ git commit -m "First commit"
```

Push your project up to Github:

```bash
$ git push github master
```

When you visit your repository on Github you should see all your changes there. 

Your app is now set up locally and ready for development. In the next section, we'll cover the procedure for deploying your app to a live server.




