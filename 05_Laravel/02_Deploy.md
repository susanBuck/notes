With your Laravel app up and running locally, let's look at the procedure for getting it running on a *production* (aka *live*) server.

This doc will cover the procedure for deploying to DigitalOcean. You should already have a Droplet running from P1, and that's the same Droplet you'll deploy to, so no need to create a new one.



## Install Composer on your Droplet

While SSH'd into your Droplet, see if Composer is installed by running the composer command:

```bash
$ composer
```

As of this writing, the Droplet setup we're using does *not* come with Composer pre-installed so you'll likely see a message saying `No command 'composer' found`.

Installing Composer on your Droplet is straightforward...

Move into your bin directory:
```bash
$ cd /usr/local/bin
```

Use cURL to download Composer:
```bash
$ curl -sS https://getcomposer.org/installer | php 
```

Rename the composer executable to just `composer` so it's simple to call:
```bash
$ mv composer.phar composer
```

Test it's working:
```bash
$ composer
```
See a list of Composer commands? Good, you're ready to move to the next step...




## Extensions check
Laravel requires the PHP extension *mcrypt* and Apache's `mod_rewrite`, so let's make sure that's good to go on your DigitalOcean droplet before continuing.

Here are the commands to install mcrypt:

```bash
$ sudo apt-get install php5-mcrypt
$ sudo ln -s /etc/php5/conf.d/mcrypt.ini /etc/php5/mods-available/mcrypt.ini
$ sudo php5enmod mcrypt
```

And here's the command to enable Apache mod_rewrite (Laravel needs this for Routing):

```bash
$ a2enmod rewrite
```

Restart Apache to make these two change take effect:

```bash
$ sudo service apache2 restart
```




## Clone your Laravel app
While still SSH'd into your Droplet, navigate into your web accessible directory at `/var/www/html`.

Git `clone` the Laravel project which you created in the last doc.

Example:
```bash
$ git clone git@github.com:susanBuck/foobooks.git
```




## Build vendors/ directory
If you compare the contents of your local application files to your production application files on your Droplet, you'll notice the Droplet version is missing a `vendor/` directory. 

<img src='http://making-the-internet.s3.amazonaws.com/laravel-foobooks-on-droplet-no-vendor-directory@2x.png' class='' style='max-width:1000px; width:100%' alt=''>


This is because vendors are managed by Composer and *not* version controlled. This is configured via `.gitignore` which lists `vendor/` as a directory to ignore:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-vendor-in-gitignore@2x.png' class='' style='max-width:850px; width:100%' alt=''>
 
Given this, you need to have Composer build your vendor's directory with this command:

```bash
$ composer install --prefer-dist
```
	
When that command is complete (it may take a few minutes), if you view the contents of your live app, you should now see a `vendors/` directory.





## Permissions
Just like on your local server, Laravel needs write access to the storage directory on your production server; run this command to make that happen:

	$ chmod -R 777 app/storage


## New subdomain for your Laravel app on DigitalOcean

To access your Laravel application from the web, you'll want to set up a subdomain that points to it. For this you will follow the same procedure you did to create `http://helloworld.yourdomain.com` and `http://p1.yourdomain.com`.

For clarity's sake, let's outline the procedure again...

Find your DNS settings from your domain provider and create a new domain that points to your Droplet's IP Address. In our example, we're setting up `http://foobooks/dwa15-practice.biz`:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-foobooks-subdomain@2x.png' class='' style='max-width:1260px; width:100%' alt=''>

Next, you need to set up a VirtualHost record for this new domain. If you'll recall, this is done in the `/etc/apache2/sites-enabled/` directory on your Droplet in a file called `000-default.conf`.

At the end of this file, after the existing VirtualHost blocks you may already have, add a new one:

```html
<VirtualHost *:80>
	ServerName foobooks.dwa15-practice.biz
	DocumentRoot "/var/www/html/foobooks/public"
	<Directory "/var/www/html/foobooks/public">
		AllowOverride All
	 </Directory>
</VirtualHost>	
```

Here's an example of what our `000-default.conf` file looked like after adding this:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-foobooks-virtualhost@2x.png' class='' style='max-width:853px; width:100%' alt=''>

After you save your changes to `000-default.conf`, *Power Cycle* your server from your Droplet's control panel at DigitalOcean.com.

**IMPORTANT:** For Laravel apps, the root needs to point the the `public` folder within your application. Note how that's done above for `ServerName` and `DocumentRoot`.



## Test it out

Your Laravel app should now be running on your subdomain.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-foobooks-on-droplet@2x.png' class='' style='max-width:517px; width:100%' alt=''>



## Moving forward:

That was a lot of steps we took to get your server ready for Laravel. Keep in mind, though, that most of the above steps only need to happen 1) On a new server or 2) After a new Laravel app install.

Once setup is complete, there are just two steps you'll take whenever you want update your production application at DigitalOcean:

1. From local, push to your `github` remote.
2. SSH into your DigitalOcean droplet and navigate into your app folder, then run `git pull`.
2. Also while SSH'd in to your app folder, run `composer install` to install any dependencies.


## Tips / Notes

* Live server: If you're seeing a **blank white screen** when trying to view your app in the browser, you may not have built your `vendors/` directory. SSH into your server, navigate to your app folder and run this command:

```bash
$ composer update --prefer-dist
```

* When using the `composer create-project` command, we added the `--prefer-dist ` flag. You can read more about `--prefer-dist` and how it differs from `--prefer-source` [here](https://getcomposer.org/doc/03-cli.md#install).

