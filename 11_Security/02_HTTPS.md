HTTP stands for *Hypertext Transfer Protocol* and almost everything you see in your browser is transmitted via this protocol - HTML content, scripts, images, etc.

Data passed via HTTP is not encrypted which allows for the possibility of [man-in-the-middle attacks](http://en.wikipedia.org/wiki/Man-in-the-middle_attack) in which someone could intercept your HTTP request, read the data you're sending, and also respond with a forged response.

Examples:

* [Upside down internet](http://www.ex-parrot.com/pete/upside-down-ternet.html)
* [FireSheep](http://codebutler.github.io/firesheep/)

The fix for this vulnerability is to use the HTTPS protocol (HTTP Secure via Secure Sockeys Layers) which encrypts the data that is transferred between the user's browser and the server. This way, even if data is intercepted, it is not readable.

In addition to encrypting your data, HTTPS using a SSL certificate will also verify your website's identity, providing assurance for users.

## What HTTPS looks like to the user


When a browser connects to a secure site it retrieves the site's SSL certificate and checks for the following things

1. The certificate has not expired
2. The certificate has been issued by a Certificate Authority the browser trusts
3. The certificate is being used by the website for which it was issued


If it fails on any one of these checks the browser will display a warning to the end user. 

If it passes, a padlock will be displayed in the URL bar next to the URL:

<img src='http://making-the-internet.s3.amazonaws.com/security-ssl-lock.png'>

SSL certificates with EV (Extended Validation) will provide additional verification such as a green bar in the URL bar with the name of the company:

<img src='http://making-the-internet.s3.amazonaws.com/security-ssl-lock-ev.png'>

If there's a problem, you'll see a broken lock and a notice from the browser:

<img src='http://making-the-internet.s3.amazonaws.com/security-bad-ssl.png'>
 


## When to use HTTPS

* Commonly used on pages transfering important / vulnerable information: login credentials, credit card information, etc.
* Examples of sites sites force HTTPS on all pages: Google, Facebook, Twitter, Linkedin, Most bank sites.
* Examples of sites that enforce HTTPS for general browsing: Amazon, Quora, YouTube, Yahoo, Ebay.

## Why not use HTTPS for everything?
* HTTPs used to be considered slower, [but that's not necessarily true anymore](https://www.imperialviolet.org/2010/06/25/overclocking-ssl.html).
* Every asset needs to be transferred via HTTPS, so any legacy sites with hard coded URLs might require work in order to implement HTTPS (this is not an excuse for bypassing HTTPs when transfering vulnerable information).
* You may need to serve data from a resource that does not support https; for example, this [used to be a problem with Google AdSense](http://adsense.blogspot.jp/2013/09/use-adsense-on-your-https-sites13.html).


## SSL Certificates

* When using HTTPS, a SSL Certificate is required on your server 
* SSL certificates are issued by [Certificate Authorities (CAs)](http://en.wikipedia.org/wiki/Certificate_authority) which are trusted third parties recognized by browser manufacturers. 
* The largest CA is Symantec (aka VeriSign, Thawte, Geotrust) with a 42.9% market share followed by Comodo with a 26% market share, and GoDaddy with at 14% market share.
* Purchase either directly from these companies or a reseller.

### An SSL certificate contains the following information:

1. The certificate holder's name
2. The certificate's serial number and expiration date
3. A copy of the certificate holder's public key
4. The digital signature of the certificate-issuing authority


### Factors for choosing a SSL certificate:

* Price
* Waranty - the amount payable to your site visitors if they incur loss from an online transaction as a result of a mis-issued certificate
* What it validates (domain ownership or company + domain ownership)
* How many domains it supports
* EV - Extra validation - green bar assurnace
* How long it will take for the SSL certificate to be issued

### Where to get your SSL Certificate:

* From your web host if they sell them (benefit: they'll often install it for you)
* Directly from one of CAs mentioned above
* Free: [StartSSL](http://www.startssl.com/) - Works on one domain only (no subdomains)

### Self-signed certificates:

* Provides for encryption but not identity validation
* Good for internal projects


## How to set up a SSL certificate

There are three different ways you can go about setting up a SSL certificate

1. Purchase your SSL certificate from your web host and request they install it for you (may be required on shared servers that won't give you access to the tools you need to do the install yourself.
2. Setup via cPanel (suggested for shared servers)
3. Setup via Command Line (suggested for servers in which you have root access)





The following steps outline how a certificate is setup manually, via command line, but each step can be executed via the cPanel SSL manager:

<img src='http://making-the-internet.s3.amazonaws.com/security-cpanel-ssl.png'>


There are three parts to setting up a SSL certificate on your server:

1. The private key which exists on your server
2. The Certificate Signing Request (CSR)
3. The actual SSL Sertificate


### Step 1. Generate private key on your server

SSH into your server and run the following command: 

	openssl genrsa -out companyname.key 2048

You can name the key something other than `companyname.key` - common names might be your company name or domain name.

This command will generate a private key file on your server that is used for decryption.

Breakdown of the above command:


* `openssl` Utility for managing SSL
* `genrsa` Key type option. Options are DSA or RSA; RSA keys can be used for both digital signatures and encryption, wheras DSA can not be used for encryption.
* `-out companyname.key` Specifies the filename the key should be output to
* `2048` Size of key in bits. Bigger = more secure but slower; 2048 is common- Check with your certificate authority for special requirements.

Once you've entered the above, you can open the resulting .key file to view the contents of your private key, which will look something like this:

	-----BEGIN RSA PRIVATE KEY-----
	[long strings of encoded data]
	-----END RSA PRIVATE KEY-----
	
There's nothing more you need to do with this file; it just needs to exist on your server.


### Step 2. Generate the public CSR (Certificate Signing Request)

A CSR is a file that, once signed by a CA, will become your certificate. You'll generate this file and pass it to your CA.

This command will generate your CSR using the private key generated in the previous step:

	openssl req -new -key companyname.key -out companyname.csr 

Command breakdown:

* `openssl` Utility for managing SSL
* `req` OpenSSL Command that creates and processes certificate requests
* `-new` You're generating a new CSR
* `-key companyname.key` Specify location of key file you generated in Step 1
* `-out companyname.csr` Name and desination of the resulting csr file this command will generate

This command will prompt several questions...

**Country Name**
Use the two-letter code without punctuation for country, for example: US or CA.
 
**State or Province**
Spell out the state completely; do not abbreviate the state or province name, for example: California
 
**Locality or City**
The Locality field is the city or town name, for example: Berkeley. Do not abbreviate. For example: Saint Louis, not St. Louis
 
**Company**
If the company or department has an &, @, or any other symbol using the shift key in its name, the symbol must be spelled out or omitted, in order to enroll. Example: XY & Z Corporation would be XYZ Corporation or XY and Z Corporation.
 
**Organizational Unit**
This field is optional; but can be used to help identify certificates registered to an organization. The Organizational Unit (OU) field is the name of the department or organization unit making the request. To skip the OU field, press Enter on the keyboard.
 
**Common Name**
The Common Name is the Host + Domain Name. It looks like `company.com`.
 
Most certificates can only be used on servers using the Common Name specified during enrollment. For example, a certificate for the domain `company.com` will receive a warning if accessing a site named `www.company.com` or `secure.company.com`, because `www.company.com` and `secure.company.com` are different from `company.com`.

Do not enter an email address, challenge password or an optional company name when generating the CSR.

Once you've entered the above, you can open the resulting .csr file to view the contents of your CSR.

Example:

	-----BEGIN CERTIFICATE REQUEST-----
	[long strings of encoded data]
	-----END CERTIFICATE REQUEST-----



This information is what you'll need to you give to your CA (certificate authority). Some CA's will have you upload the .csr file itself, others will have you paste the contents into a form. When copying and pasting the CSR be sure you don't have any additional whitespace after the `-----END CERTIFICATE REQUEST-----` line.

Once your CA has approved your certificate, they'll sign the CSR and give you your new SSL Certificate which, like the private key and CSR, is a text file with encrypted data.

Example:
	
	-----BEGIN CERTIFICATE-----
	
	[long strings of encoded data]
	
	-----END CERTIFICATE-----
	
Save this file as `companyname.crt` and save it in the same location you created your .key and .csr files in the above steps.

### Step 3. Installing the certificate

In addition to your customized SSL certificate, you'll also need to download a root certificate/intermedia certificate which tells the browser what CA you're using. 

Copy both your custom SSL certificate and the root certificate to your live server, in the same location you generated your private key and CSR.

The final step is telling apache where your certificates are located; this is done via the `httpd.conf` or `ssl.conf` file (dpending on how Apache is configured).

Within either `httpd.conf` or `ssl.conf` locate the following directives and set the values to the absolute path and filename of the approriate file:

	SSLCertificateFile /path/to/companyname.crt
	SSLCertificateKeyFile /path/to/companyname.key
	SSLCertificateChainFile /path/to/CA.crt

SSLCertificateFile should be your customized SSL certificate file (eg. `companyname.crt`).
SSLCertificateKeyFile should be the key file generated when you created the CSR.
SSLCertificateChainFile should be the CA intermediate certificate file

Once the above changes have been save, you will need to restart Apache before testing your new SSL certificate.

Test your new SSL certificate by browsing your site via HTTPS and using a [SSL Checker](http://www.sslshopper.com/ssl-checker.html).


### Signing your own certificate


If you want to create a certificate of your own without having to involve a CA, you can perform both steps by yourself. This means that the user's browser will present them with a huge *&ldquo;This certificate is self-signed! warning&rdquo;*, but if this doesn't concern you, then it doesn't matter. 

Self-signed certificates can be a cheap alternative to CA signed certificates when you're testing things out and experimenting, or if you're the only person that needs a secure connection to your host. They can also be good for allowing regular users to use secured connections if they know they can trust you and you warn them about the certificate warnings in advance.

Here, the process of creating the CSR and having it signed are merged into one so you don't create the CSR file. Instead, you just generate the certificate file directly. The following is a command to generate a self-signed certificate:
 
	openssl req -new -x509 -key keyfilename.pem -out certfilename.pem -days 365
 
 
As you can see, it's similair to the other command for creating a CSR that you would have signed by a CA, but it has two more options than the previous one. The first of the extra options is the -x509 option. This is the option that tells OpenSSL to output a self-signed certificate instead of a CSR. If you're using a control panel to create a self-signed certificate be sure to look for, and use, an x509 option. The second of the extra options is the -days option. This option simply specifies how long (in days) the certificate is valid. Once the number of days has passed, you should generate a new certificate file and dispose of the old one.





## Using HTTPS
With your SSL certificate installed and https activated, you can now start directing traffic to your site via HTTPS, where you choose to use HTTPS.

This can be done on a page by page basis, or site wide.

1. Page by page: Link to https
Example:

```
<a href='https://domain.com/checkout'>Checkout</a>
```

2. Page by page: Force redirect to https via PHP

Example function:

	function force_https($to_https = true) {
		
		$url = $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
	
        if ($to_https) {
            # Force https if not already
            if (! isset($_SERVER["HTTPS"])) {            	
                Router::redirect("https://".$url);
            } 
        }
        else {
            # Force http if not already
            if (isset($_SERVER["HTTPS"])) {
                Router::redirect("http://".$url);
            } 
        }
	 
	}

3. Site wide: Force redirect to https via .htaccess:

```
RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

4. Site wide: Use HSTS (HTTP Strict Transport Security)

In httpd.conf:

	<VirtualHost *:80>
	    ServerName domain.com
	    RedirectMatch 301 /(.*) https://domain.com/$1
	</VirtualHost>

Ref: [Protecting your users from phishing with Apache rules and HSTS](http://mikkel.hoegh.org/blog/2010/09/09/protecting-your-users-phishing-apache-rules-hsts/)

## Serving assets via HTTPS
Keep in mind that any page that is accessed via https needs to make sure all assets are served via https - this includes images, external stylesheets and external scripts.

For this reason, it's highly suggested you never hardcode your domain when linking an asset as it will not have the flexibility to switch between http and https.

Example: The following image is hard coded to be served over http and would invalidate the secure connection when https was used:

	<img src='http://domain.com/images/logo.jpg'>
	
The preferred path would look like this:

	<img src='/images/logo.jpg'>
	
This can also be accomplished with external CDNs by omitting the http/https altogether:

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	
(Note, this will only work when running your work on a server; it will not work when testing work locally on your computer)
	


