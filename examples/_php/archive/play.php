<!DOCTYPE html>

<head>

    <?
    
    require_once("DB.php");
    
    # When debugging, we can print_r the $_POST. Now, it's commented out because we don't need it.
    //print_r($_POST);
    
    # Only do the following if we have $_POST variables. i.e, if the form has been submitted
    if($_POST) {
        
        # Pick and print a winning number 
            $how_many_contestants = count($_POST);
            $winning_number       = rand(1,$how_many_contestants);
            
        # Loop through contestants, seeing if any won
        # $index will be the name of the input field such as "conestant1" or "contestant2"
        # $value will be whatever was typed into that field - so in this case, a name
            foreach($_POST as $index => $value) {
                    
                # Generate a random number
                    $random_number = rand(1,$how_many_contestants);
                    
                # See if their generated random  number mathches the winning number
                
                    # First, we use this test to make sure the field was actually filled in and is not blank
                    if($value != "") {
                        if($random_number == $winning_number) {
                            # Note how we're storing our results in an array called $contestants. Again, $value is the name that was typed in.
                            $contestants[$value] = "Winner";
                            //mail($value, 'You\'re a winner', 'Congrats, you did it!');
                            $winner = 1;
                        }
                        else {
                            $contestants[$value] = "Loser";  
                            $winner = 0;          
                        }   
                        
                        $data['first_name'] = $value;
                        $data['winner']     = $winner;
                        DB::instance()->insert('susan_contestants', $data);
                         
                    }                      
            } 
    } 
    ?>
    
</head>


<body>
    
    <? require_once("menu.php") ?>
    
    <!-- Our form to accept new contestants -->
        <form method='POST' action='play.php'>
            Enter the contestants<br>
            
            <? for($i = 1; $i < 15; $i++) { ?>
            	<input type='text' name='contestant<?=$i?>' value='<?=$_POST['contestant'.$i]?>'><br>
            <? } ?>
            
            <input type='submit' value='Pick a winner!'><br>
        </form>    
    
    
    <!-- Print the results only if we have $_POST. i.e. if the form was submitted -->
        <? if($_POST) { ?>
        
            The winning number is <?=$winning_number?>!<br><br>
                
            <? if(count($contestants) > 0) { ?>    
	            <? foreach($contestants as $index => $value) { ?>
	                <?=$index?> is a <?=$value?><br>
	            <? } ?>
            <? } ?>
    
        <? } ?>    
    
</body>