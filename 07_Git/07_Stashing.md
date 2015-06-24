([Reference](http://git-scm.com/book/en/Git-Tools-Stashing))

Stashing is the process of temporarily putting away any work in progress, freeing you up to switch to different branches if needed.

Stash everything away:

	git stash

See history of what you've stashed

	git stash list

Apply the last stashed stash

	git stash apply

Or to get a specific one, assuming we had these options:

	stash@{0}: WIP on master: 18f80dd Foobar try #2
	stash@{1}: WIP on master: 18f80dd Foobar try #2
	stash@{2}: WIP on master: 18f80dd Foobar try #2

You'd say:

	git stash apply stash@{2}

Create a branch from your stashed changes:

	git stash branch testchanges
	Switched to a new branch "testchanges"
