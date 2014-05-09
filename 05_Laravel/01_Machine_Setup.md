
## Local Server

MAMP



## Set up Composer

References:

* [Laracast: Laravel Installation for Newbs](https://laracasts.com/lessons/laravel-installation-for-newbs)
* [Laracast: From Zero to Deploy with Fortrabbit](https://laracasts.com/lessons/from-zero-to-deploy-with-fortrabbit)
* Chapter 2: Composer All Over


Move into your bin directory
Mac: Paths are set in /etc/paths
	
	$ cd /usr/local/bin
	
Download and install composer.phar

	$ curl -sS https://getcomposer.org/installer | php 

Rename from composer.phar to composer

	$ mv composer.phar composer

Test it works

	$ composer
	




## Set up Git

### Alias to create an SSH key

Create 

	alias sshkey="cat ~/.ssh/id_rsa.pub | pbcopy && echo 'Copied to clipboard.'"

Test

	sshkey
	
Get all existing alias'

	$ alias