### Windows - **Cmder** 

*Cmder* is a Windows front-end for the standard Windows Command Shell (aka `cmd.exe`).

In this course, we'll use a special build of Cmder that has the following benefits/customizations:

+ Uses a version of Cmder that is tested across multiple systems
+ Includes a custom Git prompt
+ Includes `elevate` to easily run commands as an admin


Download Cmder from this URL: <https://github.com/bliker/cmder/releases/download/v1.1.4.1/cmder.zip>

To install Cmder, start by creating a new, blank folder in `c:\Program Files` called `Cmder`.
<img src='http://making-the-internet.s3.amazonaws.com/sysadmin-create-new-folder-for-cmder@2x.png' class='' style='max-width:629px; width:100%' alt=''>

Then, extract the zip file you downloaded to this new folder:
<img src='http://making-the-internet.s3.amazonaws.com/sysadmin-extract-cmder@2x.png' class='' style='max-width:817px; width:100%' alt=''>

Within the extracted folder, you'll see the Cmder icon you can use to launch the program.

That's all you need to do to get Cmder rolling. The rest of this doc includes some notes about how Cmder is customized, but requires no action on your part.


## Basic settings
Basic Cmder interface settings are done via (`Win + Alt + P`) the *Settings* menu found via the menu icon on the bottom right.




## Creating your own commands
Create new commands via text files with the `.bat` extension inside `bin/`. 

For an example, see the `alias.bat` file that creates the `alias` command.




## Aliases
Run `alias help` for details

Aliases are stored in `config/aliases`

Run `alias name=full command` to create an alias, or edit `config/aliases`.




## Customizing the prompt
Done gia `config/prompt.lua` or `config/git.lua` when you're in a git repository.


