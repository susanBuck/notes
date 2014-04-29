**FYI: This is an info only page; no action steps need to be taken.**

## Introduction
There are two approaches to developing with PHP. 

Often, beginners will start off with what we'll call the *pick-up* approach, analogous to a pick-up game of football. There's not much organization or structure, but you've got the rough idea of an offense, defense, passing, receiving, etc. It isn't pretty, but it's a game nonetheless. 

As your skills improve though, you find yourself wanting more structure. You think that if you just had a little more strategy and organization, you'd be much better at the game. You think about plays, efficiency, teamwork, etc. You seek order, a system by which you can operate so you're consistent, make fewer mistakes and get better and faster at the game.

This is where the framework approach comes in. It turns your pick-up approach into a more organized and polished sport.

## What is a framework exactly?
Simply put, **a framework is a collection of files you download that contain pre-existing code you'll build your application around**. These files contain all the pieces you need to quickly develop applications. Your job will be to download the framework, set it up on your servers (local and live) and then start programming your application.

There are many popular PHP frameworks being used today:

* [Yii](http://www.yiiframework.com/)
* [CakePHP](http://cakephp.org)
* [CodeIgnitor](http://codeigniter.com/)
* [Slim](http://slimframework.com/)
* [Laravel](http://laravel.com/)
* [Etc...](http://en.wikipedia.org/wiki/Comparison_of_web_application_frameworks#PHP_2)

For this course, we'll be using a custom, micro-framework. The idea is for us to quickly get an understanding of frameworks in general, not necessarily to create a course on any one particular brand. I.e., this is not a CakePHP course, or a CodeIgniter course, etc.

You will find that after you go through the steps of using this framework, you will be well prepared for making the leap to another framework should you decide to do so. Also, because you'll understand more about frameworks, you'll be able to make a more informed decision about which framework is the best for your application needs.

## Features
Dig into any of the above framework brands and you will find that frameworks come packed with features. For the sake of this semester, though, we want to focus on **two framework essentials**:

### 1. Routing:
* We want all requests to our app to be routed through our index.php file.
* All requests will follow a controller/method convention.
* Each method will, if needed, call upon a view.

### 2. Database Interaction:
* We want a library that will help faciliate the basic CRUD (Create, Read, Update, Delete) database interactions, doing so in a secure manner.

In addition to those core components, this framework also comes with handful of other libraries you'll be able to explore in your projects:

* Debug
* Email
* File
* Form
* Geolocate
* Image
* Log
* Time
* Upload
* User
* Utils



