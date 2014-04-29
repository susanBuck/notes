## Install Node

Visit <http://node.js.org> and hit the big green Install button. It should detect your operating system and download the appropriate installer.

After running the installer, you should have access to `npm` (Node Package Manager), which is Node's version of Composer.

For Window's users `npm` is located at `C:\Program Files\nodejs\npm.cmd` (assuming you installed nodejs in `Program Files`). To create an alias for npm run this command:

	$ alias npm=C:\Progra~1\nodejs\npm.cmd $*

At this point, both Mac users and Windows users should be able to run this command:

	$ npm 

It give you a bunch of information back. If it says `command not found` or something similar, installation didn't work.


