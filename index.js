/* card class for individual cards, has constructors of rank and suit, contains the function
to determine value of the card's rank based on which index it is in the array, */
class Card {
    constructor(rank, suit) {
        this.rank = rank
        this.suit = suit
    }

    getRankValue() {
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
        return ranks.indexOf(this.rank) 
    }
}

/* deck class that has empty array to hold all the cards that make up the deck, 
an array of the suits, and an array of the ranks. It has a loop to iterate through both
to create all the cards by combining each possible suit with each possible rank.
It also contains the functions to shuffle and deal out the deck */
class Deck {
    constructor() {
        this.cards = [];
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
        /*this loop iterates through the suits array then iterates through all the ranks to 
        create all the combinations for the deck and pushes each card to the cards array*/
        for (const suit of suits) {
            for (const rank of ranks) {
                this.cards.push(new Card(rank, suit));
            }
        }
        /* each time a deck is made for a new game the shuffle function is called so 
        you don't have to shuffle in the game class before play is started*/
        this.shuffle();
    }
    //function to shuffle the deck, this is the Fisher- Yates method
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
    /* function to deal the cards. takes the last element of the cards array (as if actually
    pulling cards from the top of an upside deck)*/
    deal() {
        return this.cards.pop();
    }
}
/* player class - holds the name (player 1 or player 2), sets beginning points for each
player at 0, has an empty array to hold the hand of cards they are dealt, also contains the 
functions to add points to their score and push the cards to to their hand */
class Player {
    constructor(name) {
        this.name = name;
        this.points = 0;
        this.hand = [];
    }
    // function to add to total number of points each round
    addPoint() {
        this.points++;
    }
    // function to deal cards to their hand
    addToHand(card) {
        this.hand.push(card);
    }
}
/* Game class establishes a new deck for each game and initializes the players and contins the
function to actually play the game */
class Game {
    constructor() {
        this.deck = new Deck();
        this.player1 = new Player('Player 1');
        this.player2 = new Player('Player 2');
    }
    /* play function has a loop to deal out the deck and a loop to compare the player's cards
    and determine which is higher */
    play() {
    /*while there are still cards in cards array,the addtohand function and the deal function 
    are used to pull the last index of the cards array and push it to a player, back and forth 
    until the cards array is empty */
        while (this.deck.cards.length > 0) {
            this.player1.addToHand(this.deck.deal());
            this.player2.addToHand(this.deck.deal());
        }

        /* this loop iterates through the 26 cards (because they each got half the deck) 
        in each player's hand and compares each player's cards to determine which is higher 
        until the players run out of cards. it initiates card 1 for player one and card 2 
        for player to so the getrankvalue function knows what to compare*/
        for (let i = 0; i < 26; i++) {
            const card1 = this.player1.hand[i];
            const card2 = this.player2.hand[i];
            /*template literal that logs each round (based on which index is being compared)
            and lots which card each player put down */
            console.log(`Round ${i + 1}: ${this.player1.name} has ${card1.rank} of ${card1.suit}, ${this.player2.name} has ${card2.rank} of ${card2.suit}`);
            /*if else statement compares the cards using the getrankvaluefunction. if player1's
            card it higher it calls the addpoint function to give player 1 a point. if player2's
            card is higher it gives player 2 a point. Whichever player receives a point for that
            round is logged to the console. If the cards are the same rank, neither player is 
            awarded a point and the round is a tie is logged to the console */
            if (card1.getRankValue() > card2.getRankValue()) {
                this.player1.addPoint();
                console.log(`${this.player1.name} wins round ${i + 1}`);
            } else if (card1.getRankValue() < card2.getRankValue()) {
                this.player2.addPoint();
                console.log(`${this.player2.name} wins round ${i + 1}`);
            } else {
                console.log(`Round ${i + 1} is a tie`);
            }
        }

        /*at the end of the loop after all 26 rounds have been played, the total
        number of each player's points are compared and the player with the most points
        is logged to the console. if they players tie that is logged out*/
        if (this.player1.points > this.player2.points) {
            console.log(`${this.player1.name} wins with ${this.player1.points} points.`);
        } else if (this.player1.points < this.player2.points) {
            console.log(`${this.player2.name} wins with ${this.player2.points} points.`);
        } else {
            console.log("The score is tied");
        }
    }
}

// this sets up the game
const game = new Game();
//this starts the game play
game.play();