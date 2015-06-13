## Customize your MOTD (Message of the Day)

```bash
sudo nano /etc/motd
```

Alternatively, you can `echo` comments out in `~/.bashrc`. The advantage of doing this is you can execute commands as part of oyur "motd":

```bash
echo "You are....... `whoami`"
```


## Sublime from Command Line

Ref: [https://www.sublimetext.com/docs/2/osx_command_line.html]

Sublime Text includes a Command Line tool called `subl` located at `/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl`.

This tool will let you open files and projects in Sublime directly from the Command Line as well working as an editor for git.

You don't want to have to run the full path to `subl` (`/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl`) everytime you use it, so you'll want to create a symbolic link from your local binary directory.

To do this, first, make sure `/usr/local/bin` exists:

```bash
$ cd usr/local/bin
```

If it doesn't, create it:

```bash
$ sudo mkdir `/usr/local/bin`
```

Now, make a symlink from `usr/local/bin/sublime` to the `subl` bin:

```bash
$ sudo ln -s /Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl /usr/local/bin/subl
```

Couple notes about the above path to Sublime Text:
+ Note the backslash (`\`) to escape the space
+ Some iterations of Sublime included the version number in the .app name (ex. `Sublime\ Text\ 2.app`. Navigate to `/Applications` to see what your Sublime app is called.

You can confirm the symbolic link by running `ls -la subl`:

<img src='http://making-the-internet.s3.amazonaws.com/sysadmin-confirm-subl-symlink@2x.png' style='max-width:300px'>

FYI: You can remove a symbolic link by running `unlink subl` followed by `rm subl`

You may also want to override your default `edit` command to also use Sublime: 
```bash
sudo ln -s /Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl /usr/local/bin/edit
```
