## Windows - **Cmder**

<img src='http://making-the-internet.s3.amazonaws.com/sysadmin-cmder@2x.png' style='max-width:920px; width:100%'>

*Cmder* is a Windows front-end for the standard Windows Command Shell (aka `cmd.exe`).

In this course, we'll use a special build of Cmder that has the following benefits/customizations:

+ Uses a version of Cmder that is tested across multiple systems
+ Includes a custom Git prompt
+ Includes [`elevate`](http://code.kliu.org/misc/elevate/) to easily run commands as an admin
+ Includes `nano`, a simple CL text editor

<strong style='background-color:yellow; display:block; padding:5px;'>
Download the dwa15 build of Cmder:<br> <a href='https://s3.amazonaws.com/making-the-internet/cmder-dwa15-v2.zip'>https://s3.amazonaws.com/making-the-internet/cmder-dwa15-v2.zip
</a>
</strong>

Extract the downloaded .zip file to `C:\Program Files` (Right click the zip file, Choose Extract all.)

Extraction may take a few minutes.

<img src='http://making-the-internet.s3.amazonaws.com/sysadmin-extract-cmder@2x.png' style='max-width:400px; width:100%'>

Within the extracted folder `C:\Program Files\cmder\`, you'll see the Cmder icon you can use to launch the program.

<img src='http://making-the-internet.s3.amazonaws.com/sysadmin-cmder-in-destination@2x.png' class='' style='max-width:400px; width:100%' alt=''>

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
Done via `config/prompt.lua` or `config/git.lua` when you're in a git repository.
