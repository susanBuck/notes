## Start
1. In a blank document in your code editor add this text: `Hello World!`
2. Save the file to your computer with the filename `practice.html`
3. In the Sublime window, right click and choose *Open in Browser...*





## What is HTML?
* HyperText Markup Language
* Put together and maintained by the [W3 Consortium](http://www.w3.org/)
* Looking towards HTML5
* The role of CSS
* HTML consists of **elements** that give the browser instructions on how a page is structured
* Elements are made up of **tags**, ex: `<header>`, `<p>`
* [MDN Element reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element?redirectlocale=en-US&redirectslug=HTML%2FElement)




## Non-void Elements
Some elements surround content. When they do, they have a start tag and an end tag.
	
	<h1>Welcome to Susan's Web Site</h1>

The forward slash in the second tag indicates it's the **end tag**.




## Void Elements
Other elements don't surround content, they live all by themselves.
Here the [break element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br) is used on its own to add new lines:


	1 Main Street<br>
	Cambridge, MA<br>
	USA<br>


	
## White Space
HTML ignores all spaces (past 1) and breaks
If you want to add blank spaces you have to specify with an [HTML entity](http://www.w3schools.com/tags/ref_entities.asp): `&nbsp;`

List of HTML entities: [nice-entity.com](http://www.nice-entity.com)

If you want line breaks you can use elements such as `<br>`, `<div>` or `<p>`




## Tag teamwork
Some tags work together with other tags
An `<ul>` ([unordered list](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul)) tag teams up with `<li>` ([list item](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li)) tags:

~~~~
<h2>Here are some of my favorite web sites:</h2>

<ul>
  <li>Google</li>
  <li>Women's Coding Collective</li>
  <li>Tumblr</li>
</ul>
~~~~

Note how the `<li>` elements are __nested__ *inside* the `<ul>` elements.





## Tag Reference

Let's dig deeper into the [MDN Element reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element?redirectlocale=en-US&redirectslug=HTML%2FElement)

* Elements to avoid
* Obsolete / deprecated elements
* Elements new for HTML5
* Semantic elements




## Attributes
Some start tags have **attributes** to describe information about that element.

Example, the `<a>` element ([anchors](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) i.e., links) has the `href` attribute which dictates where a link should go.


	<a href='http://wikipedia.org'>The Free Encyclopedia</a>


`target` might specify a link should open in a new tab


	<a href='http://wikipedia.org' target='_blank'>The Free Encyclopedia</a>


__Practice:__ Update your list of favorite links above to make the list items active links.




## Images

Images have a `src` attribute to specify the image's location

~~~~
<img src='kitten.png'>
~~~~

The `alt` attribute is required for non-decorative images:

~~~~
<img src='kitten.png' alt='Adorable kitten'>
~~~~


**Practice:** Find an image on Wikipedia of your favorite animal.

Right click on that image and find the option to copy the image URL. 

* Chrome: *Copy Image URL* 
* Firefox: *Copy Image Location*
* Safari: *Copy Image Address*

On your page, use this URL to display the image in an `<img>` element.

Example:


	<img alt='Adorable kitten' src='http://practice-pixels.s3.amazonaws.com/kitten_500x400.jpg'>





## Pulling the pieces together

Make it so your animal image is also a link to the Wikipedia article about that animal.

I.e. How can you use nesting to combine `<a>` and `<img>` to make a linked image?


