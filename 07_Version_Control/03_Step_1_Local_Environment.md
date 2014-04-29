In this class we're using what's called the __XAMP stack__.

The __X__ represents whatever operating system we're working from. For our local servers that might be Windows, Mac or Linux. For our live servers that's Linux.

The __A__ stands for __Apache__ - open-source web server.
The __M__ stands for __MySQL__ - open-source database server.
The __P__ stands for __PHP__ - web scripting language.

When setting up a local server, you could individually download and install Apache, PHP and MySQL, but it can be a hassle. Instead, we're going to use a convenient all in one package - MAMP for Mac and WAMP for Windows.

## Windows Users - Download and install WAMP


### Step 1) Decide which version of WAMP you need
[WAMP Download page](http://www.wampserver.com/en/)
WAMP gives you lots of download options. You'll want to choose the one with the latest versions of PHP / Apache that works with either your 32bit or 64bit  Windows.

[Instructions to determine if you have 32bit or 64bit Windows](http://windows.microsoft.com/en-US/windows7/32-bit-and-64-bit-Windows-frequently-asked-questions)

[This screenshot shows you which version of WAMP you need to download](http://note.io/1eYnCtw)

### Step 2) Download and install Visual C++ Requirements
When you choose the version of WAMP you want, the pop-up will tell you that you also need to download a Microsoft Visual C++ Redistribute Package. Choose the one that matches your Windows system (32 or 64bit). Make sure you download and install that before installing WAMP ([screenshot](http://content.screencast.com/users/susanBuck/folders/Jing/media/63924de8-6a56-4a64-a852-4b3b68bf7c8f/00002852.png)).

### Step 3) Download and install WAMP

### Step 4) Start Server
After WAMP installs and you've loaded it you should see the little W icon in your taskbar. If its not green, click "Start all Services" ([screenshot](http://content.screencast.com/users/susanBuck/folders/Jing/media/b6410df4-1551-44c4-a181-02cadcdbd9fa/00002832.png))

### Step 5) Test
Fire up your browser and hit your new server: __http://localhost__. If all went well, you should see the WampServer configuration page ([screenshot](http://susanbuck.net/jing/2013-01-08_1632.png)).


## Mac Users

### Step 1) Check for Sites folder
When you navigate to `/Users/YourUserName/` on your Mac, do you see a Sites folder? ([screenshot](http://note.io/17VRfcN)).

If yes, continue to the next step.

If no, open up Terminal and run this command to cerate a Sites folder:

	mkdir ~/Sites

The Sites folder is where you'll be placing all your web projects you want to run on your local server.	

### Step 2) Download and install [MAMP](http://www.mamp.info/en/index.html)
Note the download and installer includes both the regular-free version of MAMP and also MAMP Pro. 
We'll be using regular-free version in this course.

### Step 3) Configure document root
Once you install MAMP and see the main application window, click Preferences, then choose the Apache Tab and set the Document Root to be `/Users/YourUserName/Sites/` ([screenshot](http://note.io/17VRrZj))
 
### Step 4) Configure Port
In the Ports tab, change the Apache Port to 80 ([screenshot](http://content.screencast.com/users/susanBuck/folders/Jing/media/6f7fe7ad-78ff-4f40-ae5d-a80a9653bc34/00002848.png))

By default, web servers typically run on port 80. If we left this port number to something other than 80, we'd have to specify it when we attempt to load our web page in Step 6 below.

Ex: instead of saying http://localhost (assumed port is 80), we'd have to say http://localhost:8080. The former is much cleaner, so lets stick with port 80.

### Step 5) Start server
Close out the Port options window and then from the main MAMP window, choose *Start Servers* ([screenshot](http://content.screencast.com/users/susanBuck/folders/Jing/media/3bc4cf90-4045-4b34-a21a-49b97af444b5/00002795.png))

If all went well, both red dots (Apache and MySQL) should turn green.

If they don't, check your error logs in `/Applications/MAMP/logs` for clues as to why your services are not starting.




### Step 6) Test
Fire up your browser and test your new server at: __http://localhost__

You should see the MAMP welcome page ([screenshot](http://note.io/17PDMF5)).

## Get comfortable with Command Line

Mac users, open up the __Terminal app__ on your computer.

Windows users, goto Start, then Run and type in `cmd` to launch your __Command Prompt__.

Follow some of the commands from the <a target='_blank' href='/Version_Control/Command_Line_Cheat_Sheet'>Command Line Cheat Sheet</a>.



## Git Command Line
Git can be operated via either an app designed to work with Git or directly via command line (CL).

We're going to start with CL since it'll be pretty consistent for everyone, and because it's important to know how to operate Git with your CL for those times when an app just won't do. Once you get the hang of CL you can explore some apps.

### Step 1) Check for git
First, let's see if your computer already has Git installed.

Run this command:

	git

If you see an error telling you the command `git` is not recognized or not found, it means Git is not yet installed.

<img src='http://making-the-internet.s3.amazonaws.com/vc-git-not-installed.png'>

### Step 2) Download and install Git
If Git was not yet installed, head to the [download page](http://git-scm.com/downloads) and choose your operating system. 

Download the program and run through installation.

Windows users, here's some guidance on which options to choose for each screen of the installation process: [screenshots](http://making-the-internet.s3.amazonaws.com/vc-git-install-on-windows.png).

### Step 3) Close and re-open command line
Before git will start working, you have to close and re-open Terminal (Mac) or the command prompt (Windows).

### Step 4) Test
Run the git command again to test to confirm Git is now installed:

	git
	
If all went well, you should a bunch of instructions about different Git commands.

<img src='http://making-the-internet.s3.amazonaws.com/vc-git-success.png'>

### Step 5) Initial Git configuration
Run the following commands to set a user name and email key to be associated with any commits coming from your computer:

	git config --global user.name "Sam Seaborn"
	git config --global user.email sam@gmail.com
			
Let's do one more configuration which will make any Git input color coded (i.e. easier to read):

	git config --global color.ui true

That's it! Git is installed and you're ready for the next step.
