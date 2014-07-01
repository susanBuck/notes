## DigitalOcean

Digital Ocean is a simple, developer friendly VPS server provider. To get started, head over to <https://digitalocean.com> and create a new account.


## SSH Key: Your computer <-> DigitalOcean

After setting up your account, the first thing you'll want to do is **set up a SSH key**. This will prevent you from having to enter your password every time you communicate with DigitalOcean from your command line. It will also prevent DigitalOcean from sending you server passwords via email, which is insecure.

You can use the same `id_rsa.pub` key you created when you configured Github. Use the `cat` command to open this file, then copy its contents. 

Mac: 

	$ cat /Users/YourName/.ssh/id_rsa.pub

Windows:

	$ cat C:\Users\YourName\.ssh\id_rsa.pub

Back in DigitalOcean, find the menu on the left for **SSH Keys** in order to add a new key. Paste in the key and give it a descriptive name.

<small>
Note: Instead of using your Github key, you could have generated a unique one for DigitalOcean. This latter technique is more secure and suggested for projects beyond the scope of this class.
</small>


## New Droplet

DigitalOcean calls their virtual servers, **Droplets**; each Droplet that you spin up is a new virtual server for your personal use.

In this course, you'll use **one single Droplet** to host all of your class projects. 

The base plan which costs $5/mo should be enough to serve your needs, but if you need more you can always upgrade to the $10/mo plan

From your DigitalOcean dashboard, find the big green button labeled *Create* to initiate a new Droplet.

On the screen that follows, make your Droplet settings match the following options:

<img src='http://making-the-internet.s3.amazonaws.com/version-control-digital-ocean-new-droplet@2x.png' class='' style='max-width:860px; width:100%' alt=''>

Check your email for a confirmation from DigitalOcean which will include your droplets IP address and the root password.



## Log in to your new server droplet via SSH

From your local command line, SSH into your Digital Ocean droplet:

	$ ssh root@your-digital-ocean-ip-address
	
If your SSH key is set up properly, you should not be prompted to enter a password and you should automatically get logged in.

Take a look at your web directory:

	$ cd /var/www/html
	$ ls




## Install Git

While SSH'd into your Digital Ocean server, run this command:

	$ sudo apt-get install git
	
Confirm it's working:

	$ git --version
	



## SSH Key: DigitalOcean <-> Github.com

In order to communicate between your DigitalOcean droplet and Github, you need to set up a SSH key.


While SSH'd in to your server, generate a new SSH key:

	$ ssh-keygen -t rsa -C "your@email.com"
	
Press enter:

	$ Enter file in which to save the key (/root/.ssh/id_rsa): 

Press enter:
	
	$ Enter passphrase (empty for no passphrase): 

Press enter:
	
	$ Enter same passphrase again: 

You'll now have two new files in `/root/.ssh/`:

	id_rsa
	id_rsa.pub
	
Run the `cat` command to view the contents of the `id_rsa.pub` file.

	$ cat /root/.ssh/id_rsa.pub	
	
Copy the contents of `id_rsa.pub`

Add this new key via your [Github SSH settings](https://github.com/settings/ssh).




## Clone a repository

With your SSH key setup and Git installed, you're ready to clone your `hello-world` Github repository to your DigitalOcean Droplet.

In the `/var/www/html` directory on DigitalOcean, run this command:

	$ git clone git@github.com:username/reponame.git
	
Now, when you visit your Digital Ocean IP address you should see your hello-world project:

<img src='http://making-the-internet.s3.amazonaws.com/version-control-hello-world-on-digital-ocean@2x.png' class='' style='max-width:688px; width:100%' alt=''>


	


## Domain setup

Right now you can access your DigitalOcean droplet by typing its IP address into your browser. This works but is obviously hard to remember, and it'd also be nice to run several apps on your one Droplet, each with a unique subdomain.

To set this up, we're going to configure a domain and subdomains for use with DigitalOcean.

Start by creating a new domain name via a service like [Namecheap](https://www.namecheap.com/). 

This should cost $10 bucks for the year, give or take depending on the extension you buy. If you have an existing domain you'd like to use, you're welcome to do so- your instructions just might vary from ours if you're using a different domain company.

After your create your domain, find your DNS settings. Here, you'll set both your `@` and `www` hostname to your DigitalOcean IP address.

Also, while you're there, add a subdomain called `helloworld` which also points to the same IP.

<img src='http://making-the-internet.s3.amazonaws.com/version-control-namecheap-dns@2x.png' class='' style='max-width:916px; width:100%' alt='Namecheap DNS'>

Give the above settings a few minutes to take effect, then test out your domain. You should see the same results you saw above when you tested your IP address, but this time it's loaded via your domain name:

<img src='http://making-the-internet.s3.amazonaws.com/version-control-namecheap-domain-first-working@2x.png' class='Test new domain' style='max-width:688px; width:75%' alt=''>

If you don't yet see the above, try the following:

1. Clear your browser cache.
2. Do a [DNS Cache Flush](http://docs.cpanel.net/twiki/bin/view/AllDocumentation/ClearingBrowserCache).

Try again. Still not loading?

3. Try a different browser.
4. Try accessing your URL via [this proxy](http://www.megaproxy.com/freesurf/). Does it load there? If it loads there, it just means your computer is still caching old settings. 


## Virtual Host setup

With your primary domain working, now lets get your subdomain working.

On your DigitalOcean server, add the following Virtual Host block to the bottom 
of `/etc/apache2/sites-enabled/000-default.conf`:

	<VirtualHost *:80>
	  ServerName helloworld.dwa15-practice.biz
	  DocumentRoot "/var/www/html/hello-world"
	  <Directory "/var/www/html/hello-world">
	    AllowOverride all
	  </Directory>
	</VirtualHost>	

Be sure to change the `ServerName` to match your domain. 

Also, adjust the `DocumentRoot` and `Directory` to point to your `hello-world` directory.

To make these changes take effect, goto your DigitalOcean Droplet settings and find the option to **Power Cycle**.

Once your Droplet is restarted, test out your subdomain `helloworld.yourdomain.com`.

<img src='http://making-the-internet.s3.amazonaws.com/version-control-subdomain-good@2x.png' class='' style='max-width:688px; width:75%' alt=''>




## Tips / Notes

Find out the nameserver of a domain:

	$ dig +short NS domain.com

Check your version of PHP

	$ php -v
	
See what PHP modules are installed

	$ php -m
	
Check Apache configurations

	$ apache2ctl -S

Apache error log location: `/var/log/apache2/error.log`

Apache configuration location: `/etc/apache2/httpd.conf`

* [Transferring Digital Ocean snapshots between accounts](https://www.digitalocean.com/company/blog/easily-transfer-snapshots-between-accounts/)
* [How To Create Your First DigitalOcean Droplet Virtual Server](https://www.digitalocean.com/community/tutorials/how-to-create-your-first-digitalocean-droplet-virtual-server)