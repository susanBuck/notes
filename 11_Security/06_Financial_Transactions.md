Collecting money from your users has some obvious benefits, but some high risks as you're asking users to input top-security data - credit card information - into your application.

In addition to the security practices already covered, the following tips will help mitigate the risks of collecting money online.


## HTTPS
Always process any credit card / payment transactions via https with a SSL certificate signed by a trusted Certificate Authority.

## Leave it to the pros
* Suggested payment API: [Stripe](https://stripe.com)
* Always submit payment info directly to your payment API; don't let sensitive data ever hit your server.
* Don't store credit card information in your database as it's a huge liability; if you need to save information for reacurring charges, use your payment API's secure vault.
* Because payment information is not transacted via your server, you don't have to worry about things like [PCI Compliance](http://en.wikipedia.org/wiki/PCI_compliance), as that will be maintained by your payment API.

 
## Chargebacks
>> Chargeback: a demand by a credit-card provider for a retailer to make good the loss on a fraudulent or disputed transaction. -[Wikipedia](http://en.wikipedia.org/wiki/Chargeback)

Unless you can sucessfully contest a chargeback (time consuming and difficult to do), money will be refunded to the victim in addition to a chargeback fee (usually $15-$20).

Given this, it's up to your site to try and prevent chargebacks. 

Tips:

* Practice "charge on ship" for physical goods
* Prevent mistaken chargebacks by having something like `company.com/charge` show up on CC statements. Example: <http://www.stayclassy.org/charge>
* Up your validation by making sure cvc checks, address checks and zip checks are enabled.
* Note patterns of fraudulent orders, and implement checks to hold such orders so they can be manually reviewed. Example checks from an e-commerce site:
```
Domestic order > 500
International orders > 250
Billing is domestic but shopping is international and total > 50
2 failed credit card attempts AND billing / shipping are not the same
4+ failed failed credit card attempts
Billing address is domestic but geolocation of user was international
User was on a block list based on email, address, or specific country
```


## Reference
* [Stripe Security and Fraud Prevention](https://support.stripe.com/topics/security-and-fraud-prevention)
* [Paypal Payment Integration](https://www.paypal.com/cgi-bin/webscr?cmd=xpt/bizui/IntegrationHub-outside)

