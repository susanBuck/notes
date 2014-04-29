<?
// What file are we opening? If it doesn't exist, it will create it
$file_name    = "data.txt";

/*
Figure out how we're going to open the file
	Here are the mode options:
	'r'	 Open for reading only; place the file pointer at the beginning of the file.
	'r+' Open for reading and writing; place the file pointer at the beginning of the file.
	'w'	 Open for writing only; place the file pointer at the beginning of the file and truncate the file to zero length. If the file does not exist, attempt to create it.
	'w+' Open for reading and writing; place the file pointer at the beginning of the file and truncate the file to zero length. If the file does not exist, attempt to create it.
	'a'	 Open for writing only; place the file pointer at the end of the file. If the file does not exist, attempt to create it.
	'a+' Open for reading and writing; place the file pointer at the end of the file. If the file does not exist, attempt to create it.
	'x'	 Create and open for writing only; place the file pointer at the beginning of the file. If the file already exists, the fopen() call will fail by returning FALSE and generating an error of level E_WARNING. If the file does not exist, attempt to create it. This is equivalent to specifying O_EXCL|O_CREAT flags for the underlying open(2) system call.
	'x+' Create and open for reading and writing; otherwise it has the same behavior as 'x'.
	'c'	 Open the file for writing only. If the file does not exist, it is created. If it exists, it is neither truncated (as opposed to 'w'), nor the call to this function fails (as is the case with 'x'). The file pointer is positioned on the beginning of the file. This may be useful if it's desired to get an advisory lock (see flock()) before attempting to modify the file, as using 'w' could truncate the file before the lock was obtained (if truncation is desired, ftruncate() can be used after the lock is requested).
	'c+' Open the file for reading and writing; otherwise it has the same behavior as 'c'.
	*/
	$mode = 'c+';

// Open the file.
	$file_handler = fopen($file_name, $mode) or die("error opening file");
	$file_size    = filesize($file_name);

// Read the contents of the file
	$contents = fread($file_handler, $file_size);

// Write one line to the file
	fwrite($file_handler, "Line 1 test\n");

// Write another line to the file
	fwrite($file_handler, "Line 2 test\n");

// Close the file
	fclose($file_handler);

?>

<a href='/source/<?=$_SERVER['PHP_SELF']?>'>View Source</a><br><br>

Two lines have just been written to the file <a href='data.txt'>data.txt</a><br><br>

File size: <?=$file_size?><br><br>
Contents: <br><textarea><?=$contents?></textarea><br><br>

Note if you try this code and it doesn't work on your server, make sure the permissions 
setting on the folder where the file is being written to is set to "Write"

<br><br>

<a href='http://www.tizag.com/phpT/fileread.php'>More information &rarr;</a>