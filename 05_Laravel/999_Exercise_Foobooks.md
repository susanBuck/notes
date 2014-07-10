<img src='http://making-the-internet.s3.amazonaws.com/laravel-foobooks-logo@2x.png' class='' style='max-width:903px; width:100%' alt=''>



## Foobooks Spec

Create a web application called Foobooks to manage a collection of the books.

The homepage should include the following:

+ A logo
+ A search box
+ A link to view all books
+ A link to add a new book

Each book should include the following attributes:

+ Title
+ Author
+ Published date
+ Tags
+ A cover image
+ A link to bookstore where the book can be purchased

The search feature should query amongst any of the above criteria.

The search results should have the following output options:

+ Regular HTML (default)
+ JSON
+ PDF

On the regular HTML output, next to each book listing there should be a link to edit the book. This page should only be accessible to admins.




## Procedure

1. Define Routes
2. Set up data source ([books.json](https://gist.github.com/susanBuck/1e46ca463e6d15ffa1b1)) with a practice route `/data`.
3. Packages: Pretty debugging with "Pre"
4. Views: Build homepage
5. View Inheritance: Create master template
6. Pass Data to Views
7. Returning JSON instead of a View
8. OOP: Library Class
9. Filters: Making data available to multiple routes
10. Forms: Search ([pre-built search methods](<https://gist.github.com/susanBuck/9e259e2aeb457085177a>))


## Topics covered

+ [Composer Packages](https://github.com/susanBuck/notes/blob/master/05_Laravel/06_Composer_Packages.md)
+ [Views and Blade](https://github.com/susanBuck/notes/blob/master/05_Laravel/08_Views.md)
+ [Object Oriented Programming](https://github.com/susanBuck/notes/blob/master/05_Laravel/999_OOP_Summary.md)
+ Responses
+ Filters
+ Forms and Request Data
