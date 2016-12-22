class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState) {
    var bet = 0;

    var cardOne = gameState.players[0].hole_cards[0];
    var cardTwo = gameState.players[0].hole_cards[1];

    console.log("Rank 1 - " + cardOne.rank);
    console.log("Rank 2 - " + cardTwo.rank);
    console.log("CC " + gameState.community_cards.length);

    var hand = Player.checkCardsRank(cardOne, cardTwo);
    var sameSuit = Player.checkCardsSuit(cardOne, cardTwo);
    var valueCC = Player.checkCommunityCards(cardOne, cardTwo, gameState.community_cards);

    console.log("hand " + hand);
    console.log("ValueCC " + valueCC);
    console.log("sameSuit " + sameSuit);

    if(gameState.community_cards.length == 0) {
      console.log("beforeFlop");
      var betValue = Player.betBeforeFlop(hand, sameSuit, gameState.bet_index);
      bet = Player.getBet(gameState, betValue);
    } else {
      console.log("afterFlop");
      var betValue = Player.betAfterFlop(valueCC, sameSuit, gameState.bet_index);
      bet = Player.getBet(gameState, betValue);
    }

    console.log("Bet " + bet);
    console.log("Round " + gameState.round);
    console.log("Betting Index " + gameState.bet_index);

    return bet;//gameState.current_buy_in - gameState.players[gameState.in_action]["bet"] + gameState.minimum_raise;
  }

  static showdown(gameState) {
  }

  static getBet(gameState, betValue) {
    var bet = 0;
    var check = 0;
    var ultraMinimumRaise = gameState.current_buy_in;
    var minimumRaise = gameState.current_buy_in + gameState.minimum_raise;
    var normalRaise = gameState.current_buy_in + gameState.minimum_raise * 1.5;
    var aggressiveRaise = gameState.current_buy_in + gameState.minimum_raise * 2;
    var superAggressiveRaise = gameState.current_buy_in + gameState.minimum_raise * 4;
    var superMegaAggressiveRaise = gameState.current_buy_in + gameState.minimum_raise * 8;

    if(betValue === "check") {
      bet = check;
    } else if(betValue === "ultraMinimumRaise") {
      bet = ultraMinimumRaise;
    } else if(betValue === "minimumRaise") {
      bet = minimumRaise;
    } else if(betValue === "normalRaise") {
      bet = normalRaise;
    } else if(betValue === "aggressiveRaise") {
      bet = aggressiveRaise;
    } else if(betValue === "superAggressiveRaise") {
      bet = superAggressiveRaise;
    } else if(betValue === "superMegaAggressiveRaise") {
      bet = superMegaAggressiveRaise;
    }

    return bet;
  }

  static betAfterFlop(hand, sameSuit, betIndex) {
    let bet = "check";

    if(hand === "anyPair" && betIndex <= 5) {
      bet = "aggressiveRaise";
    }

    if(hand === "anyPair" && betIndex > 5 && betIndex <= 10) {
      bet = "minimumRaise";
    }

    if(hand === "highPair" && betIndex <= 5) {
      bet = "superAggressiveRaise";
    }

    if(hand === "highPair" && betIndex > 5) {
      bet = "aggressiveRaise";
    }

    return bet;
  }

  static betBeforeFlop(hand, sameSuit, betIndex) {
    let bet = "check";
    if(hand === "oneHighCard" && betIndex <= 5) {
      bet = "ultraMinimumRaise";
    }

    if(hand === "oneHighCard" && betIndex > 5 && betIndex <= 15 && sameSuit) {
      bet = "ultraMinimumRaise";
    }

    if(hand === "twoHighCards" && betIndex <= 5) {
      bet = "minimumRaise";
    }

    if(hand === "twoHighCards" && betIndex > 6 && betIndex <= 10 && !sameSuit) {
      bet = "ultraMinimumRaise";
    }

    if(hand === "twoHighCards" && betIndex > 6 && betIndex <= 20 && sameSuit) {
      bet = "ultraMinimumRaise";
    }

    if(hand === "anyPair" && betIndex <= 5) {
      bet = "aggressiveRaise";
    }

    if(hand === "anyPair" && betIndex > 5 && betIndex <= 10) {
      bet = "minimumRaise";
    }

    if(hand === "highPair" && betIndex <= 5) {
      bet = "superAggressiveRaise";
    }

    if(hand === "highPair" && betIndex > 5) {
      bet = "aggressiveRaise";
    }

    return bet;
  }

  static checkCommunityCards(cardOne, cardTwo, communityCards) {
    var value = "check";
    var onHand = false;
    var highCard = false;

    var cards = communityCards
    cards.push(cardOne, cardTwo);
    var sameCard = Player.checkForSameCards(cards);
    console.log("sameCard rank" + sameCard.rank);
    console.log("sameCard count" + sameCard.count);

    if(sameCard.rank === cardOne.rank || sameCard.rank === cardTwo.rank) {
      onHand = true;
    }

    if(sameCard.rank === "A" || sameCard.rank === "K" || sameCard.rank === "Q" || sameCard.rank === "J" || sameCard.rank === "10") {
        highCard = true;
    }

    if(sameCard.count == 2 && onHand) {
      value = "anyPair";
      if(highCard) {
        value = "highPair";
      }
    }

    if(sameCard.count == 3 && onHand) {
      value = "anyTriple";
      if(highCard) {
        value = "highTriple";
      }
    }

    if(sameCard.count == 4 && onHand) {
      value = "anyQuad";
      if(highCard) {
        value = "highQuad";
      }
    }

    return value;
  }

  static checkForSameCards(cards) {
    var card = {"rank": "", "count": 0};
    var cardsCountDict = {};
    for (var index in cards) {
      var rank = cards[index].rank;
      if(rank in cardsCountDict) {
        cardsCountDict[rank] += 1;
      } else {
        cardsCountDict[rank] = 1;
      }
    }

    // console.log(cardsCountDict);
    for (var rank in cardsCountDict) {
      var count = cardsCountDict[rank];

      if(count > 0 && count > card.count) {
        card.rank = rank;
        card.count = count;
      }
    }

    return card;
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
