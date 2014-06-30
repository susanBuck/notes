## Preflight check

The Laravel framework has a few system requirements:

* PHP >= 5.4
* MCrypt PHP Extension

To confirm your system meets these requirements, find out what install of `php.exe` command line is using when you use the `php` command...

Mac:

	$ which php
	
Windows/Cmder:

	$ where.exe php
	
<img src='http://making-the-internet.s3.amazonaws.com/laravel-confirm-php@2x.png' class='' style='max-width:951px; width:100%' alt='Laravel confirm PHP is installed'>

The results above indicate the `php` command is using MAMP's install of PHP. Also, the version number is > 5.4.

You can also confirm your version number with this command:

	$ php -v
	
If the above test reveals you're not using MAMP's PHP, you can switch it following the [PHP for CL doc](https://github.com/susanBuck/notes/blob/master/07_SysAdmin/999_PHP_from_CL.md) which covers how to add MAMP's PHP to your PATH.

If you're using MAMP's php.exe, the **MCrypt extension** required by Laravel will be installed by default. If you use a different php.exe, though, you'll need to make sure that extension is running.

### Tips / Notes

* It's not absolutely necessary that you use MAMP's php.exe. You may already have another build of PHP on your system that you wish to use. The above outline is suggested for beginner users; advanced users are welcome to configure your systems however you'd like.

* The `php --info` will dump out all sorts of info about your php install, including version number and active extensions. This command is the equivalent to running `phpinfo();` in a PHP script.




## Create a new Laravel app

With PHP configured and Composer installed, it's time to spawn your first Laravel app.
	
Change directories into your local document root and use the `composer create-project` command to create a new Laravel app (replace `foobar` with the desired name of your app):

	$ composer create-project laravel/laravel foobar --prefer-dist
	
FYI: Download will take a little bit of time.

When composer is done working, move into the newly created project directory:

	$ cd foobar
	
Once in this directory, run `ls -la` command; you should see all the Laravel related files in there.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-fresh-install.png?@2x' class='' style='max-width:839px; width:75%' alt=''>

Laravel needs to have the ability to write to the storage directory, so set that permission:

	$ chmod -R 777 app/storage

(If you want to learn more about permissions, [go here](https://github.com/susanBuck/notes/blob/master/07_SysAdmin/999_Permissions.md))




## Environment setting
By default Laravel runs in `production` mode which suppresses errors. Because we're just getting started out, we want all errors to show to help with debugging, so let's make the default environment mode `local`.

Open `/bootstrap/start.php` and replace the word `homestead` with an asterisk `*`:

	$env = $app->detectEnvironment(array(

		'local' => array('*'),

	));

This is a quick and dirty fix for now. Later we'll spend an entire section on configuring environments.





## Point local server to your new app
To view your new Laravel app on your browser, you'll need to point your localhost's document root to the `public/` directory within your new app. The paths will look something like this (adjust accordingly to match your system):

Mac:
	
	/Users/YourName/Documents/Sites/foobar/public

Windows: 

	c:\MAMP\htdocs\foobar\public

Once you've determined your path, make the change in MAMP:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-app-setup-document-root.png?@2x' class='' style='max-width:664px; width:75%' alt=''>

While you're in your MAMP settings, confirm your PHP version is set to something >= PHP 5.4.

If all went well, you should see Laravel's default welcome page when you hit `http://localhost` in your browser:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-app-setup-success.png?@2x' class='' style='max-width:506px; width:75%' alt=''>

### Tips
* If `http://localhost` doesn't work, check what your *Ports* are set to in MAMP. The Apache port has to be 80 for `http://localhost` to work. Otherwise, you have to specify the specific port, for example `http://localhost:8888`




## Version Control your new app

In your app directory, initiate a new Git repository:

	$ git init
	
### Github
Create a new repository at Github. When doing this, do *not* initialize the repository with a `README.md` file, since you'll be working with a repository that has already been initialized.

Note the SSH URL, for example, `git@github.com:username/foobar.git`

In your project directory, add a new remote origin called `github`, for example:

	$ git remote add github git@github.com:username/foobar.git	
	
### First commit
Run git status to see all your untracked files:

	$ git status
	
Add all your files for committing:

	$ git add --all
	
Commit these changes:

	$ git commit -m "First commit"

Push your project up to github:

	$ git push github master

When you visit your repository on Github you should see all your changes there. 








## Get your app online (Jumpstarter)

Follow the instructions in [Version Control: Deploy to Jumpstarer](https://github.com/susanBuck/notes/blob/master/07_Version_Control/10_Deploy_to_Jumpstarter.md) to deploy your new app to Jumpstarter. 

Summary of the steps you'll take:

1. Create a new project on Jumpstarter.
2. In your local project directory, set Jumpstarter as a remote: `git remote add jumpstarter username-projectsubdomain@ssh.jumpstarter.io:/var/www-git/repo.git`
3. Deploy by pushing the master branch: `git push jumpstarter master`

Once your app is deployed, when you go to your app's url on Jumpstarter, you'll  still see the phpinfo file you see by default with new Jumpstarter projects.

To fix this, you need to update your server's root so that it points to the `public/` folder in your Laravel app.

You can do this under *Settings* by adding `public` to your root:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-jumpstarter-set-root@2x.png' class='' style='max-width:415px; width:75%' alt=''> 

**IMPORTANT:** After you save the above settings, click **Reboot Server**.




## Moving forward

Now that your project is set up on Jumpstarter and your remotes are all configured, your process for checking in code might look something like this:

See what has changed:

	$ git status

Stage all changes:

	$ git add --all
	
Commit:

	$ git commit -m "Describe the changes you're checking in"
	
Push to Github: 

	$ git push github master

Push to Jumpstarter:
	
	$ git push jumpstarter master


Note how you have **two remotes** for your app: One at Github and one at Jumpstarter. Make sure you push to both when committing changes. (Alternatively, [you can create a remote that pushes to multiple URLs](http://stackoverflow.com/a/5785618/59479).)


## Tips / Notes

* When using the `composer create-project` command, we added the `--prefer-dist ` flag. You can read more about `--prefer-dist` and how it differs from `--prefer-source` [here](https://getcomposer.org/doc/03-cli.md#install).



