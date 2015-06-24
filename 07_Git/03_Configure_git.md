
## Initial Git configuration

Once you've confirmed Git is installed, you need to do some initial setup.

Run the following commands to set a user name and email key to be associated with any commits coming from your computer. Replace the name and email with your own details.

    $ git config --global user.name "Sam Seaborn"
    $ git config --global user.email sam@gmail.com


Run the following command to make any Git input color coded (i.e. easier to read):

    $ git config --global color.ui true


## Which text editor to use

Sometimes git will need you to make changes in a text editor - for example, when adding a commit message.

When deciding which editor to use, git follows this order of preference: 

1. `$GIT_EDITOR` environment variable
2. `core.editor` configuration
3. `$VISUAL`
4. `$EDITOR`
5. Default chosen at compile time, which is usually vi.

For our purposes, we'll go with option 1, the `$GIT_EDITOR` environment variable.

Mac users: If you're using our `.bashrc` template, `$GIT_EDITOR` is set to Sublime Text if it exists, otherwise it uses Nano.

Windows users: Create a new environment variable called `GIT_EDITOR` that is set to the path of Sublime Text (usually `c:\PROGRA~1\SUBLIM~1\`). Here are [instructions on setting environment variables](https://github.com/susanBuck/notes/blob/master/07_Command_Line/04_PATH-Variable.md).
