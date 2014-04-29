## (FYI) Bootstrap
If you're curious, here's an outline of the bootstrap process that occurs when apps in the framework are accessed:

1. User visits your app, and the URL is routed via `.htaccess` to `index.php`
2. `index.php` runs
	1. `DOC_ROOT` (where the app lives) and `APP_PATH` (the app itself) are defined
	2. Environment settings are loaded
	3. `core/` location is defined
	4. App level configurations are loaded
	5. `/core/bootstrap.php` is included
		a. Class [autoloading](http://php.net/manual/en/language.oop5.autoload.php) is setup
		b. core level configurations are loaded
	6. Special routing is defined
	7. Router is called to parse the controller and method from the URL
3. Requested controller/method is displayed

<small>Understanding the above isn't necessary to using the framework, it might just help make more sense of the following topics of configs and the cascading file system.</small>

## Configurations
Open `/app/config/config.php` to see several [constants](http://php.net/manual/en/language.constants.php) relevant to your app.

Think of a name for your Micro-blog app and define it for `APP_NAME`: 

	define('APP_NAME', 'Flutter');

We'll be talking about the remaining configs (`APP_EMAIL`, `SYSTEM_EMAIL`, `DB_NAME`, `TIMEZONE`, `PASSWORD_SALT` and `TOKEN_SALT`) in the upcoming sections so you can leave them as is for now.


## (FYI) Feature flags
In your app's config directory you'll also see a file called `feature_flags.php`. Feature flags are a way to easily toggle on and off different features of your site.

Example Scenario: You're running an e-commerce app and several times throughout the year you offer a *Free Shipping* promotion. You could manually edit the appropriate code whenever you needed to toggle this feature, or you could create a feature flag in `feature_flags.php`:

	define('ENABLE_FREE_SHIPPING', FALSE);
	
This flag might then be used in several places throughout your code, everywhere from whether *Free Shipping* is displayed on the site in your Views to how shipping is calculated in your Controllers.

Feature flags can also be used to easily toggle on and off external services your site might be tapping into. 

Examples:

	define('ENABLE_PUBNUB', FALSE);
	define('ENABLE_ANALYTICS', TRUE);
	define('ENABLE_GEOLOCATION', TRUE);
	define('ENABLE_OLARK', TRUE);
	
Reference:

* [Asana: Using flags to ease new feature development](http://blog.asana.com/2011/04/using-flags-to-ease-new-feature-development/)
* [Flickr: Flipping out](http://code.flickr.net/2009/12/02/flipping-out)

