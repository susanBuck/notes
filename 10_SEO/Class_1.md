<!--
Infographic: http://www.nerdwallet.com/blog/2014/best-cities-female-entrepreneurs/
-->

## Introduction
SEO is the process you go through to make your site show up higher in search engine results so your audience can find you.

[SEO Checklist](http://thewc.co.s3.amazonaws.com/challenges/seo-checklist.pdf)

[75% of users will never get past the first page of results](http://thewc.co/images/tasks/seo-search-results-ranked.png)

Deflating the hype: SEO Does not have to be a huge a undertaking.

## Audience

Who are you targeting?
 
### 1. Existing audience

The people who are looking specifically for you.

Example:
>> I live in Ohio and I want to take a hot air balloon ride. My friend recommended a company, something with the name "Bella" in it, but I don't know the domain. I go to Google and type in "Bella hot air balloon rides" to try and find their site."

Searh phrase: *&ldquo;Bella hot air balloon rides&rdquo;*

### 2. New audience

The people who are searching for something in general related to you and you want them to land on your site.

Example: 
>> I live in Ohio and I want to take my mom on a hot air balloon ride for her birthday. I don't know any specific companies that do this so I just type in "hot air balloon rides Ohio."

Search phrase: *&ldquo;hot air balloon rides Ohio.&rdquo;*



## Search Engines

1. Google
2. Yahoo/Bing
3. Everyone else

Where are the rulebooks?

* [What Google tells us](https://static.googleusercontent.com/external_content/untrusted_dlcp/www.google.com/en/us/webmasters/docs/search-engine-optimization-starter-guide.pdf)
* Guesswork / observation



## How engines work

Crawler-based search engines

To see how Google has indexed your (or any) site, do a google search, prefixing it with `site:` (no space)

Example:

`site:flybellaballoons.com`

[Cached results](http://thewc.co/images/tasks/seo-cache.png)

[Google Infographic: How Search Works](http://www.google.com/insidesearch/howsearchworks/thestory/)


## Getting to the top

* No "get rich quick / shed 50 lbs. in 30 days" solutions to SEO
* Good organization and HTML practices
* Quality content
* Time and patience


## Keywords
* Words and phrases
* Start with a brainstorm
* 1-10 primary target
* 10-20 being your secondary target
* [Bella Balloons Example Keyword Brainstorm](http://codagogy.com/images/tasks/seo-whiteboard.jpg)
* Google Adword's Keywords Planner <https://adwords.google.com>




## HTML Elements

### Title Element

`<title>`

* In head of your HTML document; describes the content of the page
* Google uses the title for context and to label your results

<img src='http://making-the-internet.s3.amazonaws.com/seo-title-tag.png'>

* Use different titles for different pages - don't just repeat across your site

* Be descriptive yet concise; you have about **60-70 characters** to convey your message.

* Incorporate keywords you want people to use to find you.

* Don't waste space: "Official website", "very", "best", "really"

* Whether you include your name / company name depends on your audience target

### Meta Elements

* Also in the head of the your document
* Never displayed on the page
* Different meta tags, including description:

```html
<meta name="description" content="Bella Balloons provides Ohio Hot Air Balloon Rides, Cincinnati Hot Air Balloon Rides, and Dayton Hot Air Balloon Rides.">
```

* Usually the summary listed under your headline in search results
* Have about **130-155 characters** to work with
* Use different descriptions for each page, be descriptive yet concise, incorporate keywords
* Short descriptions can easily get lost, so always aim for two lines of text
* Occasionally search engines will override your description
* Search terms found in your description will be bolded in results
* Keywords meta tag is no longer used


### Headings Elements

* Heading elements (`<h1>`, `<h2>`, etc.) - not just for styling
* Clue to search engine what your site is about
* Like title and meta tags, you want to be sure your headings include relevant keywords where necessary

### Links

<img src='http://making-the-internet.s3.amazonaws.com/seo-good-bad-links.png'>

* Never say "Click here"&mdash; waste of link power 
* Links are how Google bots crawl through your site
* Google pays a lot of attention to anchor text
* [Remove `www` from URLs](https://gist.github.com/susanBuck/9240424)


### Images
* Use alt attributes for all your non-decorative images.
* Use descriptive file names: `logo4.jpg` vs. `bella-balloons-logo.jpg`

