<img src='http://making-the-internet.s3.amazonaws.com/laravel-foobooks-logo@2x.png' class='' style='max-width:903px; width:100%' alt=''>



## Foobooks Spec

Create a web application called Foobooks to manage a collection of books.

The homepage should include the following:

+ A logo ([laravel-foobooks-logo@2x.png](http://making-the-internet.s3.amazonaws.com/laravel-foobooks-logo@2x.png))
+ A search box
+ A link to view all books
+ A link to add a new book

Each book should include the following attributes:

+ Title
+ Author
+ Published date
+ Tags
+ A cover image
+ A link to barnesandnoble.com where the book can be purchased

The search feature should query amongst any of the above criteria.

The search results should have the following output options:

+ Regular HTML (default)
+ JSON
+ PDF

On the regular HTML output, next to each book listing there should be a link to edit the book. This page should only be accessible to admins.




## Procedure
0. Create a plan
1. Define Routes
2. Set up data source ([books.json](https://gist.github.com/susanBuck/1e46ca463e6d15ffa1b1)) with a practice route `/data`.
3. Packages: Pretty debugging with *Pre*
4. Views: Build homepage
5. View Inheritance: Create master template
6. Pass Data to Views
7. Returning JSON instead of a View
8. OOP: Library Class
9. Filters: Making data available to multiple routes
10. Forms: Search ([pre-built search methods](<https://gist.github.com/susanBuck/9e259e2aeb457085177a>))
11. Migrations / Schema: Create and populate a books table
12. Build the *Add a book*
13. Build the *Edit a book*


## Topics covered

+ Composer Packages ([notes](https://github.com/susanBuck/notes/blob/master/05_Laravel/04_Composer_Packages.md))
+ Views (and Blade) ([notes](https://github.com/susanBuck/notes/blob/master/05_Laravel/05_Views.md))
+ Object Oriented Programming ([notes](https://github.com/susanBuck/notes/blob/master/05_Laravel/999_OOP_Summary.md))
+ Responses (See Codebright/Laravel Docs)
+ Filters (See Codebright/Laravel Docs)
+ Forms and Request Data (See Codebright/Laravel Docs)
+ Databases: SQL Primer ([notes](https://github.com/susanBuck/notes/blob/master/05_Laravel/06_Databases_SQL_Primer.md))
+ Databases: Configuration ([notes](https://github.com/susanBuck/notes/blob/master/05_Laravel/07_Databases_Configuration.md))
+ Databases: Schemas & Migrations ([notes](https://github.com/susanBuck/notes/blob/master/05_Laravel/08_Databases_Schemas_Migrations.md))
+ Databases: Eloquent ORM ([notes](https://github.com/susanBuck/notes/blob/master/05_Laravel/09_Databases_Eloquent_ORM.md))

