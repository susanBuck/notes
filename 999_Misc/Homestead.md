>> Laravel Homestead is an official, pre-packaged Vagrant "box" that provides you a wonderful development environment without requiring you to install PHP, HHVM, a web server, and any other server software on your local machine. No more worrying about messing up your operating system! Vagrant boxes are completely disposable. If something goes wrong, you can destroy and re-create the box in minutes!


>> Vagrant is software that allows you to create virtual development environments.

>> Homestead is a Vagrant-based VM

* Nginx web server
* PHP 5.6
* MySQL
* Postgres
* Redis
* Memcached

## Set up

Step 1) Download and install VirtualBox

Step 2) Download and install Vagrant

Note: Vagrant is a CL tool

In the root of sites run this:

```bash
$ composer global require "laravel/homestead=~2.0"
```

Results:
```bash
Changed current directory to /Users/Susan/.composer
./composer.json has been updated
Loading composer repositories with package information
Updating dependencies (including require-dev)
  - Installing symfony/process (v2.7.1)
    Downloading: 100%         

  - Installing laravel/homestead (v2.1.4)
    Downloading: 100%         

Writing lock file
Generating autoload files
```
Now you should have access to the `homestead` command.

Run `homestead edit` to edit your Homestead config file, or manually load it from `~/.homestead/Homestead.yaml`

folders = directory you want to be shared on the VM
sites = map a domain to a folder on the homestead VM, similar to Apache Virtual Hosts.

Example:

```bash
folders:
    - map: ~/Sites
      to: /home/vagrant/Sites

sites:
    - map: homestead.app
      to: /home/vagrant/Sites
```

Save changes then run `homestead up`

      


Step 3)
Add the `laravel/homestead` Vagrant Box with this command

```bash
$ vagrant box add laravel/homestead
```

It'll ask you whether you want to use `virtualbox` or `vmware_desktop`. Choose 1 and hit *Enter* for `virtual box`.

Download may take a while.

Step 4)

```bash
$ git clone https://github.com/laravel/homestead.git Homestead
$ bash init.sh
```





## Useful commands

$ vagrant global-status


## Add a new site

Add it in `sites` in `Homestead.yam`

Add it in `/etc/hosts`

Restart:

```bash
$ homestead halt

$ homestead up --provision
```