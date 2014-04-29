## Keeping organized

* Just like your computer has directories to keep things organized, so does a server
* Web sites are made of many different assets (images, CSS files, JS files, HTML pages, etc.)

Example Scenario: Personal Portfolio

	/public_html/
		index.html
		css/
			master.css
		images/
			logo.png
			client-abc-screenshot.png
			client-abc-thumb.png
			client-xyz-screenshot.png
			client-xyz-thumb.png
		contact.html
		about.html
		graphic-design/
			client-abc.html		
		photography/
			client-xyz.html
		

## Index.html
`index.html` is the first file a server looks for when you enter a domain or a domain followed by a subdirectory. 

`http://domain.com/index.html` works the same as `http://domain.com`
`http://domain.com/photography/index.html` works the same as `http://domain.com/photography/`

Note: index.html only works on web servers and won't work on your local computer.


## Absolute Paths
An absolute path tells the server *exactly* where something is. 

Examples:
	
	<img src='/images/logo.jpg' alt='Portfolio Logo'>
	
	<a href='/graphic-design/client-abc.html'>Client ABC</a>
	
	<link rel='stylesheet' type='text/css' href='/css/master.css'>

All absolute paths start with a forward slash; this says to go to the beginning, or the *root* of the server and find the file from there.

Think of an absolute path as an exact address. 

	White House
	1600 Pennsylvania Ave NW, Washington DC 20500

## Relative Paths
A relative path tells your code where something is *relative* to where you currently are in a directory.

	How to get to the White house from the Washington Monument
	* Head southeast toward Independence Ave SW
	* Turn right onto Independence Ave SW
	* Slight right onto 17th St SW
	* Etc.
	
Relative paths do not start with a forward slash

Relative paths use the `../` syntax to go &ldquo;up&rdquo; one directory


## Practice
Make the following happen using both relative and absolute links

* From index.html display the logo
* From index.html link to client-abc.html
* From client-abc.html link to client-xyz.html
* From client-xyz.html display the logo

	


## External Absolute Paths

When linking outside your site, always use full absolute paths *including* http:// and the domain name.

Examples: 

	I'm inspired by the work of <a href='http://frankdesigns.com/portfolio/'>Frank</a>

	<script href='https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/
	jquery.min.js'  type='text/javascript'>
	
If you forget the `http://` the browser will think it's an internal link; i.e. a link within your site.
