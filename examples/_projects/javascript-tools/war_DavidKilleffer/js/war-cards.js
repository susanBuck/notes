

/******************************************************************************
 * Playing Card Objects                                                       *
 *                                                                            *
 * Do not remove this notice.                                                 *
 *                                                                            *
 * Copyright 2001 by Mike Hall                                                *
 * Please see http://www.brainjar.com for terms of use.                       *
 *                                                                            *
 *                                                                            *
 * MODIFIED by David Killeffer <rayden7@gmail.com>                            *
 *     for use in Fall 2012, CSCI-E 75 Dynamic Web Applications class,        *
 *     Harvard University Extension School                                    *
 ******************************************************************************/

//=============================================================================
// Card Object
//
// Note: Requires cards.css for display.
//=============================================================================

//-----------------------------------------------------------------------------
// Card constructor function.
//-----------------------------------------------------------------------------

function Card(rank, suit) {
    this.rank = rank;
    this.suit = suit;

    this.toString   = cardToString;
    this.createNode = cardCreateNode;
    this.compareTo  = cardCompareTo;
}

//-----------------------------------------------------------------------------
// cardToString(): Returns the name of a card (including rank and suit) as a
// text string.
//-----------------------------------------------------------------------------

function cardToString() {

    var cardRank, cardSuit;

    switch (this.rank) {
        case "A" :
            cardRank = "Ace";
            break;
        case "2" :
            cardRank = "Two";
            break;
        case "3" :
            cardRank = "Three";
            break;
        case "4" :
            cardRank = "Four";
            break;
        case "5" :
            cardRank = "Five";
            break;
        case "6" :
            cardRank = "Six";
            break;
        case "7" :
            cardRank = "Seven";
            break;
        case "8" :
            cardRank = "Eight";
            break;
        case "9" :
            cardRank = "Nine";
            break;
        case "10" :
            cardRank = "Ten";
            break;
        case "J" :
            cardRank = "Jack"
            break;
        case "Q" :
            cardRank = "Queen"
            break;
        case "K" :
            cardRank = "King"
            break;
        default :
            cardRank = null;
            break;
    }

    switch (this.suit) {
        case "C" :
            cardSuit = "Clubs";
            break;
        case "D" :
            cardSuit = "Diamonds"
            break;
        case "H" :
            cardSuit = "Hearts"
            break;
        case "S" :
            cardSuit = "Spades"
            break;
        default :
            cardSuit = null;
            break;
    }

    if (cardRank == null || cardSuit == null)
        return "";

    return cardRank + " of " + cardSuit;
}

//-----------------------------------------------------------------------------
// cardCreateNode(): Returns a DIV node which can be used to display the card
// on a page.
//-----------------------------------------------------------------------------

function cardCreateNode() {

    // set up the color for the suit and Unicode symbol for spades/clubs/hearts/diamonds representing the suit
    var cardColor = cardSuitSymbol = "";
    switch (this.suit) {
        case "C" :
            cardColor = "black";
            cardSuitSymbol = "\u2663";
            break;
        case "D" :
            cardColor = "red";
            cardSuitSymbol = "\u2666";
            break;
        case "H" :
            cardColor = "red";
            cardSuitSymbol = "\u2665";
            break;
        case "S" :
            cardColor = "black";
            cardSuitSymbol = "\u2660";
            break;
     }

    // use Handlebars.js to build out the HTML for the card based on the card's rank template

    // this is the script identifier of the template to use based on this card's rank
    var templateID = "#card-template-" + this.rank;

    // read in the actual template code
    var cardTemplate = $(templateID).html();

    // compile the template, preparing it for variable replacement
    var cardTemplateCompiled = Handlebars.compile(cardTemplate);

    // set up the variables that will be replaced in the compiled template
    var context  = {
                       cardName       : this.toString(),
                       cardColor      : cardColor,
                       cardRank       : this.rank,
                       cardSuitSymbol : cardSuitSymbol
                   };

    // perform the variable substitution in the compiled template - the output is the raw HTML
    var html = cardTemplateCompiled(context);

    // Return the card node.
    return html;
}

//-----------------------------------------------------------------------------
// cardCompareTo(cardForComparison): returns -1 if the current card rank is
// lower than the cardForComparison, 0 if the card ranks are equal, and 1 if
// the current card rank is greater than the cardForComparison's rank
//-----------------------------------------------------------------------------

function cardCompareTo(cardForComparison) {

    // track the ranks under new vars because the object ranks include non-integer values
    var thisRank, cardForComparisonRank;

    // update ranks for non-number cards, and use number values for cards 2-10
    switch (this.rank) {
        case "A" : thisRank = 14; break;
        case "K" : thisRank = 13; break;
        case "Q" : thisRank = 12; break;
        case "J" : thisRank = 11; break;
        default  : thisRank = parseInt(this.rank); break;
    }
    switch (cardForComparison.rank) {
        case "A" : cardForComparisonRank = 14; break;
        case "K" : cardForComparisonRank = 13; break;
        case "Q" : cardForComparisonRank = 12; break;
        case "J" : cardForComparisonRank = 11; break;
        default : cardForComparisonRank = parseInt(cardForComparison.rank); break;
    }

    if (thisRank < cardForComparisonRank) comparisonValue = -1;
    else if (thisRank == cardForComparisonRank) comparisonValue = 0;
    else if (thisRank > cardForComparisonRank) comparisonValue = 1;

    console.log('called Card.cardCompareTo(cardForComparison)...' +
                '\n\tthis card: ['+this.toString()+']' +
                '\n\tthis.rank: ['+this.rank+']' +
                '\n\tparseInt(this.rank): ['+parseInt(this.rank)+']' +
                '\n\tcardForComparison: ['+cardForComparison.toString()+']' +
                '\n\tcardForComparison.rank: ['+cardForComparison.rank+']' +
                '\n\tparseInt(cardForComparison.rank): ['+parseInt(cardForComparison.rank)+']' +
                '\n\tcomparisonValue: ['+comparisonValue+']'
               );

    return comparisonValue;
}


//=============================================================================
// Stack Object
//=============================================================================

//-----------------------------------------------------------------------------
// Stack constructor function.
//-----------------------------------------------------------------------------

function Stack() {

    // Create an empty array of cards.

    this.cards = new Array();

    this.makeDeck      = stackMakeDeck;
    this.makeDebugDeck = stackMakeDebugDeck;
    this.shuffle       = stackShuffle;
    this.deal          = stackDeal;
    this.draw          = stackDraw;
    this.addCard       = stackAddCard;
    this.combine       = stackCombine;
    this.cardCount     = stackCardCount;
    this.clear         = stackClear;
    this.toString      = stackToString;
}


//-----------------------------------------------------------------------------
// stackMakeDeck(n): Initializes a stack using 'n' packs of cards.
//-----------------------------------------------------------------------------

function stackMakeDeck(n) {

    var ranks = new Array("A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K");
    var suits = new Array("C", "D", "H", "S");
    var i, j, k;
    var m;

    m = ranks.length * suits.length;

    // Set array of cards.
    this.cards = new Array(n * m);

    // Fill the array with 'n' packs of cards.
    for (i = 0; i < n; i++)
        for (j = 0; j < suits.length; j++)
            for (k = 0; k < ranks.length; k++)
                this.cards[i * m + j * ranks.length + k] = new Card(ranks[k], suits[j]);
}

//-----------------------------------------------------------------------------
// stackMakeDebugDeck(debugCards): Initializes a stack using pre-defined cards.
//-----------------------------------------------------------------------------

function stackMakeDebugDeck(debugCards) {

    this.cards = new Array(debugCards.length);

    for (i = 0; i < debugCards.length; i++)
        this.cards[i] = debugCards[i];

}

//-----------------------------------------------------------------------------
// stackShuffle(n): Shuffles a stack of cards 'n' times.
//-----------------------------------------------------------------------------

function stackShuffle(n) {
    var i, j, k, temp;

    // Shuffle the stack 'n' times.
    for (i = 0; i < n; i++)
        for (j = 0; j < this.cards.length; j++) {
            k = Math.floor(Math.random() * this.cards.length);
            temp = this.cards[j];
            this.cards[j] = this.cards[k];
            this.cards[k] = temp;
        }
}

//-----------------------------------------------------------------------------
// stackDeal(): Removes the first card in the stack and returns it.
//-----------------------------------------------------------------------------

function stackDeal() {
    if (this.cards.length > 0)
        return this.cards.shift();
    else
        return null;
}

//-----------------------------------------------------------------------------
// stackDraw(n): Removes the indicated card from the stack and returns it.
//-----------------------------------------------------------------------------

function stackDraw(n) {
    var card;
    if (n >= 0 && n < this.cards.length) {
        card = this.cards[n];
        this.cards.splice(n, 1);
    }
    else
        card = null;

    return card;
}

//-----------------------------------------------------------------------------
// stackAdd(card): Adds the given card to the stack.
//-----------------------------------------------------------------------------

function stackAddCard(card) {
    this.cards.push(card);
}

//-----------------------------------------------------------------------------
// stackCombine(stack): Adds the cards in the given stack to the current one.
// The given stack is emptied.
//-----------------------------------------------------------------------------

function stackCombine(stack) {
    this.cards = this.cards.concat(stack.cards);
    stack.cards = new Array();
}

//-----------------------------------------------------------------------------
// stackCardCount(): Returns the number of cards currently in the stack.
//-----------------------------------------------------------------------------

function stackCardCount() {
    return this.cards.length;
}

//-----------------------------------------------------------------------------
// stackClear(): remove all the cards from the stack
//-----------------------------------------------------------------------------

function stackClear() {
    this.cards = new Array();
}

//-----------------------------------------------------------------------------
// stackToString(): friendly way to get a string representing each card in the
//                  stack (useful for alert messages or console print outs)
//-----------------------------------------------------------------------------

function stackToString() {
    var cardsString = "";
    for (var j=0; j < this.cards.length; j++) {
        cardsString += this.cards[j].toString() + ", ";
    }

    if (cardsString.substring(cardsString.length-2,cardsString.length) == ", ") {
        cardsString = cardsString.substring(0,cardsString.length-2);
    }

    return cardsString;
}
