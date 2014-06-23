## Friendly URLs

* As a guiding principle for your URLs, aim to always make your URLs friendly for the user. This practice will also be optimal for search engines.
* It's debatable in the SEO community about how much Google pays attention to keywords in URL's, but it certainly can't hurt. 
* Hyphens are the preferred symbol for separating words in URLs.
* CMS such as WordPress, make friendly URLs easy.
* Custom sites:

Clean folder / file name structure:
<img src='http://codagogy.com/images/tasks/seo-good-vs-bad-directory-structure.png'>

Or rewrite URLs:
[mod_rewrite](http://www.sitepoint.com/guide-url-rewriting/)

Rules placed in `.htaccess` file in root of your site. Example:

	RewriteEngine on
	RewriteRule ^pages/gc.html /gift-certificates
	
	
## Things to avoid

* Images with lots of text
* Flash and .pdf files
* Frames and pop-ups
* Keyword stuffing
 

## Webmaster Tools

<http://google.com/webmasters>
<http://www.bing.com/toolbox/webmaster>

### Add your URL / Verify ownership

Webmaster provides the following methods for authenticating you're the owner of your site:

* Upload a special file.
* Add a special meta tag to the head of your page.
* Add a DNS record in your domain settings.
* Connect via your Google Analytics account.


### Sitemaps
>> "Sitemaps are a way to tell Google about pages on your site we might not otherwise discover. In its simplest terms, a XML Sitemap&mdash; usually called Sitemap, with a capital S&mdash; is a list of the pages on your website. Creating and submitting a Sitemap helps make sure that Google knows about all the pages on your site, including URLs that may not be discoverable by Google's normal crawling process."

[Sitemaps XML format protocol](http://www.sitemaps.org/protocol.php)


### Crawler access / robots.txt
The `robots.txt` file is a file you put in the root of your site; it gives special instructions to crawlers about what they can and can not access.

Without any exclusions, your `robots.txt` would look like this:

	User-agent: *
	Allow: /

If you wanted to exclude a path you would add:

	Disallow: /pathname/



### Sitelinks
[Sitelinks](https://support.google.com/webmasters/bin/answer.py?hl=en&answer=47334) are the extra links that sometimes show below search results; these are picked automatically by Google and while we have no say over what they pick, we do have the option to exclude links by "demoting" them.


### "Your site on the web"
This entire section of GWT has lots of great info and data about your traffic as it relates to SEO.

### Diagnostics: Fetch as Googlebot
Use this tool to see what your site looks like to the crawlers.






## Local Businesses

[Website Optimization Techniques for Local Businesses](http://webdesign.tutsplus.com/articles/seo-for-local-businesses--webdesign-10507)

* Connect your site/business with Google+.
* Make sure your business address is clearly indicated on your site.
* Include microdata tags with your business address.
* Have other sites link to you using location info in the anchor text (Yellow Pages, Yelp, FourSquare for example).








## Google Analytics
Another powerful tool for researching your SEO standing before, during, and after optimization is [Google Analytics](http://google.com/analytics/%20), which tracks all sorts of useful information about your traffic:

* What sites are linking to you?
* Where are your visitors (geographically?)
* What keywords are users searching for that is leading them to you?
* Through what links are users exiting your site?
* So much more...

Install: JavaScript snippet on every page





## Facebook Meta Tags

Social network traffic isn't directly related to search engine rankings, but it's tangentally related.

[Before and after optimization](http://codagogy.com/images/tasks/seo-facebook-optimized-content.png)

Control with meta property tags:

	<meta property="og:title" content="Bella Balloons">
	<meta property="og:description" content="Bella Balloons is family-owned, operating Hot Air Balloon Rides in Dayton, Cincinnati, and Northern Kentucky providing scenic views of Ohio's beautiful landscapes.">
	<meta property="og:type" content="website">
	<meta property="og:url" content="http://flybellaballoons.com">
	<meta property="og:image" content="http://flybellaballoons.com/images/bella-balloons-logo.png">

[Facebook URL debugger](https://developers.facebook.com/tools/debug/)


## WordPress
* Removing www in General settings
* Permalinks: `/%category%/%postname%/`

Yoast:

* [Yoast WordPress SEO plugin](http://yoast.com/wordpress/seo/)
* [Yoast: The Definitive Guide To Higher Rankings For WordPress Sites](http://yoast.com/articles/wordpress-seo/)
* Title and meta tag control
* Setting and live preview
* Sitemaps
* Social: Make sure add OG setting is checked


## Content!

>> Make pages primarily for users, not for search engines. 
- [Google Webmaster Guidelines](https://support.google.com/webmasters/answer/35769?hl=en)

**The most important part of getting search engine traffic to your site: your content.**

Analyzing your site and content:

* Do you like it? 
* Is it professional?
* Is it usable?
* Is it informative?
* How does it compare to your competitors? Would you choose yourself over them?

These are the points you need to cover before you even start sweating about SEO. It doesn't matter how good your SEO is; if the content isn't good, the purpose of your site (whatever it may be) won't be fulfilled.

### Add to the landscape
In order to grow your garden of content, think about how you can cultivate your online presence. Are you blogging? Using Facebook? Twitter? These are environments that allow you plenty of opportunity to leave a virtual footprint. The bigger the footprint, the higher you'll rank.

All of this feeds into a core aspect of search engine algorithms, which is backlinks.

### Backlinks 
Backlinks are any links back to your site from another site (and to a lesser extent links from your site to other pages in your site)

There are two main types of backlinks:

1. **Reciprocal:** when two sites link to each other (less valuable - could be just part of a deal)
2. **One-way:** when one site links to another site, with no link back (more valuable)

The best types of backlinks are from sites that have related contents. 

Example: A site about birthday cakes will earn a higher reputation with a link from a site about cake decorations than it would from a site about nuclear physics.

Furthermore, a link from a higher reputation (New York Times) site will earn you more "points" than a site with a lower reputation (Shady Pines Times). 

You can start to see how building your content and thus your reputation will lead to more backlinks, which will positively impact your rankings. 

Site optimization is all about providing content for the search engines to index. 

**Build great content and traffic will follow.**


## Link Building

4 Components: **Quantity, quality, diversity, and velocity**

>> Your site's ranking in Google search results is partly based on analysis of those sites that link to you. The quantity, quality, and relevance of links influences your ranking. The sites that link to you can provide context about the subject matter of your site, and can indicate its quality and popularity.
- [Google Link Schemes](http://support.google.com/webmasters/bin/answer.py?hl=en&answer=66356)

**Quantity**

The more links you have the better. But, read on because the following three points temper this.

**Quality**

What is the reputation of the site your links are coming from? Is it just a mass directory (sometimes referred to as "link farms") or a legitimate site? Quality trumps quantity.

**Diversity**

Having 25 links from 1 site is not as good as having 25 links from 25 different sites.

**Velocity**

Building your backlinks is something that should happen naturally over time; if you get a mass amount of links too soon search engines can hold this against you because it's usually a sign of fishy business such as buying links.


## Further Reading
* [(PDF) Google Search Engine Optimization Starter Guide](https://static.googleusercontent.com/external_content/untrusted_dlcp/www.google.com/en/us/webmasters/docs/search-engine-optimization-starter-guide.pdf)
* [Google Webmaster Guidelines](https://support.google.com/webmasters/answer/35769)
* [Hiring a Search Engine Optimizer](https://support.google.com/webmasters/answer/35291)
* [Moz Beginner's Guide to SEO](http://moz.com/beginners-guide-to-seo)