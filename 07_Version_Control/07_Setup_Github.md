## Create an account at Github.com
Visit [Github.com](http://github.com) and create an account if you don't already have one. 

Github's Free plan will do for this class, but if you ever want private code repositories you'll need a paid plan.

If you have a .edu email address, you can request a discount via <https://education.github.com>. The education discount gives you the *Micro Plan* ($7/mo value; includes 5 private repositories) for free for 2 years.

## Setup SSH keys

There are a few different protocols you can use when communicating with Github but SSH is the most secure (and we've found it works most reliably across different servers).

To work with the SSH protocol, you'll need to create a SSH key that gives you access to the Github.com servers.

### Generate SSH keys on your computer
Via CL, move into your `.ssh` directory:

Mac: 

	$ cd /Users/YourName/.ssh

Windows:

	$ cd C:\Users\YourName\.ssh

Generate a new SSH key in this direcotry with the following command:

	$ ssh-keygen -t rsa -C "your_email@example.com"
	
When it asks you for the filename, just hit Enter (it will default it `id_rsa`).

When it asks you for a passphrase you can either create one or leave it blank. Regardless, hit Enter when you're done. Same for when it asks you to confirm your passphrase.

At this point, if you list the contents of you .ssh directory you should see two new files: `id_rsa` and `id_rsa.pub`.
	
Add your new key to the ssh-agent:
 
	ssh-add id_rsa	

### Add SSH key at Github.com

Reference: [Github.com: Generating SSH keys](https://help.github.com/articles/generating-ssh-keys)

In Github.com, goto **Account Settings** (little scredriver/wrench icon on the top left).

Find the **SSH Keys** section.

Click **Add SSH Key**.

In the *Title* field, add a descriptive label for the new key. For example, if you're using a personal Mac, you might call this key "Personal MacBook Air".

For the *Key* field, you want to paste the contents of the `id_rsa.pub` file that was generated on your computer in the above step.

To quickly open this file to copy it's contents, use the following commands...

Mac:

	$ edit id_rsa.pub

Windows:

	$ notepad id_rsa.pub
	
*Copying the contents of id_rsa.pub on Windows:*
<img src='http://making-the-internet.s3.amazonaws.com/vc-copy-id-rsa-pub-on-windows.png?@2x' style='max-width:1153px; width:75%'>

With the contents of `id_rsa.pub` in your clipboard, paste the contents into the *Key field* on Github.
	
<img src='http://making-the-internet.s3.amazonaws.com/vc-github-save-new-ssh-key.png?@2x' style='max-width:664px; width:75%'>

Finally, click **Add key**.

To test your new SSH key, run the following command to connect to Github over SSH:

	$ ssh -T git@github.com

You may see this warning:	

	The authenticity of host 'github.com (207.97.227.239)' can't be established.
	# RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
	# Are you sure you want to continue connecting (yes/no)?
	
Type `yes` and hit enter.

If all went well, you should see this message:

	Hi username! You've successfully authenticated, but GitHub does not provide shell access.
	
If that username is yours, you've successfully set up your SSH key.

If you receive a message about *access denied,* you can read [these instructions for diagnosing the issue](https://help.github.com/articles/error-permission-denied-publickey).


