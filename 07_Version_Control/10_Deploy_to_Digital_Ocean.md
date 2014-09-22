## DigitalOcean

Digital Ocean is a simple, developer friendly VPS server provider. To get started, head over to <https://digitalocean.com> and create a new account.


## SSH Key: Your computer <-> DigitalOcean

After setting up your account, the first thing you'll want to do is **set up a SSH key**. This will prevent you from having to enter your password every time you communicate with DigitalOcean from your command line. It will also prevent DigitalOcean from sending you server passwords via email, which is insecure.

You can use the same `id_rsa.pub` key you created when you configured Github. Use the `cat` command to open this file, then copy its contents. 

Mac: 

```bash
$ cat /Users/YourName/.ssh/id_rsa.pub
```

Windows:

```bash
$ cat C:\Users\YourName\.ssh\id_rsa.pub
```

Back in DigitalOcean, find the menu on the left for **SSH Keys** in order to add a new key. Paste in the key and give it a descriptive name.

<img src='http://making-the-internet.s3.amazonaws.com/vc-do-ssh-key@2x.png' class='' style='max-width:1063px; width:100%' alt=''>

<small>
Note: Instead of using your Github key, you could have generated a unique one for DigitalOcean. This latter technique is more secure and suggested for projects beyond the scope of this class.
</small>




## Droplet Pricing

DigitalOcean calls their virtual servers, **Droplets**; each Droplet that you spin up is a new virtual server for your personal use.

In this course, you'll use **one single Droplet** to host all of your class projects. 

The base plan which costs $5/mo should be enough to serve your needs, but if you need more you can always upgrade to the $10/mo plan. 

Digital Ocean has a nice refer-a-friend program:


>> Spread the love and earn rewards! Send $10 to your friends in account credits and receive $25 for each referral that totals $25 in billings. There is no limit to how many people you can refer. -<https://cloud.digitalocean.com/settings/referrals>


Check the class Piazza for a thread where students can swap refer-a-friend links.




## New Droplet
From your DigitalOcean dashboard, find the big green button labeled *Create* to initiate a new Droplet.

On the screen that follows, make your Droplet settings match the following options:

<img src='http://making-the-internet.s3.amazonaws.com/vc-digital-ocean-new-droplet@2x.png' class='' style='max-width:1063px; width:100%' alt='New Droplet at Digital Ocean'>
 
Once your Droplet is created, make note if its IP address:

<img src='http://making-the-internet.s3.amazonaws.com/vc-do-new-ip-address@2x.png' class='' style='max-width:1041px; width:100%' alt=''>


## Log in to your new server droplet via SSH

From your local command line, SSH into your Digital Ocean droplet:

```bash
$ ssh root@your-digital-ocean-ip-address
```
	
If your SSH key is set up properly, you should *not* be prompted to enter a password and you should automatically get logged in.

Once logged in, take a look at your web directory:

```bash
$ cd /var/www/html
$ ls
```

You should see two files:

* `index.html`
* `info.php`

If you access your site in the browser (via the IP address DigitalOcean gives you), you should see the default contents of `index.html` which looks like this:

<img src='http://making-the-internet.s3.amazonaws.com/vc-digital-ocean-default-index@2x.png' class='' style='max-width:883px; width:100%' alt=''>

There's a couple more tasks you need to take care of before you can start altering this content...



## Install Git

While SSH'd into your Digital Ocean server, run this command to install git:

```bash
$ sudo apt-get install git
```
	
Confirm git is now working:

```bash
$ git --version
```

Example response indicating Git is successfully installed:

```bash
git version 1.9.1
```
	



## SSH Key: DigitalOcean <-> Github.com

In order to communicate between your DigitalOcean droplet and Github, you need to set up another SSH key.


While SSH'd in to your server, generate a new SSH key:

```bash
$ ssh-keygen -t rsa -C "your@email.com"
```
	
Press enter:

```bash
$ Enter file in which to save the key (/root/.ssh/id_rsa): 
```

Press enter:
	
```bash
$ Enter passphrase (empty for no passphrase): 
```

Press enter:

```	
$ Enter same passphrase again: 
```

You'll now have two new files in `/root/.ssh/`:

+ `id_rsa`
+ `id_rsa.pub`
	
Run the `cat` command to view the contents of the `id_rsa.pub` file.

```
$ cat /root/.ssh/id_rsa.pub	
```
	
Copy the contents of `id_rsa.pub`

Add this new key via [Github.com SSH settings](https://github.com/settings/ssh).



## Clone a repository

With your SSH key setup and Git installed, let's now look at how to clone your `hello-world` repository to your DigitalOcean Droplet.

In the `/var/www/html` directory on DigitalOcean, run this command:

```bash
$ git clone git@github.com:username/hello-world.git
```
	
Your directory structure on DigitalOcean should now look something like this:

* `hello-world/`
	* `index.html`
	* `README.md`
* `index.html`
* `info.php`

When you visit your DigitalOcean IP and tack on the `hello-world` subdirectory to the URL, 
you should see your `hello-world` project, just as it looked when you ran it locally:

<img src='http://making-the-internet.s3.amazonaws.com/version-control-hello-world-on-digital-ocean@2x.png' class='' style='max-width:580px; width:100%' alt=''>



## Deployment

Deployment is the process of moving changes from your local/development environment to production. 

Once your repository is cloned from Github.com to DigitalOcean, the steps for deploying changes looks like this: 

1. SSH in to your droplet
2. Change directories into your project
3. Run `git pull` to sync any new changes

<small>Alternatively, you can follow [these instructions to set up automatic deployment with git](https://digitalocean.com/community/tutorials/how-to-set-up-automatic-deployment-with-git-with-a-vps).</small>

**From this point forward you should avoid directly editing files on your live server.** Avoiding editing files on the live server will prevent your repositories from getting out of sync which can create messy merge conflicts.

<small>
The only exception to this rule is if you need to edit a file that's unique to different environments and is in your `.gitignore` file so it's not tracked across repositories. This will be discussed more in future topics.
</small>


## Domain setup

Right now you can access your DigitalOcean droplet by typing its IP address into your browser. This works but is obviously hard to remember, and it'd also be nice to run several apps on your one Droplet, each with a unique subdomain.

To set this up, we're going to configure a domain and subdomains for use with DigitalOcean.

If you have an existing domain you'd like to use, that's fine. If not, you can create a new domain name via a service like **[Namecheap](http://www.namecheap.com/?aff=61057)**. As of this writing, Namecheap is offering free domain names for students (with a `.edu` email address) via <https://nc.me/>. 

After your create your domain, find your **DNS settings** within your domain companies' control panel. Here, you'll set both your `@` and `www` hostname to your DigitalOcean IP address.

Also, while you're there, add a subdomain called `helloworld` which also points to the same IP.

<img src='http://making-the-internet.s3.amazonaws.com/version-control-namecheap-dns@2x.png' class='' style='max-width:916px; width:100%' alt='Namecheap DNS'>

Give the above settings a few minutes to take effect, then test out your domain. You should see the same results you saw above when you tested your IP address, but this time it's loaded via your domain name:

<img src='http://making-the-internet.s3.amazonaws.com/vc-namecheap-domain-first-working@2x.png' class='Test new domain' style='max-width:917px; width:100%' alt=''>

If you don't yet see the above, try the following:

1. Clear your browser cache.
2. Do a [DNS Cache Flush](http://docs.cpanel.net/twiki/bin/view/AllDocumentation/ClearingBrowserCache).

Try again. Still not loading?

3. Try a different browser.
4. Try accessing your URL via [this proxy](http://www.megaproxy.com/freesurf/). Does it load there? If it loads there, it just means your computer is still caching old settings. 


## Virtual Host / Subdomain setup

Your primary domain is working, now lets get a subdomain working (`http://helloworld.domain.com`).

In the above step, you already set up your DNS for the subdomain, making it so that traffic hitting `http://helloworld.domain.com` will point to your IP address.

Now we need to give the server instructions on what to do with this traffic.

This is done via a Virtual Host configuration; **Virtual Hosts allow Apache (your web server software) to be configured for multiple sites that have different configurations**.

In DigitalOcean, Virtual Hosts can be specified in the following file: `/etc/apache2/sites-enabled/000-default.conf`. Given that, navigate to `/etc/apache2/sites-enabled/` and open `000-default.conf` for editing.

If need a refresher on editing files via command line, [go here](https://github.com/susanBuck/notes/blob/master/07_SysAdmin/999_Editing_text_files_in_CL.md). 

At the *bottom* of `000-default.conf`, add this VirtualHost block:

	<VirtualHost *:80>
	  ServerName helloworld.dwa15-practice.biz
	  DocumentRoot "/var/www/html/hello-world"
	  <Directory "/var/www/html/hello-world">
	    AllowOverride All
	  </Directory>
	</VirtualHost>	

Be sure to change the `ServerName` value to match *your* subdomain. In this example, it's set to `helloworld.dwa15-practice.biz` but you'll need to change it to match your domain.

Also, if necessary, adjust the `DocumentRoot` and `Directory` to point to the location of your `hello-world` directory.

In plain english, the above configuration says: *when traffic comes in via `helloworld.dwa15-practice.biz`, point to the `/var/www/html/hello-world` directory*. 

When you're done, save your changes to `000-defualt.conf`.

(If for some reason you make a mistake in `000-default.conf`, [here's a copy of the original](https://gist.github.com/susanBuck/790ea5a0d1ad7d02e586).)

To make your VirtualHost changes take effect, find the *Power Cycle* button on your Droplet settings to restart your server.

<img src='http://making-the-internet.s3.amazonaws.com/vc-do-power-cycle@2x.png' class='' style='max-width:1033px; width:100%' alt='Digital Ocean Power Cycle'>

Once the restart is complete, test out your subdomain `helloworld.yourdomain.com`.

<img src='http://making-the-internet.s3.amazonaws.com/version-control-subdomain-good@2x.png' class='' style='max-width:588px; width:75%' alt=''>

Keep these notes handy for when you set up projects, because each project should have it's own subdomain:

+ `http://p1.yourdomain.com`
+ `http://p2.yourdomain.com`
+ `http://p3.yourdomain.com`
+ `http://p4.yourdomain.com`





## Tips / Notes


SSH Keys between your computer and DigitalOcean will only work on Droplets that were created *after* you set up the key. To set up a key for an existing Droplet, navigate into your computer's .ssh directory and run this command:

```bash
cat id_rsa.pub | ssh root@[your.ip.address.here] "cat >> ~/.ssh/authorized_keys"
```
	
Find out the IP address of a domain:

```bash
$ ping domain.com
```

Find out the nameserver of a domain:

```bash
$ dig +short NS domain.com
```

Check the version of PHP

```bash
$ php -v
```
	
See what PHP modules are installed

```bash
$ php -m
```
	
Check Apache configurations:

```bash
$ apache2ctl -S
```

Apache error and configuration files on Digital Ocean:

+ Apache error log: `/var/log/apache2/error.log`
+ Apache configuration: `/etc/apache2/httpd.conf`



## Reference

* [Transferring Digital Ocean snapshots between accounts](https://www.digitalocean.com/company/blog/easily-transfer-snapshots-between-accounts/)

* [How To Create Your First DigitalOcean Droplet Virtual Server](https://www.digitalocean.com/community/tutorials/how-to-create-your-first-digitalocean-droplet-virtual-server)

* [How To Use SSH Keys with DigitalOcean Droplets](https://www.digitalocean.com/community/tutorials/how-to-use-ssh-keys-with-digitalocean-droplets)
