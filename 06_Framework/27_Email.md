## Email: Configuration

Applications often need to send emails&mdash; whether it be a confirmation email to a newly signed up user, a password reset or some other feature relevant to your system.

You'll also use emails as an administrator / developer by having your application send you bug reports, logs results from scheduled scripts, etc.

Before taking advantage of the Email library in this framework, you first need to set some configurations.

First off, in your application's config file (`/yourapp.com/config/config.php`) locate `APP_NAME` and `APP_EMAIL`:

	define('APP_NAME', 'My App');
	define('APP_EMAIL', 'webmaster@myapp.com');

These two constnats set the *From name* and *From email address* used for any outgoing emails from your application.

This next constant, `SYSTEM_EMAIL`, is used as a catch-all for general emails from the server to the app administrator (you):

	define('SYSTEM_EMAIL', 'webmaster@myapp.com');
	
This email can be the same as the `APP_EMAIL`, your own personal email, or any other email you want. If you're working with other developers, it might make sense that the app has a dedicated account which multiple developers have access to.

Examples of where `SYSTEM_EMAIL` is used:

* When there is a database related error on the live server: rather than display the error for users to see, the error is emailed to you. 
* If `ENABLE_OUTGOING_EMAIL` (`environment.php`) is false, any outgoing emails will be diverted to `SYSTEM_EMAIL`. Usually you set `ENABLE_OUTGOING_EMAIL` to false on your local server to prevent accidentally spamming real users when testing.



### SMTP (Simple Mail Transfer Protocol)
The next configuration step relates to *how* email is sent from your server, which will be done via [SMTP](http://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol), a standard protocol for sending emails. Continuing in your app's configuration file, you should see three constants relating to SMTP, commented out by default:

	//define('SMTP_HOST', '');
	//define('SMTP_USERNAME', '');
	//define('SMTP_PASSWORD', '');

If you leave these settings commented out, email will be sent via your server's default SMTP configuration. 

Alternatively, you can use an external SMTP server such as Gmail, <a target="_blank" href='http://sendgrid.com'>SendGrid.com</a>, or Amazon SES.

So which one do you use?

When starting out, you can try using your server's SMTP for general building and testing. You may run into problems though&mdash; for example, mail sending on MAMP is notoriously fickle, and sometimes you'll experience delays in email delivery on shared servers. To get around this, you'll want to explore one of the following external SMTP servers.

WAMP users, if you decide to go the SMTP route, make sure `PHP-OPENSSL` is enabled under your PHP modules.

### Option 1) Gmail SMTP
You can send email from your app via <a target="_blank" href='https://support.google.com/mail/bin/answer.py?hl=en&answer=13287'>Gmail's SMTP server</a>:

	define('SMTP_HOST', 'smtp.gmail.com');
	define('SMTP_USERNAME', 'youraccount@gmail.com');
	define('SMTP_PASSWORD', 'topsecret');

Gmail is good for testing, but is slow to send so it isn't suggested for production use.

Keep in mind, if you're working with a public Github Repository, you don't want to reveal your Gmail password to the world!

To prevent this move the SMTP constants to your `environment.php` file which is *not* version controlled.

And for extra security, turn on Gmail's 2-step authentication so that you can create an app specific password that would be separate from your regular Gmail password.



### Option 2) SendGrid SMTP
Another option is a dedicated email delivery service such as <a target="_blank" href='http://sendgrid.com'>SendGrid.com</a>. This is suggested when you get your application gets to the point of having real users. 

Services such as SendGrid take care of the nitty gritty details of email deliverability, such as making sure your sending IPs stay on the whitelists of email providers.

You can sign up at SendGrid for a free account that gives you 200 emails a day, which should be plenty for general testing. Beyond that, their plans start at 10 cents per 1k emails. 

After you sign-up, SendGrid will provide you with the SMTP settings you'll need to plug in to your configuration file.

The caveat with SendGrid is they have an approval process before they start letting you send mail; they may contact you and ask questions about the kind of mail you intend to send. It's a necessary inconvenience for a site with real users, but for testing purposes one of the latter two SMTP options will get you rolling quicker.

### Option 3) Amazon SES
<http://aws.amazon.com/ses/>
*Instructions Pending.*

### Email: Usage
PHP has basic mail capabilities via the built in <a target='_blank' href='http://php.net/manual/en/function.mail.php'>mail()</a> function, but this framework includes a Email library that adds more functionality and flexibility to your email sending.

The Email library (`/core/libraries/Email.php`) uses PHPMailer (<a href='http://code.google.com/a/apache-extras.org/p/phpmailer/wiki/ExamplesPage'>documentation</a>).

When using the Email class you need to set the following parameters:

	$to      (multi-dimension array of name / email pairs)
	$from    (single-dimension array of name / email pair)
	$subject (string)
	$body    (string)
	$html    (boolean)
	$cc      (multi-dimension array of name / email pairs)
	$bcc     (multi-dimension array of name / email pairs)</cm>

Here's an example:
	
	# Build a multi-dimension array of recipients of this email
	$to[] = Array("name" => "Judy Grimes", "email" => "judy@gmail.com");
	
	# Build a single-dimension array of who this email is coming from
	# note it's using the constants we set in the configuration above)
	$from = Array("name" => APP_NAME, "email" => APP_EMAIL);
	
	# Subject
	$subject = "Welcome to JavaBeans";
	
	# You can set the body as just a string of text
	$body = "Hi Judy, this is just a message to confirm your registration at JavaBeans.com";
	
	# OR, if your email is complex and involves HTML/CSS, you can build the body via a View just like we do in our controllers
	# $body = View::instance('e_users_welcome');
	
	# Build multi-dimension arrays of name / email pairs for cc / bcc if you want to 
	$cc  = "";
	$bcc = "";
	
	# With everything set, send the email
	$email = Email::send($to, $from, $subject, $body, true, $cc, $bcc);


For more details, explore `/core/libraries/Email.php`

