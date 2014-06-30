## New droplet

Create a new *Droplet* on [Digital Ocean](http://digitalocean.com) with these options:

<img src='http://making-the-internet.s3.amazonaws.com/version-control-digital-ocean-new-droplet@2x.png' class='' style='max-width:860px; width:100%' alt=''>

Check your email for a confirmation from Digital Ocean which will include your droplets IP address and the root password.



## Log in to your new server droplet via SSH

From your local command line, SSH into your Digital Ocean droplet:

	$ ssh root@your-digital-ocean-ip-address
	
When prompted, use the root password you received in the abovementioned meail.

Take a look at your web directory:

	$ cd /var/www/html
	$ ls




## Install Git

While SSH'd into your Digital Ocean server, run this command:

	$ sudo apt-get install git
	
Confirm it's working:

	$ git --version
	

	
	
## SSH Key for Github

In order to communicate between your Digital Ocean droplet and Github, you need to set up a SSH key.


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

With your SSH key setup and Git installed, you're ready to clone your hello-world Github repository to your Digital Ocean droplet.

	$ git clone git@github.com:username/reponame.git
	



	


## Domain setup

Right now you can access your Digital Ocean droplet by typing its IP address into your browser. This works but is obviously hard to remember, and it'd also be nice to run several apps on your one droplet, each with a unique subdomain.

To set this up, we're going to configure using custom domains for Digital Ocean.

Start by creating a new domain name via a service like [Namecheap](https://www.namecheap.com/). 

This should cost $10 bucks for the year, give or take depending on the extension you buy. If you have an existing domain you'd like to use, you're welcome to do so - your instructions just might vary from ours if you're using a different domain company.

After your create your domain, find your DNS settings. Here, you'll want to make sure both your `@` and `www` hostname is pointing to your Digital Ocean IP address.

Also, add a subdomain called `helloworld` which also points to the same IP.

<img src='http://making-the-internet.s3.amazonaws.com/version-control-namecheap-dns@2x.png' class='' style='max-width:916px; width:100%' alt='Namecheap DNS'>

Give the above settings a few minutes to take effect, then test out your domain. You should see a directory listing, including your `hello-world` directory.

<img src='http://making-the-internet.s3.amazonaws.com/version-control-namecheap-domain-first-working@2x.png' class='' style='max-width:688px; width:75%' alt=''>

If you don't yet see the above, try the following:

1. Clear your browser cache.
2. Do a [DNS Cache Flush](http://docs.cpanel.net/twiki/bin/view/AllDocumentation/ClearingBrowserCache).

Try again. Still not loading?

3. Try a different browser.
4. Try accessing your URL via [this proxy](http://www.megaproxy.com/freesurf/). Does it load there? If it loads there, it just means your computer is still caching old settings. 


## Virtual Host setup

With your primary domain working, now lets get your subdomain working.

On your Digital Ocean server, add the following Virtual Host block to the bottom of `/etc/apache2/sites-enabled/000-default.conf`:

<VirtualHost *:80>
  ServerName helloworld.dwa15-practice.biz
  DocumentRoot "/var/www/html/hello-world"
  <Directory "/var/www/html/hello-world">
    AllowOverride all
  </Directory>
</VirtualHost>	

Be sure to change the `ServerName` to match your domain. 
Also, adjust the `DocumentRoot` and `Directory` to point to your `hello-world` directory.

To make these changes take effect, goto your Digital Ocean droplet settings and find the option to **Power Cylce**.

Once your droplet is restarted, test out your subdomain and make sure it's directly loading your hello world app.



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

Ref: [Transfering Digital Ocean snapshots between accounts](https://www.digitalocean.com/company/blog/easily-transfer-snapshots-between-accounts/)