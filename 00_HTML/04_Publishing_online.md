## Getting online
To get your work online you're going to need three things to start with:

1. A server/web hosting
2. A domain
3. FTP Software

<small>Looking ahead: FTP is a quick and easy way to get dialed into your first website. As you advance though, you'll want to look into more sophisticated strategies like setting up a local server and using a Version Control system such as Git.
</small>

##  Server / Web Hosting

* Files have to exist on a web-accessible computer (i.e a server / host) in order for the world to access them
* Web hosting is typically paid for monthly increments 
* Pricing ranges from a few bucks a month to hundreds to thousands of dollars for big sites/companies with high demand.

Server options (in order of complexity)

* Shared hosting
* VPS (Virtual Private Server)
* Dedicated hosting
* PaaS / Cloud hosting
* Maintaining your own server

Things to consider when choosing a host

* Space
* Memory
* Bandwidth
* Price
* Operating System / Software 
* Reliability
* Customer Service

Hosting

* One suggestion: [Site Ground](http://www.siteground.com/web-hosting.htm?afcode=bf90ce97069361478ba4f2426b5f9d4d)
* [Social media pulse on web hosting](http://reviewsignal.com/webhosting/compare/)
* Quick and free way to publish some pages online: [NeoCities.org](http://neocities.org)
* What else have you used?

## Domains

* Unique IP (Internet Protocol) Mapping
* Paid for yearly, between $7-15 a year.
* Look for discounts if your purchase more than one year at a time
* Always set to auto-renew
* Domains can be purchased through the same company you get your hosting from, or from a different company.

## Picking a domain
>> &ldquo;I just registered the domain name for my campaign website jackdonagyisrunningformayor2013nythisisthewebsite.com... that's as close as I could get, everything else was already pornography.&rdquo; - Jack Donagy, 30Rock

* If the name you want is available, scoop it up before someone else does
* [Panabee: Domain name finding tool](http://www.panabee.com/)


## Domain extensions
*.com .net .org .biz .wtf am I supposed to choose?*

* 2 to 3 letter extensions &ldquo;top level domains&rdquo; (TLDs)
* Many TLDs started out with specific purposes (.com for commercial businesses, .org for non-profit organizations, etc.), but because they're considered open anyone can sign up for them and you often see them used on subjects they weren't originally intended for
* Other TLDs are restricted like `.gov` and `.edu` 
* Country specific TLDs `.mx` (Mexico), `.ca` (Canada), etc.
* Some contry TLDs have been repurposed, ex `.me` (Montenegro), `.tv` (Tuvalu)
* What are your opinions of extensions like .me, .info, etc?

## Picking a domain name

* If you can get .com, get it. 
* Who owns the domain you want? [Whois](http://who.is/)
* If you can't get .com, who has it? If it's an existing site you might want to reconsider your idea entirely. If it's a parked domain, lookup the whois record to see who owns it and how long they've had it. Realize that even if they're not using the name now, you run the risk they might eventually
* If you're creating a brand/business, consider purchasing the big TLDs (.com, .net, .org) before someone else does
* Is your name available? Get it now!
* A custom domain for your website can also be used for your email address


## FTP (File Transfer Protocol)
* Software to talk to your server; push and pull files
* FTP can be a standalone piece of software or it might already be built into your code editor

Free, stand-alone example: [CyberDuck (Mac or PC)](http://cyberduck.io/)

To connect to a server you need three pieces of information:

1. Your host name (often your domain name, but not always)
2. Your server username
3. Your server password

This information is typically provided for you after signing up with a hosting company, either in a welcome email or via your account page.

Note that your server username and password is typically not the same username and password you use to log into your hosting account page.

<img src='http://making-the-internet.s3.amazonaws.com/html-cyberduck-open-connection.png'>

Once you FTP into your server, look for a folder called `public_html` or `www`; this is where you should put all your files. 

If you don't see public_html or www, chances are you're already in the public folder on your website, so put your files there.

<img src='http://making-the-internet.s3.amazonaws.com/html-public-html.png'>