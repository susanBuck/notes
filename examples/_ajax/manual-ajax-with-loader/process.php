<?php
# Make this script slower to test the loader
sleep(2);

# Reverse the string and echo it to the page
echo strrev($_POST['name']);
