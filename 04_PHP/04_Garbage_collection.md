## Garbage collection

In some programming languages, you have to &ldquo;clean up after yourself&rdquo; (close database connections, free memory assigned to images, etc.) to make sure you're freeing up allocated memory.

The PHP engine, however, automatically cleans up allocated memory after each script is finished.

Despite this, many students coming to PHP with a different programming background often ask a lot of questions about memory management in PHP, so let's take a look at how it works:

PHP uses two techniques to manage memory:

* **Copy on write** to make sure memory isn't wasted when you copy values between variables.

* **Reference counting** to make sure memory is returned to the operating system when it is no longer needed.

### Copy on write ###

When you assign one variable to another, PHP does not get more memory for that copy.

	$votes = 100;
	$current_votes = $votes; 
	
It's only when you *change* the copy that PHP will make a copy and have to allocate more memory.

Waiting to allocate and copy variables saves resources.

### Reference counting

Reference counting is used to determine when the memory of a variable can be released.

For example:

	$votes = 100;
	$current_votes = $votes;

This would result in a reference count of 2, because both `$votes` and `$current` votes are referring to the same value.

If you were to change `$current` votes (i.e. copy on write), the reference count would drop back down to 1:

	$current_votes = 999;

Then if you were to use the `unset()` function on `$votes`, the reference would drop to 0 and that memory would be freed:

	unset($votes);
	
Another way the reference count on a variable can drop is in the case of local variables or function variables. At the end of the function these variables "go out of scope", leading to a reference drop.
