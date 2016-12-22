class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState) {
    var bet = 0;
    console.log("player " + gameState.players[0].id + gameState.players[0].name);
    console.log("my bet" + gameState.players[0].bet);
    var cardOne = gameState.players[0].hole_cards[0];
    var cardTwo = gameState.players[0].hole_cards[1];

    console.log("Rank 1 - " + cardOne.rank);
    console.log("Rank 2 - " + cardTwo.rank);

    var hasOneHighCard = false


    if(cardOne.rank === "A" || cardOne.rank === "K" || cardOne.rank === "Q" || cardOne.rank === "J" || cardOne.rank === "10") {
      hasOneHighCard = true
    }

    if(cardTwo.rank === "A" || cardTwo.rank === "K" || cardTwo.rank === "Q" || cardTwo.rank === "J" || cardTwo.rank === "10") {
      hasOneHighCard = true
    }

    if(hasOneHighCard) {
      bet += gameState.current_buy_in;
    }

    console.log("Bet " + bet);
    return bet;//gameState.current_buy_in - gameState.players[gameState.in_action]["bet"] + gameState.minimum_raise;
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
