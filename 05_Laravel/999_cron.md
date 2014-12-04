## Reference

<https://www.digitalocean.com/community/tutorials/how-to-use-cron-to-automate-tasks-on-a-vps>




## Background

Cron is a program on Linux that lets you schedule tasks. Cron is useful for when you have some action that needs to be done automatically, without being prompted by a user.

Example cron tasks:

* Regular backups
* Clearing log files
* Sending newsletters or digests




## Example job

To demonstrate cron, we'll work with a simple route that does one thing: writes a line to the Laravel log file:

```php
Route::get('/ping', function() {

	Log::info('Pinged log file');

	return 'Pinged log file';

});
```

Before scheduling the cron job, you first want to manually test the job&mdash; visit `http://localhost/ping` and then check `/app/storage/logs/laravel.log` to make sure you see the ping message:

```
[2014-12-04 06:11:00] local.INFO: Pinged log file [] []
```

Once this is working, deploy your changes to your production server, since that's where you'll set up the cron job.

Just to be sure everything is in working order, test the ping route on your production server once it's deployed. In our setup, we ran the test by hitting `http://dwa15-practice.biz/ping`.




## Set up the cron job

Cron works off of a text file called `crontab` that holds a schedule of jobs that need to be run.

While SSH'd into your production server, you can view your schedule of cron jobs with this command:

```bash
crontab -l
```

If you don't have any jobs set up yet you may see a message saying `no crontab for username`

To edit your crontab, run this command:

```bash
crontab -e
```

The first time you run this command, it will ask you what editor you wish to use to use. Choose your preferred editor from the options. If you don't have a preferred editor, `nano` is suggested ([instructions for working with nano can be found here.](https://github.com/susanBuck/notes/blob/master/07_SysAdmin/999_Editing_text_files_in_CL.md))

Once you're in edit mode you can add jobs. 

Every job is represented by one line in your crontab, for example:

```bash
* * * * * curl http://foobooks.dwa15-practice.biz/ping
```

The first segment of this line (`* * * * *`) represents the frequency with which this job should run. Each position represents the minute, hour, days of the month, months, and days of the week the job should run. 

Given that, when you see `* * * * *` it means run every minute, on every hour, on every day of the month, on every month, and every day of the week. 

In short: run every minute.

The second segment (`curl http://foobooks.dwa15-practice.biz/ping`) is the actual command to run. In this case we're using [cURL](http://php.net/manual/en/intro.curl.php) to hit the hit the URL `http://foobooks.dwa15-practice.biz/ping`.

When we saved the above crontab and watched the `laravel.log` file the results were this:

```
[2014-12-04 06:19:01] production.INFO: Pinged log file [] []
[2014-12-04 06:20:03] production.INFO: Pinged log file [] []
[2014-12-04 06:21:01] production.INFO: Pinged log file [] []
[2014-12-04 06:22:01] production.INFO: Pinged log file [] []
```

Every minute, the ping was being hit.


## Configuring your frequency

It can be useful to set up a cron job to run every minute when testing, but most jobs will run more infrequently.

For example, if you wanted to run a job every hour, your command would look like this:

```
0 * * * * curl http://foobooks.dwa15-practice.biz/ping
```

This says it should run at 0 minutes (i.e on the hour), every hour, every day, etc.

If you wanted to run a job one time each day, for example - every day at 6am, your command would like this:

```
0 6 * * * curl http://foobooks.dwa15-practice.biz/ping
```

To make writing your frequencies easier, check out this [visual crontab utility](http://corntab.com/pages/crontab-gui).

