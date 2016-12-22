class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState) {
    var bet = 0;
    var check = gameState.current_buy_in;
    var minimumRaise = gameState.current_buy_in + gameState.minimum_raise;
    var aggressiveRaise = gameState.current_buy_in + gameState.minimum_raise * 2;
    var superAggressiveRaise = gameState.current_buy_in + gameState.minimum_raise * 4;
    var cardOne = gameState.players[0].hole_cards[0];
    var cardTwo = gameState.players[0].hole_cards[1];

    console.log("Rank 1 - " + cardOne.rank);
    console.log("Rank 2 - " + cardTwo.rank);
    console.log("CC " + gameState.community_cards.length);

    var value = Player.checkCardsRank(cardOne, cardTwo);
    var sameSuit = Player.checkCardsSuit(cardOne, cardTwo);
    var valueCC = Player.checkCommunityCards(cardOne, cardTwo, gameState.community_cards);

    console.log("Value " + value);
    console.log("ValueCC " + valueCC);
    console.log("sameSuit " + sameSuit);

    if(value === "oneHighCard" && gameState.bet_index <= 5) {
      bet = check;
    }

    if(value === "oneHighCard" && gameState.bet_index > 5 && sameSuit) {
      bet = check;
    }

    if(value === "twoHighCards" && gameState.bet_index <= 5) {
      bet = minimumRaise;
    }

    if(value === "twoHighCards" && gameState.bet_index > 6 && gameState.bet_index <= 10 && !sameSuit) {
      bet = check;
    }

    if(value === "twoHighCards" && gameState.bet_index > 6 && sameSuit) {
      bet = check;
    }

    if(value === "anyPair" && gameState.bet_index <= 5) {
      bet = aggressiveRaise;
    }

    if(value === "anyPair" && gameState.bet_index > 5 && gameState.bet_index <= 10) {
      bet = minimumRaise;
    }

    if(value === "highPair" && gameState.bet_index <= 5) {
      bet = superAggressiveRaise;
    }

    if(value === "highPair" && gameState.bet_index > 5) {
      bet = aggressiveRaise;
    }



    console.log("Bet " + bet);
    console.log("Round " + gameState.round);
    console.log("Betting Index " + gameState.bet_index);
    return bet;//gameState.current_buy_in - gameState.players[gameState.in_action]["bet"] + gameState.minimum_raise;
  }

  static showdown(gameState) {
  }

  static checkCommunityCards(cardOne, cardTwo, communityCards) {
    var anyPair = false;
    var value = "";

    for (var index in communityCards) {
      var card = communityCards[index];

      //Pärchen
      if(card.rank === cardOne.rank || card.rank === cardTwo.rank) {
        anyPair = true
        value = "anyPair";
      }
    }

    return value;
  }

  static checkCardsRank(cardOne, cardTwo) {
    var oneHighCard = false;
    var twoHighCards = false;
    var anyPair = false;
    var highPair = false;

    var value = "";

    if(cardOne.rank === "A" || cardOne.rank === "K" || cardOne.rank === "Q" || cardOne.rank === "J" || cardOne.rank === "10") {
      oneHighCard = true;
      value = "oneHighCard";
    }

    if(cardTwo.rank === "A" || cardTwo.rank === "K" || cardTwo.rank === "Q" || cardTwo.rank === "J" || cardTwo.rank === "10") {
      if(oneHighCard) {
        twoHighCards = true;
        value = "twoHighCards";
      } else {
        oneHighCard = true;
        value = "oneHighCard";
      }
    }

    if(cardOne.rank === cardTwo.rank) {
      anyPair = true;
      value = "anyPair";
      if(oneHighCard) {
        highPair = true;
        value = "highPair";
      }
    }

    return value;
  }

  static checkCardsSuit(cardOne, cardTwo) {
    return cardOne.suit === cardTwo.suit;
  }
}

module.exports = Player;
