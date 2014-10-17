## Step by Step

[Click to enlarge...](http://thewc.co.s3.amazonaws.com/challenges/css-layouts-fixed-example.png)

[<img width=150 src='http://thewc.co.s3.amazonaws.com/challenges/css-layouts-fixed-example.png'>](http://thewc.co.s3.amazonaws.com/challenges/css-layouts-fixed-example.png)

1. Fire up two new docs: one for your HTML and one for your CSS. Fill in your HTML with the necessary starting bits (head, body, link to external style sheet, etc.); set your background color via the body element.

2. Create your overall wrapper; make it 960px wide and make it always centered on the page.

3. Create the main heading within the wrapper. Semantically, what's the best tag to use for this? Center the text within your header and apply the appropriate amount of margin and / or padding.

4. Below the header is navigation which you'll want to set with `<li>`'s inside of a `<menu>` element. By default `<li>`'s stack; how can you get them to sit next to each other?

5. Below the navigation bar is a left column and right column. Create these and fill with the given content / elements. You can get your image from <http://thewc.dev/practice-pixels> and your filler text from <http://kittyipsum.com>.

6. Finally, the footer! As you plop this div in your code, you'll probably notice it floats up below your two columns in a very annoying fashion. Which brings us to....

## Clearing floats

One way to clear floats is to have footer or other element that *clears* the floats above.

	<style>
		#wrapper {
			 border:2px solid purple;
			 width:500px;
			 margin:auto;
		}
		
		footer {
			 /* 
			 Value options for clear are "left" (clear left floated elements), 
			 "right" (clear right floated elements), 
			 or "both" (clear both left and right floated elements).
			 */
			 clear:both; 
		}
		
		section {
			 background-color:#A2D600;
			 width:225px;
			 padding:10px;
		}
		
		#main {
			 float:left;
		}
		
		#secondary {
			 float:right;
		}
	</style>
	
	<div id='wrapper'>
		 
		 <section id='main'>
		 	Kitty ipsum dolor sit amet, toss the mousie zzz hiss attack your ankles sleep on your face, chase the red dot tail flick eat lick judging you. Knock over the lamp kittens biting hiss hiss stretching, claw attack give me fish kittens lick lick.
		 </section>
		 
		 <section id='secondary'>
		 	Biting rip the couch sleep on your keyboard chuf, lay down in your way judging you judging you hiss puking climb the curtains toss the mousie. I don't like that food leap sleep on your keyboard sleep on your keyboard.
		 </section>
	
		 <!-- This forces the wrapper to expand past the columns -->
		 <footer>&copy; 2014</footer>
	</div>
	
Only use this method if you have some content you need below your columns; don't just create empty elements for the sake of clearing. If you have no need for additional elements, use this technique: [micro clearfix hack](http://nicolasgallagher.com/micro-clearfix-hack/).

