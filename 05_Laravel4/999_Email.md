## Reference

<http://laravel.com/docs/4.2/mail>


## Background

Just like Laravel supports different database drivers, it also supports different mail drivers.


`/app/config/mail.php`:

```php
/*
|--------------------------------------------------------------------------
| Mail Driver
|--------------------------------------------------------------------------
|
| Laravel supports both SMTP and PHP's "mail" function as drivers for the
| sending of e-mail. You may specify which one you're using throughout
| your application here. By default, Laravel is setup for SMTP mail.
|
| Supported: "smtp", "mail", "sendmail", "mailgun", "mandrill", "log"
|
*/

'driver' => 'smtp',
```

In these notes, we'll look at using the `SMTP` driver, powered by the transactional email service, [Mailgun](https://mailgun.com). 




## Set up Mailgun

Create a free account at [Mailgun](http://mailgun.com).

When first getting set up you can use Mailgun's sandbox (i.e. testing) domain.

From your Mailgun control panel (<https://mailgun.com/cp>) locate the **sandbox subdomain** and note the __Default SMTP Login__ (Username) and __Default Password__.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-mailgun-credentials@2x.png' class='' style='max-width:1184px; width:100%' alt=''>

This sandbox account is only for testing, so there's a 300 email limit a day. When you're ready to go live with your application, you'd want to authorize your own domain to send emails. 




## Configure your app's mail settings

Open `/app/config/mail.php`. Remember, config cascades in Laravel, so the changes you make in this file will be your default mail settings. If you want to use different mail settings in different environments, you'll need to set up `mail.php` files in the appropriate config subdirectory. For example, configs in `/app/config/production/mail.php` would apply to your app running in the `production` environment.

By default, in `mail.php`, the `host` is set to `smtp.mailgun.org` so you don't have to change anything there.

You do want to change the default from address and name for all emails sent from your application:

```php
'from' => array('address' => 'mail@foobooks.com', 'name' => 'Foobooks'),
```

And finally, fill in the `username` and `password` you collected from Mailgun.

Example:

```php
'username' => 'postmaster@sandbox238492038490238409.mailgun.org',
'password' => 'ajdfksajdklasfjksadjfklsd',
````




## Use

Sending an email involves, at minimum, the following pieces:

+ A View that will be used to build the content of the email.
+ An array of data you can use in that view.
+ Details like recipient name and email, as well as sender name and email.

Sending mail is done with Laravel's Mail class. 

Here's an example of a function that could send an email to new users after they sign up for your application:


```php
public function sendWelcomeEmail($user) {

	# Create an array of data, which will be passed/available in the view
	$data = array('user' => $user);

	Mail::send('emails.welcome', $data, function($message) {

		$recipient_email = $user->email;
		$recipient_name  = $user->first_name.' '.$user->last_name;
		$subject  = 'Welcome '.$user->first_name.'!';

		$message->to($recipient_email, $recipient_name)->subject($subject);

	});

}
```

The View that the above code uses lives at `/views/email/welcome.blade.php` and looks like this:

```php
<h1>
	Welcome {{{ $user['first_name'] }}}!
</h1>

<p>
	This message is to confirm that you have signed up 
	at Foobooks with the email {{{ $user['email'] }}}.
</p>

<p>
	- Team Foobooks
</p>
```


## Mail and your local/testing environments

Suggestion: set your mail driver to `log` on your local/testing environments. 


```php
/*
|--------------------------------------------------------------------------
| Mail Driver
|--------------------------------------------------------------------------
|
| Laravel supports both SMTP and PHP's "mail" function as drivers for the
| sending of e-mail. You may specify which one you're using throughout
| your application here. By default, Laravel is setup for SMTP mail.
|
| Supported: "smtp", "mail", "sendmail", "mailgun", "mandrill", "log"
|
*/

'driver' => 'log',
```

This will pipe out all outgoing emails from your app to `/app/storage/logs/laravel.log` instead of actually sending the emails. Prevents you from accidentally spamming users in your database!

Example output of email piped to `laravel.log`:

```
[2014-12-04 04:47:26] local.DEBUG: Message-ID: <4abaf295fb69ee27111a727ffa4b3b13@localhost>
Date: Thu, 04 Dec 2014 04:47:26 +0000
Subject: Welcome Sam!
From: Foobooks <welcome@foobooks.com>
To: Sam Seaborn <mail95@susanbuck.net>
MIME-Version: 1.0
Content-Type: text/html; charset=utf-8
Content-Transfer-Encoding: quoted-printable

<h1>Welcome Sam!</h1>

<p>
This message is to confirm that you've signed up at Foobooks with the email mail95@susanbuck.net.
</p>

<p>
- Team Foobooks
</p>
```

