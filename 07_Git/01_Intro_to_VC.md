## Introducing Version Control (VC)

__Version control is a system of tracking changes to your code over time.__

In addition to tracking what changed, VC also tracks who made the change and what the purpose of the change was.

There are different VC systems but for this class we'll be using Git:

>> Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency. Git is easy to learn and has a tiny footprint with lightning fast performance.

## Benefits of Version Control

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
<img src='http://making-the-internet.s3.amazonaws.com/vc-local-to-git-and-live-server-alternative@2x.png' style='max-width:540px;'>

Working with VC/Git, you'll end up with at least three copies of your code base.

__The first copy will be on your computer.__ For this you'll need to set up a local server so you can run the code just like you do on your live server. Only you will be able to see this copy of the code, never live users.

Each collaborator that is working with you on a project will also have a copy of the repository on their computers.  

__The second copy will be the main repository__, and, for this course, it will be stored at Github.com.

__The third copy of your site is the code that runs on your live server__; this is what the rest of the world sees.

## Basic version control workflow

1. Make changes on a local copy of your code
2. Save changes
3. Test your work via your local server, how does it look? 
4. __Stage__ individual files that have changed
5. __Commit__ the files you staged
6. __Push__ your commits to Github

### When to commit
If you've done *anything* right at step 3, (and it doesn't have to be everything), it's probably time for a commit. As a rule of thumb, you should commit every time you make forward progress, that way if you make any backward progress (and we all do), you can look back in your history at when some piece was working.

When everything is set and you're ready to go live, you can check out exactly this version on your live server. Many people use release tags to mark these points, but you can always just refer to the ID of the last commit to keep track of what's on your live server.
