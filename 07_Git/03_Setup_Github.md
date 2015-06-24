## Create an account at Github.com
Visit [Github.com](http://github.com) and create an account if you don't already have one. 

Github's Free plan will do for this class, but if you ever want private code repositories you'll need a paid plan.

If you have a .edu email address, you can request a discount via <https://education.github.com>. The education discount gives you the *Micro Plan* ($7/mo value; includes 5 private repositories) for free for 2 years.




## SSH keys

There are a handful of different protocols you can use when communicating with Github (*http*, *https*, *git*) but SSH is the most secure (and we've found it works most reliably across different setups).

To work with the SSH protocol, you'll need to create a **SSH key** that gives you access to the Github.com servers.

>> SSH keys provide a more secure way of logging into a server with SSH than using a password alone. While a password can eventually be cracked with a brute force attack, SSH keys are nearly impossible to decipher by brute force alone. Generating a **key pair** provides you with two long string of characters: a **public and a private key**. You can place the public key on any server, and then unlock it by connecting to it with a client that already has the private key. When the two match up, the system unlocks without the need for a password. You can increase security even more by protecting the private key with a passphrase. -[source](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2)




## Generate SSH keys on your computer

Via CL, move into your `.ssh` directory:

Mac: 

```bash
$ cd /Users/YourName/.ssh
```

Windows:

```bash
$ cd C:\Users\YourName\.ssh
```
	
If this `.ssh` directory does not exist, it's okay&mdash; the next step will generate it for you.

Generate a new SSH key with the following command:

```bash
$ ssh-keygen -t rsa -C "your_email@example.com"
```
	
When it asks you for the filename, hit Enter (it will default it `id_rsa`).

```bash
Enter file in which to save the key (/Users/YourName/.ssh/id_rsa): [Press enter]
```

When it asks you for a passphrase you can either create one or leave it blank. Regardless, hit Enter when you're done. 
Same for when it asks you to confirm your passphrase.

>> It's up to you whether you want to use a passphrase. Entering a passphrase does have its benefits: the security of a key, no matter how encrypted, still depends on the fact that it is not visible to anyone else. Should a passphrase-protected private key fall into an unauthorized users possession, they will be unable to log in to its associated accounts until they figure out the passphrase, buying the hacked user some extra time. The only downside, of course, to having a passphrase, is then having to type it in each time you use the Key Pair. -[source](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2)

At this point, if you list the contents in the `.ssh` directory you should see two new files: 

* `id_rsa` (private key)
* `id_rsa.pub` (public key).
	
(Mac users only) Add your new key to the ssh-agent:
 
```bash
$ ssh-add id_rsa
```
[](If people are using ssh-agent, they should be able to use a passphrase on their key and not have to enter it every time they push or pull. This is definitely the best practice option. However, if using a passphrase will require them to enter it every time they push or pull, i.e. maybe on Windows, then we should not recommend that. Would like to pin down these recommendations.)



## Add SSH key at Github.com

In Github.com, goto **Settings** (little gear icon on the top right).

Find the **SSH Keys** section.

Click **Add SSH Key**.

<img src='http://making-the-internet.s3.amazonaws.com/vc-github-add-ssh-key@2x.png' class='' style='max-width:1055px; width:100%' alt='Github: Add a new SSH key'>

In the *Title* field, add a descriptive label for the new key. For example, if you're using your own Mac, you might call this key *"Personal MacBook Air"*.

For the *Key* field, you want to paste the contents of the `id_rsa.pub` file that was generated on your computer in the above step.

To view this file in order to copy its contents, you can use the `cat` command:

```bash
$ cat id_rsa.pub
```

Your key will look something like this:

```bash
ssh-rsa [LONG STRING OF RANDOM CHARACTERS]== your@email.com
```

With the contents of `id_rsa.pub` in your clipboard, paste the contents into the *Key* textarea.
	
<img src='http://making-the-internet.s3.amazonaws.com/vc-github-save-new-ssh-key.png?@2x' style='max-width:746px; width:75%'>

Finally, click **Add key**.

To test your new SSH key, run the following command to connect to Github over SSH:

```bash
$ ssh -T git@github.com
```

You may see this warning:	

```bash
The authenticity of host 'github.com (207.97.227.239)' can't be established.
# RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
# Are you sure you want to continue connecting (yes/no)?
```
	
Type `yes` and hit enter.

If all went well, you should see this message:

```bash
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```
	
If that username is yours, you've successfully set up your SSH key.

If you receive a message saying access or permission is denied you can read [these instructions for diagnosing the issue](https://help.github.com/articles/error-permission-denied-publickey).



