*Update needed: Instructions are for Mac, need to add Windows details.*

The following is the basic procedure for setting up a SSH key so you can SSH into a server without having to enter a password everytime.

Move into .ssh keys directory:

```bash
$ cd ~/.ssh
```

Generate new key:

```bash
$ ssh-keygen -t rsa
```

See if you have `ssh-copy-id`:

```bash
$ ssh-copy-id
```

Example output if you do
```bash
Usage: /usr/local/bin/ssh-copy-id [-i [identity_file]] [user@]machine
```

If you don't have `ssh-copy-id`, you can install it with this command:

```bash
$ curl -L https://raw.githubusercontent.com/beautifulcode/ssh-copy-id-for-OSX/master/install.sh | sh
```

Now you can copy the public key into the new machine's `authorized_keys` file with the `ssh-copy-id` command. Make sure to replace the example username and IP address below.

```bash
$ ssh-copy-id user@123.45.56.78
```

Re-open Terminal and try SSH'ing in - it should no longer require a password.


## Bonus: Set up an alias

Let's create an alias to make SSH'ing into the server super quick. For example, let's imagine our server is provided by Dreamhost, so we'll call the alias `dreamhost`.

Edit `~/.bash_profile` and add a line like this:

```bash
alias dreamhost="ssh user@123.45.56.78"
```

Re-open Terminal and try out the alias by running `dreamhost`.


## Reference:
+ <https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2>
+ <https://github.com/beautifulcode/ssh-copy-id-for-OSX>