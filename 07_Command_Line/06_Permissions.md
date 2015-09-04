

<img src='http://making-the-internet.s3.amazonaws.com/sysadmin-permissions-cheat-sheet.png?@2x' class='' style='max-width:532px; width:75%' alt=''>

## Suggested Permissions
For directories: `755` `drwxr-xr-x`

For files: `644` `-rw-r--r--`


## Read Write Execute
>> The **read** permission grants the ability to read a file. When set for a directory, this permission grants the ability to read the names of files in the directory (but not to find out any further information about them such as contents, file type, size, ownership, permissions, etc.)

>> The **write** permission grants the ability to modify a file. When set for a directory, this permission grants the ability to modify entries in the directory. This includes creating files, deleting files, and renaming files.

>> The **execute** permission grants the ability to execute a file. This permission must be set for executable binaries (for example, a compiled C++ program) or shell scripts (for example, a Perl program) in order to allow the operating system to run them. When set for a directory, this permission grants the ability to access file contents and metainfo if its name is known, but not list files inside the directory (unless read is set).


## Reference
* [Permissions Calculator](http://permissions-calculator.org)
* [Chmod](http://ss64.com/bash/chmod.html)
* [Wikipedia - Unix Permissions](http://en.wikipedia.org/wiki/Unix_permissions#Traditional_Unix_permissions)
* [File permissions for uploads](http://superuser.com/questions/581194/setting-correct-permissions-for-uploading-files)
