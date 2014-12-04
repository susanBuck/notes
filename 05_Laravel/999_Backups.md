
## Reference

+ [DigitalOcean: How to choose an effective backup strategy for your VPS](https://www.digitalocean.com/community/tutorials/how-to-choose-an-effective-backup-strategy-for-your-vps)
+ [How to Backup MySQL databases](https://www.digitalocean.com/community/tutorials/how-to-backup-mysql-databases-on-an-ubuntu-vps)

## Backup options
+ Manually
+ Via your server provider. Ex: [DigitalOcean Backups](https://www.digitalocean.com/help/technical/backup/)
+ Via an external provider such as [CodeGuard](http://codeguard.com)


## Useful commands for manual backups 

### Zip up a directory

Syntax:
```bash
$ tar -cvvf archiveName.tar directoryName
```

Example:
```bash
tar -cvvf /var/www/html/foobooks.tar /var/www/html/foobooks/
```

Cron job that would make this happen every morning at 6am:

```bash
0 6 * * * tar -cvvf /var/www/html/foobooks.tar /var/www/html/foobooks/
```

### Download the zip from server to your computer

Example:
```bash
$ scp username@ip_or_host_name:/var/www/html/foobooks.tar /Applications/MAMP/htdocs/backups/
```

### Download the zip from server to another server

Example:
```bash
$ scp username@ip_or_host_name:/var/www/html/foobooks.tar username@backup_ip_or_host_name:/var/www/html/foobooks.tar
```


## CodeGuard

<https://codeguard.com>

<img src='http://making-the-internet.s3.amazonaws.com/laravel-codeguard-email@2x.png' class='' style='max-width:872px; width:100%' alt=''>