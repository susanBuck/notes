These docs are verbose, with a lot of explanation along the way of the hows and whys of the framework. Once you've been through the notes, however, you'll want a quick reference you can jump to for common tasks, without having to dig through all the details.

The purpose of this cheat sheet is to provide that quick reference. It will be built upon each week as we cover new ground.

## Install the framework and spawn your first app

1) Clone a copy of the framework core into your root:

	git clone git://github.com/susanBuck/core
	
2) Duplicate `/core/samples/sample-app.com` and `core/samples/environment.php` into your root.

3) Rename this new `sample-app.com` to whatever your new app name is.

4) Point your document root to this new app.

## Spawn a new app (assuming the framework already installed)

1) Duplicate `/core/samples/sample-app.com` and `core/samples/environment.php` into your root.

2) Rename this new `sample-app.com` to whatever your new app name is.

3)Point your document root to this new app.

## OOP

Call static classes using the double colon operator:

Example 1:

	Time::now();

Example 2, with paramaters:	

	DB::instance(DB_NAME)->insert('users', $data);
	



## Controllers
* Stored in `/app/controllers`/
* Prefixed with `c_`, ex: `c_users.php`
* Most will extend the base controller (`/app/controllers/c_base.php`)


## Views

* Stored in `/app/views/`
* Prefixed with `v_`, ex: `v_users_profile.php`

Call a view from a controller:

	# Set up View	
    $this->template->content = View::instance('v_users_profile');
    $this->template->title   = "Profile";
    
    # Pass data to the view
    $this->template->content->user_name = $user_name;

    # Render View
    echo $this-template;
    



