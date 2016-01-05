## Preflight check

The Laravel framework has a few system requirements:

* PHP >= 5.4
* MCrypt PHP Extension

Not only do you need to meet these requirements on your server, you also need to make sure PHP from CL meets these requirements. If it doesn't, you may run into some problems when working with Composer or Laravel from the command line.

To double check the PHP version, run this command:

```bash
$ php -v
```

To make sure Mcrypt is installed, run this command to search for `mcrypt` in your `php.ini` file:

```bash
$ php -i | grep --line-number mcrypt
```

If you hit any issues with the above checks, you should revisit the docs on [setting up PHP from CL](https://github.com/susanBuck/notes/blob/master/07_SysAdmin/999_PHP_from_CL.md).

Once you've confirmed the above, you're ready to move on...


## Create a new Laravel app

There are a few different ways to spawn a new Laravel application but we'll be using Composer.

Change directories into your local Document Root where your new app will live.

For our demonstrations, we're going to build an application called *Foobooks* which will manage a library of books. Given that, our application name will be `foobooks`. Adjust this line to match what you're building.

Here's the magic command:

```bash
$ composer create-project laravel/laravel foobooks --prefer-dist
```
	
FYI: Download will take a little bit of time.

When Composer is done working, move into the newly created project directory:

```bash
$ cd foobooks
```
	
Once in this directory, run `ls -la` command; you should see all the Laravel related files in there.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-fresh-install@2x.png' class='' style='max-width:668px; width:100%' alt='Laravel fresh install'>




## Permissions
**IMPORTANT**: Laravel needs to have the ability to write to the **storage** directory, so set that permission:

```bash
$ chmod -R 777 app/storage
```

(If you want to learn more about permissions, [go here](https://github.com/susanBuck/notes/blob/master/07_SysAdmin/999_Permissions.md))




## Environment setting
By default Laravel runs in **production** mode which suppresses errors. Because we're just getting started out, we want all errors to show to help with debugging, so let's make the default environment mode **local**.

Open `/bootstrap/start.php` and replace the word `homestead` with an asterisk `*`:

```php
$env = $app->detectEnvironment(array(

	'local' => array('*'),

));
```

This is a quick and dirty fix for now. Later we'll spend an entire section on configuring environments.





## Point local server to your new app
To view your new Laravel app in your browser, you'll need to point your localhost's Document Root to the `public/` directory within your new app. 

The paths will look something like this (adjust accordingly to match your system):

Mac:
```
/applications/MAMP/htdocs/foobooks/public
```

Windows: 
```
c:\xampp\htdocs\foobooks\public
```

In MAMP you can change the Document Root via the settings:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-app-setup-document-root@2x.png' class='' style='max-width:558px; width:75%' alt=''>

In XAMP you'll change the Document Root via Apache's config file, `httpd.conf`:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-xamp-document-root@2x.png' class='' style='max-width:1087px; width:100%' alt=''>

__Save all changes and restart your server.__

If all went well, you should see Laravel's default welcome page when you hit `http://localhost` in your browser:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-app-setup-success.png?@2x' class='' style='max-width:506px; width:75%' alt=''>

Whenever configuring a server to run Laravel, always remember **the document root has to point to the `public/` folder within your app directory**.




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




