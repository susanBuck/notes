This isn't just about Version Control / Git; it's about optimizing your web development workflow and how to tie together the following pieces:

+ your local development environment
+ your version control repository
+ your live server

The challenge ahead: Lots of different variables

+ Software (versions, OS's, code editors, etc.)
+ Servers
+ Settings

Expect troubleshooting; expect things to not work on the first try; expect having to seek out answers.

Good news: set it and (mostly) forget it.

## Less than ideal workflows
These are some common (unideal) workflows used by beginner developers. Each workflow hinges heavily on the use of FTP to edit files on a server.

### The Live Audience Workflow
1. FTP into your live server.
2. Make changes to files.

Pros/Cons?

<!--
__Upsides__ Straightforward, quick to set up
__Downsides__ Users viewing your site can see the changes as you make them; no history of changes
-->

### The Dev File Wrangling Workflow
1. FTP into your live server.
2. Create "dev" copies of the files you want to work on.
3. Make changes to the "dev" copy.
4. When done with edits, clone the "dev" file back to the original.

Pros/Cons?

<!-- 
+ Downsides: Tedious; apps very rarely touch just one file, no history of changes
+ Upsides: Users can't see the changes as you make them
-->

### The Local to Live Sync Workflow
1. Run a local server, maintain a full clone of your site.
2. Make changes on the local server.
3. When done FTP changes to the live site, or use something like rsync to keep the local and live files in sync.

Pros/Cons?

<!--
+ Downsides: Have to keep track of all the files you've made changes to, no history of changes
+ Upsides: Users can't see the changes as you make them
--> 

### What other workflows have you used?

## Introducing Version Control (VC)
We're going to remove FTP from the workflow picture and replace it with version control.

__Version control is a system of tracking changes to your code over time.__

In addition to tracking what changed, VC also tracks who made the change and what the purpose of the change was.

There are different VC systems (ex: Subversion) but for this class we'll be using Git:

>> Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency. Git is easy to learn and has a tiny footprint with lightning fast performance.


## Benefits of Version Control

[Github.com preview]

### Workflow enhancement
+ Because Git keeps a running history of your changes, you can quickly revert to a previous state of your code if you mess something up. Think cmd+z for programming.

+ Ability to create *branches* of your code for working on new features, starting on different versions, etc.

### Teamwork
+ Helps developers prevent overlapping each other's work.
+ Accountability&mdash; every change shows who authored it.
+ Having a history of changes can solve a lot of mysteries. 

### Backup
+ Storing your code in a Git repository serves as an ongoing backup of your code.




## How it works
<img src='http://making-the-internet.s3.amazonaws.com/vc-local-main-git-users.png'>

Working with VC/Git, you'll end up with at least three copies of your code base.

__The first copy will be on your computer.__ For this you'll need to set up a local server so you can run the code just like you do on your live server (you'll need Apache, PHP, MySQL). Only you will be able to see this copy of the code, never live users.

Each collaborator that is working with you on a project will also have a copy of the repository on their computers.  

__The second copy will be the main repository__, and, for this course, it will be stored at Github.com.

__The third copy of your site is the code that runs on your live server__; this is what the rest of the world sees.


## The basic version control workflow looks like this

1. Make changes on a local copy of your code
2. Save changes
3. Test your work via your local server, is everything good? 

Steps 1,2,3 repeat over and over until the feature or change you're working on is ready.
When everything is set and you're ready to go live...

4. __Stage__ individual files that have changed
5. __Commit__ everything you staged
6. __Push__ your commits to Github
7. Deploy: __Pull__ your changes from Github to your live server for the world to see.

We'll be digging into all these steps in the following steps.
