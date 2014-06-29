## New droplet

Create a new *Droplet* on [Digital Ocean](http://digitalocean.com) with these options:

<img src='http://making-the-internet.s3.amazonaws.com/version-control-digital-ocean-new-droplet@2x.png' class='' style='max-width:860px; width:100%' alt=''>

Check your email for a confirmation from Digital Ocean which will include your droplets IP address and the root password.



## Log in to your new server droplet via SSH

From your local command line, SSH into your Digital Ocean droplet:

	$ ssh root@your-digital-ocean-ip-address
	
When prompted, use the root password you received in the abovementioned meail.

Once you're SSH'd in, you've opened a connection in command line between your computer and your server.

Take a look at your web directory:

	$ cd /var/www
	$ ls




## Install Git

	$ sudo apt-get install git
	
	
	
	
## SSH Key for Github

In order to communicate between your Digital Ocean droplet and Github, you need to set up a SSH key.


While SSH'd in to your server, generate a new SSH key:

	ssh-keygen -t rsa -C "your@email.com"
	
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
	

## Clone your repository

With your SSH key setup and Git installed, you're ready to clone a Github repository to your Digital Ocean droplet.

	$ git clone git@github.com:username/reponame.git
	



	


## Subdomains 	

In Namecheap use an external nameserver.

In `/etc/apache2/httpd.conf`:

	<VirtualHost *:80>
	  ServerName yourdomain.com
	  DocumentRoot "/var/www/"
	  <Directory "/var/www//">
	    AllowOverride all
	  </Directory>
	</VirtualHost>	
			
	<VirtualHost *:80>
	  ServerName p1.yourdomain.com
	  DocumentRoot "/var/www/p1.yourdomain.com/public/"
	  <Directory "/var/www/p1.yourdomain.com/public/">
	    AllowOverride all
	  </Directory>
	</VirtualHost>




## Tips / Notes
Check your version of PHP

	$ php -v
	
See what PHP modules are installed

	$ php -m
	

Apache error log: `/var/log/apache2/error.log`

Apache configuration: `/etc/apache2/httpd.conf`

Ref: [Transfering Digital Ocean snapshots between accounts](https://www.digitalocean.com/company/blog/easily-transfer-snapshots-between-accounts/)