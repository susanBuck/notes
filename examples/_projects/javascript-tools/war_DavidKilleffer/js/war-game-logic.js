
// ============================================================================
// WAR card game
// ============================================================================
//
// Follows rules for "War for two players" on
// http://www.pagat.com/war/war.html and using variation #1 for when a
// player runs out of cards during a war (e.g., "If [a player doesn't]
// have enough cards to complete the war, [that player will] lose"
// ============================================================================

//
// TODO: update the card display on the battlefield to initially show the cards
// face down, wait a short delay, and then use a CSS/JavaScript card flipping
// animation that turns them face-up
//
// References:
//
//   CSS card flipping animation:  http://css3.bradshawenterprises.com/flip/
//   jQuery card flipping animation flassback:  http://lab.smashup.it/flip
//   Another CSS flipping animation:  http://davidwalsh.name/css-flip
//

$("document").ready(function() {

    // allow debugging by passing "DEBUG=1" to the page in the query string
    var DEBUG = false;
    if ( window.location.href.indexOf("DEBUG=1") > 0) {
        DEBUG = true;
        $('#enableDebugging').hide();
        $('#disableDebugging').show();
        if (DEBUG) alert ('Turning on debugging - check the console log for debugging information.');
    }
    // debugging turned off
    else {
        $('#enableDebugging').show();
        $('#disableDebugging').hide();
    }


    // Globals
    var deck;
    var opponent;
    var player;
    var numPacks      =    1;  // use one standard pack of 52 cards
    var numShuffles   =   10;  // and shuffle the deck X times

    // track card stacks for the player and opponent, and the stacks that are on the battleground area
    var playerStack, opponentStack, playerWarStack, opponentWarStack;

    // this is used to insert a brief delay between drawing/comparing cards
    // (if we don't have a delay, then the operations occur too quickly and
    // the game feels less like a game and more like a computer playing
    // against itself  :-)
    var millisecondOperationDelay = 750;

    // tracks what operations are waiting to be called by setTimeout()
    // (and used so any existing timed operations can be cleared out when the game ends)
    var delayOperation;

    var numCardsPerPlayer = 26;

    // HTML element ID names
    var playerCardsDivId         = "#playerCards";
    var opponentCardsDivId       = "#opponentCards";
    var opponentBattlefieldDivId = "#opponentBattlefield";
    var playerBattlefieldDivId   = "#playerBattlefield";
    var battleButtonId           = "#battleButton";
    var newGameButtonId          = "#newGameButton";


    // start a game when the page has finished loading
    initGame();

    function initGame() {

        // Initialize card deck.
        deck = new Stack();
        newDeck();

        playerStack      = new Stack();
        opponentStack    = new Stack();
        playerWarStack   = new Stack();
        opponentWarStack = new Stack();

        // give cards to the player and the computer opponent
        var playerCards = new Array( numCardsPerPlayer );
        var opponentCards = new Array( numCardsPerPlayer );

        var k = numCardsPerPlayer;

        while (k > 0 && deck.cardCount() > 0) {
            playerCards.push( deck.deal() );
            opponentCards.push( deck.deal() );
            k--;
        }

        var playerCardStrings = "";
        var opponentCardStrings = "";

        _.each(playerCards, function(card) {
            playerCardStrings += card.toString() + '\n';
            playerStack.addCard(card);
            $(playerCardsDivId).append( card.createNode() );
        });
        _.each(opponentCards, function(card) {
            opponentCardStrings += card.toString() + '\n';
            opponentStack.addCard(card);
            $(opponentCardsDivId).append( card.createNode() );
        });

        // turn on the Battle button so the player can play the game
        $(battleButtonId).removeAttr("disabled");

        if (DEBUG) {
            console.log('Your opponent was dealt these cards: \n\n' + opponentCardStrings);
            console.log('You were dealt these cards: \n\n' + playerCardStrings);
            console.log('opponentStack has [' + opponentStack.cardCount() +'] cards\nplayerStack has [' + playerStack.cardCount() +'] cards');
        }
    }

    // clean up the current game and start a new one
    function newGame() {
        if (DEBUG) console.log('inside newGame(), calling clearGame() to clean things up...');
        clearGame();
        if (DEBUG) console.log('about to wait a bit before starting the next game...');
        delayOperation = window.setTimeout(function(){ initGame(); }, millisecondOperationDelay);
    }


    // remove all cards from all boards, remove all cards from stacks,
    // disable "Battle" button (since no game can be active once everything is cleared)
    function clearGame() {
        if (DEBUG) console.log('inside clearGame(), removing cards from board, clearing stacks, and disabling the Battle button...');
        $(opponentCardsDivId).children().remove();
        $(opponentBattlefieldDivId).children().remove();
        $(playerBattlefieldDivId).children().remove();
        $(playerCardsDivId).children().remove();

        playerStack.clear();
        opponentStack.clear();
        playerWarStack.clear();
        opponentWarStack.clear();

        // disable the Battle button since it is only applicable when a game is being played
        $(battleButtonId).attr("disabled", "disabled");

        // clear any remaining timed operations
        window.clearTimeout(delayOperation);
    }


    // ----------------------------------------------------------------------------
    // Game functions.
    // ----------------------------------------------------------------------------

    function newDeck() {

        // use a pre-defined deck so that we can debug "war" conditions, card comparisons, etc.
        if (DEBUG) {
            // uncomment this section to debug a game that is a perfect draw
            /*
            var debugCards = new Array(
                                        new Card("A","D"),  // first player card
                                        new Card("A","H"),  // first opponent card
                                        new Card("K","D"),  // second player card
                                        new Card("K","H"),  // second opponent card
                                        new Card("Q","D"),  // etc. ...
                                        new Card("Q","H")
                                        new Card("J","D"),
                                        new Card("J","H"),
                                        new Card("10","D"),
                                        new Card("10","H"),
                                        new Card("9","D"),
                                        new Card("9","H"),
                                        new Card("8","D"),
                                        new Card("8","H"),
                                        new Card("7","D"),
                                        new Card("7","H"),
                                        new Card("6","D"),
                                        new Card("6","H"),
                                        new Card("5","D"),
                                        new Card("5","H"),
                                        new Card("4","D"),
                                        new Card("4","H"),
                                        new Card("3","D"),
                                        new Card("3","H"),
                                        new Card("2","D"),
                                        new Card("2","H")
                                     );
            */

            // uncomment this section to simulate a game where the player wins every time
            var debugCards = new Array(
                    new Card("A","D"),  // first player card
                    new Card("2","C"),  // first opponent card
                    new Card("K","D"),  // second player card
                    new Card("3","C"),  // second opponent card
                    new Card("Q","D"),  // etc. ...
                    new Card("4","C"),
                    new Card("J","D"),
                    new Card("5","C"),
                    new Card("10","D"),
                    new Card("6","C"),
                    new Card("9","D"),
                    new Card("7","C")
            );

            /*
            // uncomment this section to simulate a game where the opponent wins every time
            var debugCards = new Array(
                    new Card("2","C"),  // first player card
                    new Card("A","D"),  // first opponent card
                    new Card("3","C"),  // second player card
                    new Card("K","D"),  // second opponent card
                    new Card("4","C"),  // etc. ...
                    new Card("Q","D"),
                    new Card("5","C"),
                    new Card("J","D"),
                    new Card("6","C"),
                    new Card("10","D"),
                    new Card("7","C"),
                    new Card("9","D")
            );
            */

            // use half the number of cards from the array as the number of cards to use per player
            numCardsPerPlayer = Math.floor(debugCards.length / 2);

            deck.makeDebugDeck(debugCards);
            console.log('built debugging deck - using cards: \n\n' + deck.toString() );
        } else {
            // Create a deck
            deck.makeDeck(numPacks);
            deck.shuffle(numShuffles);
        }
    }


    // determine if the game is over, and display an appropriate message or confirmation if needed
    function detectEndgame() {

        cardStackReport();

        var message = "";

        // PLAYER WINS
        if ( opponentStack.cardCount() == 0 && playerStack.cardCount() >= (numCardsPerPlayer * 2) )
            message = 'Congratulations, YOU WIN! Would you like to play again?';
        // OPPONENT WINS
        else if (opponentStack.cardCount() >= (numCardsPerPlayer * 2) && playerStack.cardCount() == 0 )
            message = 'Sorry YOU LOST. Would you like to play again?';
        // DRAW!
        else if (opponentStack.cardCount() == 0 && playerStack.cardCount() == 0 )
            message = 'DRAW!  You tied with your opponent. Would you like to play again?';

        if (DEBUG) console.log('numCardsPerPlayer: ['+numCardsPerPlayer+']\n' +
                               'opponentStack.cardCount(): ['+opponentStack.cardCount()+']\n' +
                               'playerStack.cardCount(): ['+playerStack.cardCount()+']\n' +
                               'message: ['+message+']\n' +
                               'message.length: ['+message.length+']');

        // game is over, so show the appropriate message and if the player wants to play again, start a new game
        if (message.length > 0) {
            var playAgain = window.confirm(message);
            if (playAgain) newGame();
            else clearGame();

        }
    }


    /**
     * In a war, the player and opponent both drew cards of equal rank, and so to
     * determine who the winner is, or, if still tied, continue to draw more cards
     */
    function war() {

        if (DEBUG) {
            cardStackReport();
            console.log('Battle tied, moving to a WAR!\n\n' +
                        'called war(), need to determine how the war goes based on how many cards each party has\n\n' +
                        'opponentStack.cardCount(): ['+opponentStack.cardCount()+']\n' +
                        'opponentBattleStack.cardCount(): ['+opponentWarStack.cardCount()+']\n' +
                        'playerStack.cardCount(): ['+playerStack.cardCount()+']' +
                        'playerBattleStack.cardCount(): ['+playerWarStack.cardCount()+']'
            );
        }

        //
        // this version of the War card game follows the rules of War for 2 players
        // using the first variant specified here: http://www.pagat.com/war/war.html#two
        //

        /////// DETERMINE IF EITHER PARTY DOES NOT HAVE ENOUGH CARDS TO CONTINUE THE WAR, OR IF THERE IS A DRAW ///////

        // player has at least enough cards to conduct a war, but opponent
        // does not, so the game is over and the player wins
        if ( opponentStack.cardCount() == 0 && playerStack.cardCount() >= 2) {
            alert('PLAYER WINS GAME: opponent does not have enough cards to continue the war');
            detectEndgame();
        }
        // opponent has at least enough cards to conduct a war, but player
        // does not, so the game is over and the opponent wins
        else if ( playerStack.cardCount() == 0 && opponentStack.cardCount() >= 2) {
            alert('OPPONENT WINS GAME: player does not have enough cards to continue the war');
            detectEndgame();
        }
        // DRAW - both player and opponent do not have enough cards to continue - game ends in a draw
        else if ( playerStack.cardCount() == 0 && opponentStack.cardCount() == 0) {
            alert('DRAW: both player and opponent do not hve enough cards to conduct the war');
            detectEndgame();
        }


        /////// BOTH PLAYERS HAVE ENOUGH CARDS TO CONTINUE THE WAR, SO GO ON ///////
        if (DEBUG) console.log('both players have enough cards to conduct the war, so CONTINUE THE WAR');

        if ( playerStack.cardCount() >= 2 && opponentStack.cardCount() >= 2) {

            var opponentCardFacedown = opponentStack.draw(0);
            var playerCardFacedown   = playerStack.draw(0);

            opponentWarStack.addCard( opponentCardFacedown );
            playerWarStack.addCard( playerCardFacedown );

            var opponentCardFacedownDiv = $(opponentCardsDivId).children('div').first().remove();
            var playerCardFacedownDiv   = $(playerCardsDivId).children('div').first().remove();

            // add these cards to their respective battlefields face-down (as they are when drawn from the original stacks)
            $(opponentBattlefieldDivId).append( opponentCardFacedownDiv );
            $(playerBattlefieldDivId).append( playerCardFacedownDiv );

            // get the opponent's first card and the player's first card
            if (DEBUG) console.log('opponent facedown card drawn: [' + opponentCardFacedown.toString() +']\n' +
                                   'opponentCardFacedownDiv: \n\n' + opponentCardFacedownDiv.html() + '\n\n' +
                                   'player facedown card drawn: ['+playerCardFacedown.toString() +']\n' +
                                   'playerCardFacedownDiv: \n\n' + playerCardFacedownDiv.html() + '\n\n' +
                                   'next calling drawCards() again...'
                                  );

            delayOperation = window.setTimeout(function(){ drawCards(); }, millisecondOperationDelay);
        }
        // debugging message - PLAYER WINS
        else if ( playerStack.cardCount() >= 2 && opponentStack.cardCount() <= 2) {
            if (DEBUG) console.log('playerStack.cardCount(): [' + playerStack.cardCount() +']\n' +
                                   'opponentStack.cardCount(): [' + opponentStack.cardCount() + ']\n\n' +
                                   'opponent does not have enough cards to continue the war - PLAYER WINS'
                                  );
        }
        // debugging message - OPPONENT WINS
        else if ( playerStack.cardCount() <= 2 && opponentStack.cardCount() >= 2) {
            if (DEBUG) console.log('playerStack.cardCount(): [' + playerStack.cardCount() +']\n' +
                                   'opponentStack.cardCount(): [' + opponentStack.cardCount() + ']\n\n' +
                                   'player does not have enough cards to continue the war - OPPONENT WINS'
                                  );
        }
        // debugging message - GAME ENDS IN A DRAW
        else if ( playerStack.cardCount() <= 2 && opponentStack.cardCount() <= 2) {
            if (DEBUG) console.log('playerStack.cardCount(): [' + playerStack.cardCount() +']\n' +
                                   'opponentStack.cardCount(): [' + opponentStack.cardCount() + ']\n\n' +
                                   'NEITHER player nor opponent has enough cards to continue the war - GAME ENDS IN A DRAW'
                                  );
        }
    }


    function drawCards() {
        // get the opponent's first card and the player's first card
        if (DEBUG) console.log('just clicked BATTLE button...\n\n' +
                               'opponentStack has [' + opponentStack.cardCount() +'] cards\n' +
                               'opponentStack: [' + opponentStack.toString() +']\n\n' +
                               'playerStack has [' + playerStack.cardCount() +'] cards\n' +
                               'playerStack: ['+playerStack.toString()+']');

        var opponentCard = opponentStack.draw(0);
        var playerCard = playerStack.draw(0);

        opponentWarStack.addCard(opponentCard);
        playerWarStack.addCard(playerCard);

        // get the opponent's first card and the player's first card
        if (DEBUG) console.log('first opponent card drawn: [' + opponentCard.toString() +']\n' +
                               'first player card drawn: ['+playerCard.toString() +']');

        // WORKS, but would rather animate the card and move it to the middle battlefield
        var opponentFirstCardDiv = $(opponentCardsDivId).children('div').first().remove();
        if (DEBUG) console.log('opponentFirstCardDiv: \n\n' + opponentFirstCardDiv.html());
        $(opponentFirstCardDiv).children('div').first().toggleClass('cardback cardfront');
        $(opponentBattlefieldDivId).append( opponentFirstCardDiv );

        // WORKS, but would rather animate the card and move it to the middle battlefield
        var playerFirstCardDiv = $(playerCardsDivId).children('div').first().remove();
        if (DEBUG) console.log('playerFirstCardDiv: \n\n' + playerFirstCardDiv.html());
        $(playerFirstCardDiv).children('div').first().toggleClass('cardback cardfront');
        $(playerBattlefieldDivId).append( playerFirstCardDiv );

        delayOperation = window.setTimeout(function(){ cardComparison(opponentCard, playerCard); }, millisecondOperationDelay);
    }


    function cardComparison(opponentCard, playerCard) {
        // compare the opponent and player cards to determine whose is higher (or if they are equal)
        var compared = opponentCard.compareTo(playerCard);

        //// TODO: create a tooltip, or a notification area and inform the player of the winner, rather than using window.alert()

        if (DEBUG) console.log('inside cardComparison\n\n\topponentCard: ['+opponentCard.toString()+']\n\tplayerCard: ['+playerCard.toString()+']\n\tcompared: ['+compared+']\n\n');

        // get the HTML of all existing card divs on opponent and player battlefields
        var opponentBattleCardDivs = $(opponentBattlefieldDivId).html();
        var playerBattleCardDivs   = $(playerBattlefieldDivId).html();

        switch (compared) {
            // PLAYER WINS
            case -1 :
                if (DEBUG) {
                    console.log('BATTLE - PLAYER WINS:' +
                                '\n\tcompared: ['+compared+']' +
                                '\n\topponent card: ['+opponentCard.toString()+']'+
                                '\n\tplayer card: ['+playerCard.toString()+']' +
                                '\n\tcards player wins: ['+opponentWarStack.toString()+']'
                               );
                }
                alert('PLAYER WINS - adding all the cards on the battlefield to the player\'s stack...');

                // flip all of the cards on the battlefield over to face-down
                $(opponentBattlefieldDivId).children('div').children('div').each(function(){
                    $(this).removeClass('cardfront').addClass('cardback');
                });
                $(playerBattlefieldDivId).children('div').children('div').each(function(){
                    $(this).removeClass('cardfront').addClass('cardback');
                });
                opponentBattleCardDivs = $(opponentBattlefieldDivId).html();
                playerBattleCardDivs = $(playerBattlefieldDivId).html();

                // give the player all the cards that they won
                $(playerCardsDivId).append( opponentBattleCardDivs );
                $(playerCardsDivId).append( playerBattleCardDivs );

                // add all the battlefield cards to the player's stack
                playerStack.combine(opponentWarStack);
                playerStack.combine(playerWarStack);
                // blank out the opponent and player card battlefields so the next battle can commence
                $(opponentBattlefieldDivId).html('');
                $(playerBattlefieldDivId).html('');
                // battle over, remove cards from both player and opponent war stacks
                opponentWarStack.clear();
                playerWarStack.clear();
                break;
            // DRAW
            case 0 :
                if (DEBUG) {
                    console.log('BATTLE - DRAW, calling war():' +
                            '\n\tcompared: ['+compared+']' +
                            '\n\topponent card: ['+opponentCard.toString()+']'+
                            '\n\tplayer card: ['+playerCard.toString()+']'
                    );
                }
                alert('DRAW - cards on the battlefield tied, so moving to a WAR...');
                war();
                break;
            // OPPONENT WINS
            case 1 :
                if (DEBUG) {
                    console.log('BATTLE - OPPONENT WINS:' +
                            '\n\tcompared: ['+compared+']' +
                            '\n\topponent card: ['+opponentCard.toString()+']'+
                            '\n\tplayer card: ['+playerCard.toString()+']' +
                            '\n\tcards opponent wins: ['+playerWarStack.toString()+']'
                    );
                }
                alert('OPPONENT WINS - adding all the cards on the battlefield to the opponent\'s stack...');

                // flip all of the cards on the battlefield over to face-down
                $(opponentBattlefieldDivId).children('div').children('div').each(function(){
                    $(this).removeClass('cardfront').addClass('cardback');
                });
                $(playerBattlefieldDivId).children('div').children('div').each(function(){
                    $(this).removeClass('cardfront').addClass('cardback');
                });
                opponentBattleCardDivs = $(opponentBattlefieldDivId).html();
                playerBattleCardDivs = $(playerBattlefieldDivId).html();

                // give the opponent all the cards that they won
                $(opponentCardsDivId).append( opponentBattleCardDivs );
                $(opponentCardsDivId).append( playerBattleCardDivs );

                // add all the battlefield cards to the opponent's stack
                opponentStack.combine(opponentWarStack);
                opponentStack.combine(playerWarStack);
                // blank out the opponent and player card battlefields so the next battle can commence
                $(opponentBattlefieldDivId).html('');
                $(playerBattlefieldDivId).html('');
                // battle over, remove cards from both player and opponent war stacks
                opponentWarStack.clear();
                playerWarStack.clear();
                break;
        }

        if (DEBUG) cardStackReport();

        // each time after cards are drawn, check to see if this is an endgame condition
        delayOperation = window.setTimeout(function(){ detectEndgame(); }, millisecondOperationDelay);
    }


    function cardStackReport() {
        console.log('CARD STACKS REPORT:' +
                    '\n\topponentStack: '             + opponentStack.toString()    +
                    '\n\topponentStack.cardCount(): ' + opponentStack.cardCount()   +
                    '\n\topponentWarStack: '          + opponentWarStack.toString() +
                    '\n\tplayerStack: '               + playerStack.toString()      +
                    '\n\tplayerStack.cardCount(): '   + playerStack.cardCount()     +
                    '\n\tplayerWarStack: '            + playerWarStack.toString()
        );
    }


    // draw out cards for the next battle...
    $(battleButtonId).click(function(){
        drawCards();
    });

    // start a new game - clears the board, draws new random cards, etc.
    $(newGameButtonId).click(function(){
        alert('Starting up a new game...');
        newGame();
    });

});
