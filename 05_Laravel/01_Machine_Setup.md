## Set up Composer

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