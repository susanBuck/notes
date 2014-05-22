## Cheat Sheets
* [WordPress Credentials Cheat Sheet](http://thewc.co.s3.amazonaws.com/challenges/wp-credentials-cheat-sheet.pdf)
* [WordPress Installation Cheat Sheet](http://thewc.co.s3.amazonaws.com/challenges/wp-installation-cheat-sheet.pdf)




## Summary
1. Download WordPress
2. Upload to server
3. Set up database
4. Configure




## Step 1: Download WP
Visit <http://wordpress.org/download/> and click the big blue button to download a `.zip` copy of the latest version of WordPress.





## Step 2: Upload WP
Log into cPanel using the details found at <http://thewc.co/hosting>.

Once in cPanel, find the **File Manager** option.

<img src='http://making-the-internet.s3.amazonaws.com/wp-filemanager-in-cpanel.png?@2x' style='width:75%; max-width:879px'>

When it asks you which directory to open in, the default option (*Web Root*) is fine.
<img src='http://making-the-internet.s3.amazonaws.com/wp-filemanager-directory.png?@2x' style='width:75%; max-width:433px;'>



Once in the File Manager, click **Upload**.

<img src='http://making-the-internet.s3.amazonaws.com/wp-filemanager-upload.png?@2x' style='width:75%; max-width:938px;'>

Then proceed to upload the `wordpress-3.9.1.zip` file you downloaded.

<img src='http://making-the-internet.s3.amazonaws.com/wp-filemanager-choose-file.png?@2x' style='width:75%; max-width:938px;'>





Once the zip file is uploaded, return to the File Manager. 

Find the newly uploaded zip file and click it, then click the **Extract** Icon.
<img src='http://making-the-internet.s3.amazonaws.com/wp-filemanager-extract.png?@2x' style='width:75%; max-width:938px;'>


When it asks you for the extract path, leave the default as is (`/public_html`).
<img src='http://making-the-internet.s3.amazonaws.com/wp-filemanager-default-path.png?@2x' style='width:75%; max-width:510px;'>


When it's all done, you should have a directory called `wordpress` amongst your files.
<img src='http://making-the-internet.s3.amazonaws.com/wp-filemanager-extraction-complete.png@2x' style='width:75%; max-width:1074px;'>



## Step 3: Set up Database

WordPress needs a database to store all your posts, pages, configuration info, plugin info, etc.

WordPress works with MySQL databases which can be setup on your web host via cPanel. 

Go back to cPanel and find the MySQL databases section:
<img src='http://making-the-internet.s3.amazonaws.com/wp-mysql-in-cpanel.png'>


### New database
Create a new database: 

<img src='http://making-the-internet.s3.amazonaws.com/wp-create-database.png'>

Note the full name of your database including the prefix. For example, `el2054_wordpress`.


### New MySQL user
Next, create a new MySQL user:

<img src='http://making-the-internet.s3.amazonaws.com/wp-new-mysql-user.png'>

Note the name of your user, including the prefix. 
For example, `el2054_wordpress`.


### Add MySQL user to database
Now add this new user to your new database:

<img src='http://making-the-internet.s3.amazonaws.com/wp-mysql-add-user.png'>

When it asks you what priveleges you want to grant this user, choose all:

<img src='http://making-the-internet.s3.amazonaws.com/wp-mysql-user-priveleges.png'>

You should now see your new database with your new user:
<img src='http://making-the-internet.s3.amazonaws.com/wp-mysql-database-done.png'>




## Step 4: Configure

When you visit the URL to your wordpress install, for example `http://username.wcc-hosting.com/wordpress`, it will prompt you to create a wp-config file:

<img src='http://making-the-internet.s3.amazonaws.com/wp-config-setup.png'>

After you click *Create Configuration File* it will ask you for your database connection details which you created during the database setup steps:

<img src='http://making-the-internet.s3.amazonaws.com/wp-config-info.png'>

The next screen will prompt you to run the install, and once that's done WordPress will ask you to fill in information about your new site.



