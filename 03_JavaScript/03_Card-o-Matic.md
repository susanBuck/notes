
In the following examples you'll be working towards building a JavaScript powered Card Generator.

**Final Version: [Card-o-Matic](http://thewc.co/data/challenges/card-o-matic/)**

Topics covered:

* Ajax
* Event listeners
* `.css()`
* `.val()`
* `.html()`
* `.prepend()`
* `.append()`
* `.clone()`
* `.remove()`
* If...else...
* jQueryUI (`.draggable()`)

The following notes serve as a roadmap of all the steps to complete the project. 
**For full documentation**, refer to the well-commented final source code:

* [index.html](/examples/_js/card-o-matic/) (Use View Source to see HTML code)
* [card-o-matic.js](/examples/_js/card-o-matic/js/card-o-matic.js)
* [features.css](/examples/_js/card-o-matic/css/features.css)
* [main.css](/examples/_js/card-o-matic/css/main.css)



## Setup
Download and unzip [card-o-matic.zip](http://thewc.co/data/challenges/card-o-matic/card-o-matic.zip).

Open the following files in your code editor:

* `/index.html`
* `/css/features.css`
* `/css/main.css`
* `/js/card-o-matic.js`

Also, note the image files included in the zip:

* `card-background.jpg`
* `sticker-green-gift.png`
* `sticker-heart.png`
* `sticker-star.png`
* `sticker-yellow-gift.png`
* `texture-circles.png`
* `texture-cloth.png`
* `texture-paper.png`
* `texture-swirls.png`

## Color chooser
**Step 1:** Add the color blocks and style them.

**Step 2:** Write a click listener for the color blocks.

Figure out what color was clicked using `$(this)`:

>>In many object-oriented programming languages, this (or self) is a keyword which can be used in instance methods to refer to the object on which the currently executing method has been invoked. [-wikipedia](http://en.wikipedia.org/wiki/This_%28computer_science%29)

[jQuery &ldquo;this&rdquo; keyword](http://learn.jquery.com/javascript-101/this-keyword/)

**Step 3:** Introduce [JavaScript variables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Values,_variables,_and_literals#Declaring_variables) to store the color.

**Step 4:** Assign the color to `#canvas`, a div which is already in the HTML.

**Step 5:** CSS [cursor property](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) (`cursor:pointer;`) to make the color blocks look clickable.

## Textures chooser

**Step 1:** Add the 4 texture blocks and style them.

**Step 2:** Write a click listener for the texture blocks.

**Step 3:** Make the color picker also change the color of the texture blocks.


**Bonus:** Add one more texture to your options.

## Message

**Step 1:** Add the 4 message [radios](https://developer.mozilla.org/en-US/docs/XUL/radio), each with the `name='message'` and a unique id.

**Step 2:** After each radio, create a [label](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) element. 

Give each label a `for` attribute to match the id of the radio it's labeling.

**Step 4:** Attach a click event to the radio buttons.

**Step 5:** Note there's a div with the id #message already in the #canvas. Use [.html()](http://api.jquery.com/html/) to put the message in that div.

## (Bonus) Font chooser
Add an option that lets you choose the font of your message

## Recipient

**Step 1:** Add a [text input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#A_simple_input_box).

**Step 2:** Attach a keyup event to that text input.

**Step 3:** Use the [.val()](http://api.jquery.com/val) method to retrieve content entered in form elements; store the results in a variable.

**Step 4:** Use [.html](http://api.jquery.com/html) to put the message in the existing `#recipients` div in the canvas.

**Step 5:** Concatenate strings with the [+ operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/String_Operators) to add an exclamation point to the end of the person's name.

## Recipient Error checking

**Step 1:** Add a `maxlength` attribute on the recipient text field to limit the characters to 14.

**Step 2:** Use the JS [.length String property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length) to determine how many characters a user has entered; store the results in a variable.

**Step 3:** Show a countdown message of how many characters the user has left.

**Step 4:** Use an [If...Else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) statement to toggle the color of the message depending on whether the user have enough characters left (grey) or not (red).


**Bonus:** If you go back and delete the recipient, you're left with just an exclamation point on the card. Make it so this only shows if the user has something typed in.

Hint: `var validate = recipient.replace(" ", "", recipient);`

## Stickers
**Step 1:** Add the 6 stickers, and give them a click listener.

**Step 2:** Use the [.clone()](http://api.jquery.com/clone) method to duplicate the stickers on click.

**Step 3:** Use the [.prepend()](http://api.jquery.com/prepend) method add the cloned sticker to the canvas.

## Draggable stickers
**Step 1:** Add jQuery UI to your page, right after the jQuery include.

	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
	
**Step 2:** Use the [.draggable()](http://jqueryui.com/draggable/) interaction on the stickers.

**Step 3:** Contain the draggable elements to the canvas

**Bonus:** Make all the elements on the card draggable, not just the images.


## (Bonus) Refresh Button
Create a button that when clicked will...

* Reset the card to white
* Clear the texture
* Clear any messages and recipients
* Remove any graphics (check out the `.remove()` method)

## (Bonus) Deleting Graphics
When you click on a graphic it should delete itself.

## (Bonus) Printable Version

## (Bonus) Ajax Image Search
     





