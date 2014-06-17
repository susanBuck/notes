Create a new *Droplet* on [Digital Ocean](http://digitalocean.com)

SSH in

	$ ssh root@your.ip.address

Take a look at your web directory

	$ cd /var/www
	$ ls




## Install Git

Run apt-get update to make sure that you download the most recent packages to your VPS.

	$ sudo apt-get update
	
Get dependencies:

	$ sudo apt-get install libcurl4-gnutls-dev libexpat1-dev gettext libz-dev libssl-dev build-essential

Install Git with apt-get

	$ sudo apt-get update




## SSH Key for Github

Set up a SSH key 

	ssh-keygen -t rsa -C "your@email.com"
	
Press enter:

	$ Enter file in which to save the key (/Users/you/.ssh/id_rsa): 

Press enter:
	
	$ Enter passphrase (empty for no passphrase): 

Press enter:
	
	$ Enter same passphrase again: 

You'll now have two new files in `/root/.ssh`:

	id_rsa
	id_rsa.pub
	
Copy the contents of `id_rsa.pub`

Add it in your Github.com SSH Key settings.
	
Finally, clone your repository

	$ git@github.com:username/reponame.git
	



## Composer

Download:

	$ curl -sS https://getcomposer.org/installer | php
	
Make global:
	
	$ mv composer.phar /usr/local/bin/composer
	
Test:

	$ composer



	
## Laravel specific

Need curl:

	$ sudo apt-get install php5-curl

Upgrade PHP

	sudo apt-get install python-software-properties
	sudo add-apt-repository ppa:ondrej/php5-oldstable
	sudo apt-get update
	sudo apt-get upgrade
	sudo apt-get install php5

Make the storage dir writable
	
	$ sudo chmod -R 777 app/storage




## Subdomains 	

In Namecheap use external nameserver.

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




## Tips 
Check your version of PHP

	$ php -v
	
See what PHP modules are installed

	$ php -m
	

Apache error log: `/var/log/apache2/error.log`

Apache configuration: `/etc/apache2/httpd.conf`




## Reference
* [Transfering Digital Ocean snapshots between accounts](https://www.digitalocean.com/company/blog/easily-transfer-snapshots-between-accounts/)