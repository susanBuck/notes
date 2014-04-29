## Setup
Create a mock launch page for a hypothetical application called *Ice Cream Finder* - [Final Demo](http://mti.thewc.co/examples/_photoshop/ice-cream-finder.html)

All the files for this class can be found here: <http://mti.thewc.co/examples/_photoshop/>

<img src='http://making-the-internet.s3.amazonaws.com/photoshop-ice-cream-finder.png'>


## Create a new document

* 960x800px and 72dpi
* 960 is a good starting width to aim for when designing for the web, but consider more flexible layouts ala responsive web design if a significant portion of your audience will be accessing your site on devices other than computer screens


## Background pattern

* New document: 10x10px
* Make sure the **Info Panel** is open (**Window: Info**)
* Use **Selection Tool** to select half the image (5px). Look at **Info Panel** to make sure you're getting right size.
* Use the **Paint Tool** to fill the selection with the color of your choice
* Create a **Swatch** of that color for future use
* Click **Edit: Define Pattern** and give the pattern a name
* Go back to our original document and create a new layer; fill it with white.
* Right click the new layer layer and choose **Blending Options**

	* In Blending Options we can change all sorts of settings about our layer. This is called non-destructive editin
	g because nothing is permanently change the layer - everything can be edited or removed later.
* Check **Pattern Overlap** and choose the one you just created. Play around with the settings if desired.
* Bonus: Check out <http://subtlepatterns.com> for a plethora pre-built pattern files you can use in Photoshop.

## Logo

* For the logo, we want to reach beyond web safe fonts and find something unique, ala [Google Web Fonts](http://www.google.com/fonts). We'll download the font to use in Photoshop, but down the road you'll also be able to use it directly in your HTML/CSS.
* Pick a font from Google Web Fonts and click the button that says **Add to collection**.
* With the font in your collection, click the **Use** button then find the link on the top right that says **Download your collection**. This will give you a zip file, and when you open that you should see a .ttf file.
* Install the new font:

	* **Newer versions of Windows:** Select the font files (.ttf, .otf or .fon) then Right-click > Install
	* **Older versions of Windows:** Place the font files (`.ttf`, `.otf` or `.fon`) into the Fonts folder, usually `C:\Windows\Fonts` or `C:\WINNT\Fonts`
	* **Mac:** Double click the `.ttf` font file and choose the *Install Font* option
	
* Select the **Text Tool** and write out the title in white. Make the text box match the size of the text you're using (When you click just once with the Text tool you get a Text Path, when you click and drag to make a box, you get a Text Paragraph).
* Change your logo to your font, then open that layer's **Blending Options**
* Check **Stroke** and make it 6px wide and the color of your choice (don't forget to save this as a swatch)


## Save the .psd
* Quick! Before something bad happens, save your project.
* **File: Save As** to save the `.psd` file. This is the master file for your project and will preserve all your layers.
* Now is also a good time to make sure you’re staying organized. Double click a layer so you can rename it to things like *stripe background* and *logo*. Layers quickly build up when working on a project so keeping your work labeled and organized into folders will make your life much easier. You might want to also click the lock icon for your background so you don’t accidentally move it.


## White box content area
* Create a new layer
* Choose the **Rounded Rectangle Tool**, and set it to have a 5px radius. In the Control Panel make sure the first box on the left for [Shape Layer](http://www.jasondmoore.com/2011/11/11/photoshop-toolbox-shape-layers-paths-fill-pixels/) is selected.
* Make your foreground color white and draw a box on your document, the width of the logo.
* Go to the **Blending Options** and give the box a 13px stroke with the color of your choice.
* Move the logo slightly behind the box.
* Now go to **Blending Options** and play around with drop shadow to give it depth over the logo. An angle of -90 will make the shadow come right from the top.
* Center the content box

	* Create a new layer and fill it entirely with red then knock the opacity down to 50%. You should see a red tint over your entire canvas.
	
	* Name this layer *center guide*. 
	* Select the layer you wish to center (in this case the content box) and the *center guide* layer you just created then go to **Layer: Align: Horizontal Centers**.
	* When you're done, hit the eyeball next to the *center guide* layer; this will disable it but not delete it in case you need to use it again to align anything.


## Description text

* Pick a simple sans-serif font, example Helvetica Bold 24pt. 
* For copy you want to stick with a simple readable and consistent font; it's okay to get more playful and designed for logos, headers, etc.
* Lay out your text - aim for two equal, centered lines. Play with width, font size, leading or tracking to get it right.

## Input fields

Ultimately, your form elements will be designed via CSS - but because we want to see the whole picture as we build our layout, we'll use some template form elements.

* Download [form-elements.psd](/examples/_photoshop/resources/form-elements.psd)
* Look for the folder *formfields: standard* and drag it over to your document.
* Resize the input box to fit under your copy by going to **Edit: Free Transform**; because it's a shape layer we can resize it without distorting the image. Holding down Shift while you resize will maintain your proportions.
Add a sample value such as `your@email.com`.

## Buttons

We're also going to borrow the button styles found in form-elements.psd, but rather than just take the existing buttons, we're going to use **layer styles** so that we can easily create more buttons of the same style down the road.

* Find the folder *form fields: buttons: click* and select the shape layer in that folder.
* With that layer still selected, turn on the Styles panel then find the little drop down on the top right and choose the option **New Style**.
* Name your new style *Button*
* Repeat the above steps, creating a layer style for the Hover button.
* Now, in your main document, create a white rounded rectangle. Once it's drawn, find the swatch for the Button layer style you just created. When you click it, it will buttonify your rectangle.

## Brushes

* Photoshop Brushes are a great way to add dimension to any project. Download [this ice cream cone set](/examples/_photoshop/resources/ice-cream-brushes.abr) and note where on your computer it's located.
* Select the **Paint Brush Tool**, and in its settings window look for the tiny right arrow.
* After you click the arrow find the option to **Load Brushes** where you can search for the .abr file.
* Pick one of the cones and in your shade of pink draw it below your copy / inputs but above the content box. You can play with the opacity of the layer if it's too dark.

## Map

* Next, add the [map image](/examples/_photoshop/resources/map.jpg) to your document. Make sure it's layer is behind the white content box.
* With the map layer selected, hit Cmd + T to go into **Free Transform Mode**. Rotate and resize the map so it sits under the white content box.

## Animated Gifs

* Copy [this ice cream icon](/examples/_photoshop/resources/ice-cream-icon.jpg) into Photoshop.
* Use the magic wand tool to select all of the white background, then hit delete to get rid of it. It's a nice clean vector-like image, so this should work well. Depending on your tolerance settings, you may or may not have to also select the white space inside the ice cream.
* Cmd + T to Free Transform the ice cream cone down to a smaller size and position it on the map.
* Apply a **Color Overlay Blending Option** to make it some color other than black.
* Repeat the last two steps to add a couple more icons on your map; vary the colors.
* Create a new layer and use the **Custom Shape Tool** to make a **Circle Thin Frame** circle around one of the cones. Make three of these total, each a little larger than the next and each on their own layer.
* Right click your circle layers and click **Create Smart Object**, then right click that layer and select "Edit Contents"

* You should now be in a separate `.psb` file with just the icon; open the **Animation panel** or **Timeline panel** (it's called different things in different versions).
* Make sure the panel you just opened is in frame animation mode:

	* If your panel is called "Animation": click the icon on the bottom right of the panel, choose frame animation.
	* If your panel is called "Timeline": click the down arrow next to "Create Video Timeline" and choose "Create Frame Animation", then click "Create Frame Animation"
	
* Create three frames, so that you have four total.
* Set the first frame to have no rings visible. Set the second to have the first ring visible, set the third to have the first and second ring available, etc. This is what we're aiming for:

<img src='http://making-the-internet.s3.amazonaws.com/photoshop-animation-frames.png'>

* Set each frame to last for **.2 seconds**, and set the animation to **loop forever**.
* Save this `.psb` file then return to your main document. You won't see it animating here, but your animation information is there and will be accessible when we later export it as a gif image.




