class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState) {
    var bet = gameState.current_buy_in + gameState.minimum_raise;
    console.log("player " + gameState.players[0].id + gameState.players[0].name);

    var cardOne = gameState.players[0].hole_cards[0];
    var cardTwo = gameState.players[0].hole_cards[1];

    console.log("Rank 1 - " + cardOne.rank);
    console.log("Rank 2 - " + cardTwo.rank);

    if(cardOne.rank === "A" || cardOne.rank === "K" || cardOne.rank === "Q" || cardOne.rank === "J" || cardOne.rank === "10") {
      bet += 10;
    }

    if(cardTwo.rank === "A" || cardTwo.rank === "K" || cardTwo.rank === "Q" || cardTwo.rank === "J" || cardTwo.rank === "10") {
      bet += 10;
    }
    /*for (var card in gameState.players[0].hole_cards) {
      console.log("Card " + );
      if(card.rank === "A" || card.rank === "K" || card.rank === "Q" || card.rank === "J" || card.rank === "10") {
        bet += 10;
      }
    }*/
    console.log("Bet " + bet);
    return bet;//gameState.current_buy_in - gameState.players[gameState.in_action]["bet"] + gameState.minimum_raise;
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
