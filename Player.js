class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState) {
    var bet = gameState.current_buy_in;
    for (var player in gameState.players) {
      if(player.name === "M und M") {
        for (var card in player.hole_cards) {
          console.log("Card " + card.rank);
            if(card.rank === "A" || card.rank === "K" || card.rank === "Q" || card.rank === "J" || card.rank === "10") {
              bet += 10;
            }
        }
      }
    }
    console.log("Bet " + bet);
    return bet;//gameState.current_buy_in - gameState.players[gameState.in_action]["bet"] + gameState.minimum_raise;
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
