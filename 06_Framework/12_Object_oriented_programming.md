At this point, the framework is installed and your first application is running with basic routing at work. There's lots of work to do in terms of working with Libraries, Views, Databases, etc., but before we get to that let's pause to look at Objected Oriented Programming (OOP) which is used throughout this framework. 

OOP adds even more organization, structure and design to your code.

## Procedural Programming vs. Object Oriented Programming

**Procedural Programming**

* Executes code line by line: do this, then this, then this...
* Very much what we've been doing with our pick-up PHP approach
* Not inherently modular

**Object Oriented Programming**

* Programming using Classes (ex. a blueprint for a house) and Objects (the houses you build from that blueprint)
* Each Class manages its own methods (class specific functions) and properties (class specific variables)
* Good "team player" paradigm
* Focus on readability, convention, DRY

## Example
Here's an example of a class used for image manipulation:

	<?php
	# Classes are defined with the keyword "class"
	class Image {
		
		/*
		Class properties
		Encapsulation:
		Access modifiers indicate what access levels other classes can have to these properties
		1) Public    - Any other class can access the property
		2) Private   - Only this class can access the property
		3) Protected - This class and any class that inherits it can access this property
		*/
		protected $image;
		protected $width;
		protected $height;
		protected $mimetype;
		
		/* 
		Constructor
		__construct is a Magic method (optional), called whenever an object is instantiated
		Magic methods are reserved methods built into PHP, and prefixed with two underscores
		*/
		public function __construct($filename) {
			
			# Read the image file to a binary buffer
			$fp  = fopen($filename, 'rb') or die("Image '$filename' not found!");
			$buf = '';
			while(!feof($fp))
				$buf .= fgets($fp, 4096);
			
			/*
			Create image and asign it to the image property
			$this is a built in variable that points to the current object. 
			It's used to access properties and methods of the current class.
			*/
			$this->image = imagecreatefromstring($buf);
			
			# Extract image information storing in the class attributes
			$info           = getimagesize($filename);
			$this->width    = $info[0];
			$this->height   = $info[1];
			$this->mimetype = $info['mime'];
		}
		
		public function display() {
			header("Content-type: {$this->mimetype}");
			switch($this->mimetype) {
				case 'image/jpeg': imagejpeg($this->image); break;
				case 'image/png': imagepng($this->image); break;
				case 'image/gif': imagegif($this->image); break;
			}
		}
		
		public function resize($width, $height) {
			$thumb = imagecreatetruecolor($width, $height);
			imagecopyresampled($thumb, $this->image, 0, 0, 0, 0, $width, $height, $this->width, $this->height);
			$this->image = $thumb;
		}
		
	} # eoc
	
	?>

Summary:
We've created a Image Class with 4 protected properties, 1 magic method and 2 regular methods.
	
Here's how we could use the above class to resize a 500x500 image down to 250x250:

	/*
	Instantiate an Image object using the "new" keyword
	Whatever params we use when instantiating are passed to __construct 
	*/
	$imageObj = new Image('http://placekitten.com/500/500');
	
	/*
	Call the resize method on this object using the object operator (single arrow ->) 
	which is used to access methods and properties of an object
	*/
	$imageObj->resize(200,200);
		
	# Display the resized image
	$imageObj->display();


## Resources
### References
* [PHP.net OOP](http://www.php.net/manual/en/language.oop5.php)
	* [Class Basics](http://www.php.net/manual/en/language.oop5.basic.php)
	* [Properties](http://www.php.net/manual/en/language.oop5.properties.php)
	* [Visibility](http://www.php.net/manual/en/language.oop5.visibility.php)
	* [Constructors / Destructors](http://www.php.net/manual/en/language.oop5.decon.php)
	* [Scope Resolution Operator](http://www.php.net/manual/en/language.oop5.paamayim-nekudotayim.php)
	* [Static keyword](http://www.php.net/manual/en/language.oop5.static.php)
	* [Magic methods](http://www.php.net/manual/en/language.oop5.magic.php)

### Readings
* [killerphp.php: OOP in PHP Tutorial](http://www.killerphp.com/tutorials/object-oriented-php/downloads/oop_in_php_tutorial.pdf)
* [tutsplus.com: OOP PHP for Beginners](http://net.tutsplus.com/tutorials/php/object-oriented-php-for-beginners/)


