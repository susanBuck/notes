
*What does Bowery do? Bowery allows you to set up a development environment with all the services you use in production, without having to install them locally on your computer.*

Bowery lets you easily create development environments.

Local source code changes are immediately reflected in the browser.

Fast-syncing.

Like local development, but syncs to an online server.

Everyone on a team can use the exact same environments.




## Mac Installation

This command will download Bowery and unzip it into your `/usr/local/bin` directory.

```bash
curl -LO download.bowery.io/2.3.3_darwin_amd64.zip && sudo unzip 2.3.3_darwin_amd64.zip -d /usr/local/bin
```

When this is done, restart Terminal and try the command `bower` to make sure it's installed.



## Windows Installation

Download the Windows binary [64bit](http://download.bowery.io/2.3.3_windows_amd64.zip) or [32bit](http://download.bowery.io/2.3.3_windows_386.zip).

Unzip it and move `bowery.exe` to `c:\Windows\`. 

Restart Cmder and try the command `bower` to make sure it's installed.



## Sign up

Sign up for bowery is done via their command line tool; run this command and then follow the instructions to enter a name, email, and password:

```bash
$ bowery signup
```

## 

Create and move into the directory for a new application. For example:

```bash
$ cd /Users/Susan/Sites
$ mkdir foobooks
$ cd foobooks
```

If you run the command `bowery search` you'll see a list of pre-setup images available for Bowery:

```bash
$ bowery search
```

Of the results, the one that is most useful to us is the one called `laravel`:

```
- laravel - Laravel Ready PHP 5.5 and MySQL 5.5 Env 
```

Add a new Service:

```bash
$ bowery add
```

When it asks what you want to call this Service, type in `elmo`
When it asks for `Image:` type in `php55`
When it asks for `Path:` type in `.`
For the remaining 5 questions (`Remote Path`, `Ports`, `Start Command`, `Build Command`, `Test Command`, just hit enter to leave them blank for now.

Once you're done, you should now see a `bowery.json` configuration file, with these contents:

```
{
  "laravel": {
    "image": "laravel",
    "path": "."
}
```

Go ahead an connect to this image:

```bash
$ bowery connect elmo
```

Uploads all your files, and monitors them for changes.

```

Update bowery.json


## Tips

Restart your service:

```bash
$ bowery restart 
```

SSH Into your service:

```bash
bowery ssh web
```

php -v
composer
cd /etc/apache2/sites-enabled/ DocumentRoot is application/


At least one service is required connect. 
Use `bowery add` to add services.
The basis for a service is its image.


