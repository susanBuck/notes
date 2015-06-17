## What is the PATH variable?
When you run a command for a program in CL, it looks for the corresponding executable files using the directories listed in your *PATH variables* as a map. Given this, when you add a new executable/program you wish to use via CL, you have to add its directory to your PATH variable, which is one of many Environment Variables your computer uses.




## Mac: Edit your PATH
To start, use this command to see what your PATH variable is currently set to:

```bash
echo $PATH
```

Your PATH variable is built from the contents of `/etc/paths`.

You can add paths to this file, or append to PATH via `~/.bashrc`. 


__Adding a new path__
Let's look at an example scenario of adding Sublime Text to your path.

Sublime includes a Command Line tool called `subl` located at `/Applications/Sublime Text.app/Contents/SharedSupport/bin/`, so that's the path we want to add. 

To do this, in `~/.bashrc`, add this line:

```bash
# Set PATH to be whatever PATH currently is, plus the path to Sublime
export PATH=$PATH:"/Applications/Sublime Text.app/Contents/SharedSupport/bin/"
```

Note the path ends with a trailing backslash. The idea is to point to the directory where `subl` can be found, not the actual `subl` file itself.

Close and restart Terminal.

Test it out:

```bash
# Where is subl?
$ which subl

# What version?
$ subl -v

# Try opening a file
$ subl foobar.txt
```

Moving forward, whenever you want to add a new path you can add a new append line to your `~/.bashrc` file.

Ref: [Mac OSX Change Path Variables](http://architectryan.com/2012/10/02/add-to-the-path-on-mac-os-x-mountain-lion/#.U9nTwIBs9vI).




## Windows: Edit your PATH

To start, use this command to see what your PATH variable is currently set to:

```bash
PATH
```

PATH variables in Windows are set not via Command Line, but instead via a screen within *My Computer* for *Environment Variables*

To get to this screen, goto *My Computer* > *Properties* (alternatively, you can get here by running `sysdm.cpl` from Command Line)

Then, from the *Properties* screen, go to *Advanced* > *Environment Variables* > *Path*.

(Alternatively, you can type &ldquo;Environment Variables&rdquo; into Search to jump right to this screen.)

You'll find `Path` under *System variables*.

Each path is separated by a semi-colon. Here's an example similar to what you might see:

	%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;%SYSTEMROOT%\System32\WindowsPowerShell\v1.0\;


__Adding a new path___

Let's look at an example scenario where we add Sublime Text to your path.

Sublime includes a Command Line tool called `subl` located at `C:\Program Files\Sublime Text 3\`, so that's the path we want to add. 

The spaces in this path will cause problems though, so use the `dir /x` command to find out the alternative names, sans spaces.

```bash
$ cd c:\Program Files
$ dir /x

# In the results you'll see the alternative name is PROGRA~1
$ cd PROGRA~1
$ dir /x

# In the results you should see the altnerative name for Sublime is SUBLIM~1
```

Based on the above, we've determined the appropriate, space-free, path to Sublime is:
```bash
c:\PROGRA~1\SUBLIM~1\
```

Now that you know the path, you could append it on to your main `Path`, but to keep things cleaner, I suggest creating a new System Variable called `my_paths`, which you'll set to be Sublime. Down the road, you can add new custom paths here, separating each one with a comma.

[ image creating my_paths ]

Make sure you end your path with a trailing backslash. The idea is to point to the directory where `subl` can be found, not the actual `subl` file itself.

Once that's created, edit `paths` to append `my_paths`:

    %SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;%SYSTEMROOT%\System32\WindowsPowerShell\v1.0\;%my_paths%

<img src='http://making-the-internet.s3.amazonaws.com/laravel-setting-path-variable-on-windows.png?@2x' class='' style='max-width:1371px; width:75%' alt=''>

Ok/Save your changes.

Restart your Command Line.

Test it out:

```bash
# Where is subl?
$ where.exe subl

# What version?
$ subl -v

# Try opening a file
$ subl foobar.txt
```

Moving forward, whenever you want to add a new executable, just append it to your `my_paths` system variable.

### Reference
+ [SO: Adding directory to PATH Environment Variable in Windows](http://stackoverflow.com/questions/9546324/adding-directory-to-path-environment-variable-in-windows)
+ [How to set path and environment variables in Windows](http://www.computerhope.com/issues/ch000549.htm)

