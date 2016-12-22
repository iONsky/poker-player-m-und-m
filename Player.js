class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState) {
    var bet = gameState.current_buy_in + gameState.minimum_raise;
    console.log("player " + gameState.players[0].id + gameState.players[0].name);
    console.log("my bet" + gameState.players[0].bet);
    var cardOne = gameState.players[0].hole_cards[0];
    var cardTwo = gameState.players[0].hole_cards[1];

    console.log("Rank 1 - " + cardOne.rank);
    console.log("Rank 2 - " + cardTwo.rank);

    if(cardOne.rank === "A" || cardOne.rank === "K" || cardOne.rank === "Q" || cardOne.rank === "J" || cardOne.rank === "10") {
      bet += gameState.minimum_raise;
    }

    if(cardTwo.rank === "A" || cardTwo.rank === "K" || cardTwo.rank === "Q" || cardTwo.rank === "J" || cardTwo.rank === "10") {
      bet += gameState.minimum_raise;
    }

    

    for (var card in gameState.players[0].hole_cards) {
      console.log("Card " + card);
    }
    console.log("Bet " + bet);
    console.log("new Bet " + gameState.current_buy_in - gameState.players[gameState.in_action].bet + gameState.minimum_raise)
    return bet;//gameState.current_buy_in - gameState.players[gameState.in_action]["bet"] + gameState.minimum_raise;
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
