## Security

* Pick strong passwords:

	* Hosting Login
	* MySQL Database password
	* WordPress wp-admin
	* Your email password (because any of the above can be reset with access to your email account).
	
* Don't use the username "admin" when setting up your WordPress site, &ldquo;The Club&rdquo; principle.
* Use separate usernames and passwords for all your logins.
* Pick solid Themes and Plugins.
* Keep WordPress, Themes and Plugins up to date.
* Install a Security Plugin such as [WordFence](http://wordfence.com/)




## Backups

### Cases for backups:

* Your web host drops the ball.
* Your site gets hacked.
* You make a mistake.

### What gets backed up
1. Files&mdash; everything in `/wordpress/wp-content` including any plugins or themes and uploaded media.	
2. Database: All your posts, pages, comments, users etc.

<img src='http://making-the-internet.s3.amazonaws.com/wp-what-gets-backed-up.png?@2x' class='' style='max-width:790px; width:75%' alt=''>




## Backup techniques

### Free plugin BackWPup + Dropbox

[BackWPup](https://wordpress.org/plugins/backwpup/)

1. [Setting up backups...](https://www.youtube.com/watch?v=XyAr-ht9PLU)
2. [Restoring from backups...](https://www.youtube.com/watch?v=jC4XAI28hhk)


### Managed Backups

[VaultPress](http://vaultpress.com): From the makers of WordPress, 1-click solution for WordPress backups
Plans start at $5 a month



## Updates

Get the latest features *and* protect against hackers as some updates come with security fixes

What needs updating:

* WordPress core files
* Any installed updates and plugins

The *Updates* section of wp-admin will let you know when something needs updating:

<img src='http://making-the-internet.s3.amazonaws.com/wp-updates-needed.png?@2x' class='' style='max-width:935px; width:75%' alt=''>

Make sure your backups are healthy before upgrading, just in case.
