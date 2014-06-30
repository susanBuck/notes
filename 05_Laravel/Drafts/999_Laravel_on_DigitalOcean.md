Run `apt-get` update to make sure that you download the most recent packages to your VPS.

	$ sudo apt-get update
	
Then, run `apt-get` to get the following dependencies:

	$ sudo apt-get install libcurl4-gnutls-dev libexpat1-dev gettext libz-dev libssl-dev build-essential

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

## Composer

Download via curl:

	$ curl -sS https://getcomposer.org/installer | php
	
Make global:
	
	$ mv composer.phar /usr/local/bin/composer
	
Test:

	$ composer


