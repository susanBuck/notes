Reference: <http://codex.wordpress.org/Child_Themes>

## How to create a child theme

Log into your server so you can access your files. (You can do this via FTP, or via the File Manager in cPanel as I showed in class.)

Navigate to `/wp-content/themes`

Create a new folder to hold your child theme. 
The folder name should match the parent theme’s name appended with `-child`. 

For example, when we wanted to make a child theme of `mog` our new folder was `mog-child`

Inside of this new folder (`mog-child`) create a new file `style.css` with this code:

~~~
/*
Theme Name: Mog Child
Theme URI: 
Template: mog
Author: 
Author URI: 
Description: 
Version: 1.1.1426554048
Updated: 2015-03-17 01:00:48
*/

@charset "UTF-8";

/* All your new styles will go below this line */

/* For demo purposes, lets make the background color red so we can be sure the child theme is overwriting the parent
body {
    background-color:red
}
~~~

It’s important that the `template` setting in the above code matches the parent theme's name (in our case, `mog`).

Next, create a new file called `functions.php` that has this code:

~~~
<?php
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

// BEGIN ENQUEUE PARENT ACTION
        
if ( !function_exists( 'chld_thm_cfg_parent_css' ) ):
    function chld_thm_cfg_parent_css() {
        wp_enqueue_style( 'chld_thm_cfg_parent', trailingslashit( get_template_directory_uri() ) . 'style.css' ); 
    }
endif;
add_action( 'wp_enqueue_scripts', 'chld_thm_cfg_parent_css' );

// END ENQUEUE PARENT ACTION
~~~

Once both those files are saved, if you go back to your wp-admin dashboard you should see **Mog child** as one of the options in your theme listing and you can **activate it**. 

Now you’re all set! 
Your WP site is now abiding by this child theme, which inherits the styles of the parent theme mog.

At this point you can start customizing. 

If you go to *Appearance :: Editor* you can see your *style.css* for mog-child waiting for your custom CSS. 

## Plugin for creating child themes

If the above steps seem tedious, you can also install the plugin [*Child Theme Configurator*](https://wordpress.org/plugins/child-theme-configurator/) which will generate child themes for you.



