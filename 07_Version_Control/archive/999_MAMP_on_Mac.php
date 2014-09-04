## MAMP Setup on Mac

Download and install MAMP: <https://www.mamp.info/en/>.

<small>Note: The download includes both free *MAMP* and *MAMP Pro* (paid version). You'll only need to use the free MAMP version in this class.</small>

Create a new directory in your `Documents` folder called `Sites`:
<img src='http://making-the-internet.s3.amazonaws.com/vc-sites-in-documents@2x.png' class='' style='max-width:px; width:100%' alt=''>

In MAMP preferences, set your *document root* aka *root* to this new directory:

<img src='http://making-the-internet.s3.amazonaws.com/vc-set-root-in-mamp@2x.png' style='width:100%; max-width:540px'>

Also in preferences, under *Ports* click *Set Apache & MySQL* ports to `80` & `3306`:

<img src='http://making-the-internet.s3.amazonaws.com/vc-mamp-ports@2x.png' style='width:100%; max-width:540px'>

Next, create a new file in your code editor and save it as `helloworld.php` in your `Sites` directory.

Paste in [this code](https://gist.github.com/susanBuck/3f133c6d64be0f6f27a9) to your `helloworld.php` file.

Load your `helloworld.php` file in your browser ala `http://localhost/helloworld.php`.

<img src='http://making-the-internet.s3.amazonaws.com/vc-hello-world-done-on-mac@2x.png' class='' style='max-width:746px; width:100%' alt=''>

A note on ports: the default Apache port is 80, so setting it to 80 above makes it so you can access your local sites via the url `http://localhost`. If your Apache port is something else, for example, 8888, you'd have to access your sites via `http://localhost:8888`.