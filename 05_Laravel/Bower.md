Resources:

* <https://laracasts.com/lessons/save-time-with-bower>
* <http://blog.teamtreehouse.com/getting-started-bower>
* <http://code.tutsplus.com/tutorials/meet-bower-a-package-manager-for-the-web--net-27774>

Bower is a **front-end package manager**; it's like Composer but for CSS, JS and other front-end components.

Assumptions: You've already installed Node and have access to npm

Now, install Bower:

```bash
$ npm install -g bower
```
	
Common Problems: [1](http://stackoverflow.com/questions/21616785/bower-installation-errors)

Test that bower is installed:

```bash
$ bower
```
	
See what commands you have available to you with bower:

```bash
$ bower help
```
	
Get help about a specific command, for example `list`

```bash
$ bower help list
```

Search for plugins, for example jQuery:

```bash
$ bower search jquery
```
	
FYI: Regular old jQuery should be all the way at the top.

You can also browse for packages at <http://bower.io/search/>

Before you install anything, tell Bower where to put stuff. 

In the root of your application create a file called `.bowerrc` and fill it with the following JSON, editing the directory to the path where you want your Bower packages to live. 

```
{
	"directory": "public/vendor/"	
}
```

In the case of a Laravel app, we put our Bower packages in `public/vendor/`. 
This follows the naming convention that Composer users in that all its packages are stored in a `vendor` folder. Bower is all about front-end packages, though, so it goes in `public/vendor/`.

Next, create a `bower.json` file in the root of your app which is where you can list your dependencies. Set a value `name` to be the name of your app. We'll start with one dependency: jQuery. 

```
{
  "name": "Foobar",
  "dependencies": {
    "jquery": "~1.x"
  }
}
```

Now, whenever you run `bower install` it will grab all the dependencies you have listed in this file (just like when you do `composer install` and grab PHP dependencies)
	
You should now have jQuery installed in `/public/components/jquery`

In your master view, you can now link in jQuery in the head of the page:

```html
<script src='/components/jquery/dist/jquery.min.js' type='text/javascript'></script>
```

Tip: for future packages, if you want to skip the step of manually editing `bower.json` you can just run a command like this:

```bash
$ bower install jquery -S
```

Make sure you include the -S flag (Save) so it will also update your `bower.json` file.

If you want to remove a package:

```bash
$ bower uninstall jquery -S
```
	
Again, the -S flag here makes sure it not only deletes the jQuery files but also updates your `bower.json` file.




## Production

If you're working on a production server that supports Node/npm you'd want to tell Git to ignore the `public/vendor/` so your components aren't transferred via Git. 

This is similar to how you don't want Composer's `vendor/` directory to be tracked in version control, since the server (and any teammates) will run `composer install` and get the needed dependencies.



## Creating your own packages

Often, front-end code you write for one project can have use across multiple projects. One way to manage/maintain this code is by turning it into your own Bower package. If you wish, you can even make your package publicly available for others to use.

For example, let's say you write some CSS and JavaScript code to manage form validation. 

To get started, you'll want to name this package; for example's sake, we'll call it `form-validation`.

Locally, you'd create a folder named `form-validation` and put the necessary client assets in it (CSS, JS, any images, fonts, etc.).

Next, to make this package shareable, you'd want to publish it in a Github repository and note the Git URL.

Once your package is tested and ready to go, you need to initiate it as a Bower package by [following these steps](http://bower.io/docs/creating-packages/). 

Now, you can start using this package in your projects. 

Within a project directory you can install your package using its Github URL, just like you would any other package:

```bash
bower install git@github.com:yourGithubUsername/form-validation.git -S 
```


## Updating packages you created

Ref: <https://oncletom.io/2013/live-development-bower-component/>

When working with a package you created, you may find yourself wanting to make changes to that package and test those changes in projects. One way to do this is by updating the package, pushing it to Github, then running `bower update` in the project you're testing in. 

Obviously, though, this process would be a little tedious for active development&mdash; you don't want to have to go through these steps just to test every little change.

Alternatively, you can create a Bower __link__ between your package and the project. That way, when you update the package locally, your project will point to the local updates. 

Bower link command: <http://bower.io/docs/api/#link>

Instructions:

In your package directory (ex, `form-validation`):

```bash
bower link
```

Then, in the directory of the project that is using your package:

```bash
bower link form-validation
```

The above steps will create a symbolic link the file path in your project and a live copy of the package. You can see this link represented as an arrow when looking in your bower directory:


```bash
$ cd foobooks/public/vendor

drwxr-xr-x+  5 Susan  staff  170 Jan 20 23:55 .
drwxr-xr-x+ 13 Susan  staff  442 Jan 20 23:22 ..
lrwxr-xr-x   1 Susan  staff   50 Jan 20 23:55 form-validation -> /Users/Susan/.local/share/bower/links/form-validation
drwxr-xr-x+  7 Susan  staff  238 Jan 20 23:19 jquery
drwxr-xr-x+ 15 Susan  staff  510 Jan 20 23:21 jquery-ui
```


