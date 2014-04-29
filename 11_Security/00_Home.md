## Example attacks
* [Defacements](https://www.google.com/search?q=defacement+hack&espv=210&es_sm=91&source=lnms&tbm=isch&sa=X&ei=oRKfUqGNEM6gkQfQ54GIBA&ved=0CAkQ_AUoAQ&biw=1309&bih=780) / For the fun of it
* [Pharma hacks / affiliates via link injection](http://making-the-internet.s3.amazonaws.com/security-pharma-hack.png)
* Stealing your user's information (address, email, credit card info, username/passwords)
* DDoS attacks

## Additional readings
* [Apache Security Tips](http://httpd.apache.org/docs/2.2/misc/security_tips.html)
* [Secure Cookies](http://blog.teamtreehouse.com/how-to-create-totally-secure-cookies)
* [Survive The Deep End: PHP Security](http://phpsecurity.readthedocs.org/en/latest/)
* [PHP Security Guide](http://phpsec.org/projects/guide/)
* [Preventing XSS](http://www.sunnytuts.com/article/preventing-cross-site-scripting-xss)
* [Keeping Web Users Safe By Sanitizing Input Data](http://coding.smashingmagazine.com/2011/01/11/keeping-web-users-safe-by-sanitizing-input-data/)
* [NetTuts Client-Side Security Best Practices](http://net.tutsplus.com/tutorials/client-side-security-best-practices)
* [HTTP Headers for Dummies](http://net.tutsplus.com/tutorials/other/http-headers-for-dummies/)
* [Confound Malicious Middlemen with HTTPS and HTTP Strict Transport Security](http://www.html5rocks.com/en/tutorials/security/transport-layer-security/)

## Misc. Tips

### Your host
* What will your host do if you're hacked? 
* Will they help resolve the issue or just shut you down?
* Does your host provide DDoS support?
* Look for *&ldquo;managed plans&rdquo;* if you want more support and assistance from your host


### Keep software up to date
Server software: A good web host should do this for you; if you're managing your own server, this is up to you.

Application software: This is up to you.

### Logins

* Avoid obvious usernames ("admin") and passwords ("password123")
* [Pick strong passwords](http://xkcd.com/936/)
* Use unique passwords

These rules apply to all the access points to your site:

* FTP
* SSH
* cPanel
* Web host account management
* Email (as email often provides access to other accounts)
* Admin applications

### Use two-factor authentication wherever possible

You and anyone who has access to your site

Examples:

* Github.com
* Email




### SFTP > FTP

Disable FTP if possible.

>> SFTP is a secure form of the FTP command. Whenever a user opens up a regular FTP session or most other TCP/IP connections, the entire transmission made between the host and the user is sent in plain text. Anyone who has the ability to snoop on the network packets can read the data, including the password information. If an unauthorized user can login, they have the oppurtunity to compromise the system.
>> When using SSH's SFTP instead of the FTP, the entire login sesion, including transmission of password, is encrypted. It is therefore much more difficult for an outsider to observe and collect passwords from a system using SSH/SFTP sessions. -[ref](https://www.ccs.uky.edu/machines/sftp.html)


### File permissions
[Chmod](http://ss64.com/bash/chmod.html)
For directories: 755 `drwxr-xr-x`
For files: 644 `-rw-r--r--`

>> The read permission grants the ability to read a file. When set for a directory, this permission grants the ability to read the names of files in the directory (but not to find out any further information about them such as contents, file type, size, ownership, permissions, etc.)

>> The write permission grants the ability to modify a file. When set for a directory, this permission grants the ability to modify entries in the directory. This includes creating files, deleting files, and renaming files.

>> The execute permission grants the ability to execute a file. This permission must be set for executable binaries (for example, a compiled C++ program) or shell scripts (for example, a Perl program) in order to allow the operating system to run them. When set for a directory, this permission grants the ability to access file contents and metainfo if its name is known, but not list files inside the directory (unless read is set).

Executable - For directories, this means they can be traversed; For files, this mean they can be run straight from the shell.


Reference: 

* [Wikipedia - Unix Permissions](http://en.wikipedia.org/wiki/Unix_permissions#Traditional_Unix_permissions)
* [File permissions for uploads](http://superuser.com/questions/581194/setting-correct-permissions-for-uploading-files)

### Back-up data regularly
* If your site is compromised, back-ups can help you get back up and running more quickly
* Files and database
* Suggested service: [CodeGuard](https://www.codeguard.com/)
* Monitor what has changed on your site

### Carefully vet outside software
Common issue with WordPress plugins and themes.

### Link injections
* Sign up for [Google Webmaster Tools](http://www.google.com/webmasters/) to determine if you have a problem, and let Google know when the problem has been cleaned up.
* Run a Google diagnostics check on your site via `http://www.google.com/safebrowsing/diagnostic?site=http://yourdomain.com`
