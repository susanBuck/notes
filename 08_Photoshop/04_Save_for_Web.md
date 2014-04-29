## Strategy
With the design complete, it's time to think about translating this design to a website. The strategy will be to think about what parts of our design needs to be separate pieces; we certainly don't want to export this as one monolithic file and drop it on the web page.

We'll want to save things like the striped background and logo separately so they can be used in other parts of the site.

We've got to save the ice cream radar all by itself since it needs to be a gif file with animation capabilities.  

We don't want to export our form elements, since those are better off executed in CSS (we just put them in the design for planning purposes).

We may decide that other graphics might be better off done in CSS as well, such as the white content box. We can achieve that thick border, rounded edge and drop shadow all with CSS...and if we do it there we'll have more flexibility with its size.

## Image types
As we piece apart our design, we're going to have options as to what kind of image file formats we can use.

### .JPG
* Photographs
* 16.7 Million Colors
* Lossy compression
* Has Exif data (Exchangeable image file format)

### .GIF
* Graphics (logos, line drawing, icons, animations)
* 256 colors
* Small file size
* Non-lossy compression
* Supports animation
* Transparency (pixel is either on or off, no opacity)

### .PNG
* Transparency (has an alpha layer to indicate pixel transparency)
* Greater color depth than .gif
* Requires a code work around for older versions of IE (or it looks like this)
* Specific to the web (no cymk colors)



## Piece apart for the web

* Create a folder to save all your images in.
* Here's the procedure we'll use to save each individual item:

	* Isolate the logo by turning off other layers
	* Edit: Copy Merged
	* File: New (It should initiate a file the same size as what you just copied)
Paste
	* Go to ➚ File: Save for Web and save this file as a .png (so it has transparency)

## Rebuild with HTML/CSS
View source: [ice-cream-finder.html](/examples/_photoshop/ice-cream-finder.html)


## Color Shifting
Photoshop's default working space is Adobe RGB which is great for photos but bad for the web.

Using sRGB working space is the best solution for ensuring consistency in PS and exported images.

1. View: Proof Setup: Monitor RGB
2. View: [checked] Proof Colors
3. Edit: Color Settings set RGB to sRGB IEC…

When Saving for Web make sure Embed Color Profile is off. Convert to sRGB doesn't matter