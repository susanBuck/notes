## Corrupt vendors

Sometimes, you may run into an issue with a corrupt vendor, but you can't get around it because `composer update` keeps downloading packages from an existing, corrupt cache. 

To resolve this, you can recursively remove Composer's cache folder:

```bash
$ rm -rf ~/.composer/cache
```




## Storage permissions issue

Symptoms:

* *Error in exception handler* when running brand new Laravel App.
* Blank white screen.

Ensure that all the storage directories (`app/storage/*`) are writable by the web server

```bash
chmod -R 777 app/storage
```




## Unable to open database file

```bash
chmod -R 755 app/database/
```



	
## Class not found

```bash
$ composer dump-auto
```




## Routes not working

If your main route (`/`) works, but all other routes result in a 404 error, try the following configuration adjustment:

Open your Apache configuration file, for example: `C:\MAMP\conf\apache\httpd.conf`.

Find the line that says `# This should be changed to whatever you set DocumentRoot to.`

In the `<directory>` block that follows, replace `AllowOverride None` with `AllowOverride All`

AllowOverride controls what directives can be used in the `.htaccess` file; if it's disabled then the pretty URL rewriting that Laravel does doesn't work.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-allow-override-all@2x.png' class='' style='max-width:787px; width:100%' alt=''>

__Save your changes and restart your server.__



## Running out of memory


+ [Digital Ocean: How To Add Swap](https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-14-04)
+ [Composer: Memory limit errors](https://getcomposer.org/doc/articles/troubleshooting.md#memory-limit-errors)
+ [Composer: proc_open(): fork failed errors](https://getcomposer.org/doc/articles/troubleshooting.md#proc-open-fork-failed-errors)
