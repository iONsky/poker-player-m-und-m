class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState) {
    var bet = gameState.current_buy_in;
    console.log("player " + gameState.players[0].id + gameState.players[0].name);
    console.log("Card 0" + gameState.players[0].hole_cards[0]);
    console.log("Card 0" + gameState.players[0].hole_cards[1]);

    bet += shouldBet(gameState.players[0].hole_cards[0]);
    bet += shouldBet(gameState.players[0].hole_cards[1]);

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

  function shouldBet(card) {
    if(card.rank === "A" || card.rank === "K" || card.rank === "Q" || card.rank === "J" || card.rank === "10") {
      return 10;
    }

    return 0;
  }
}

module.exports = Player;
