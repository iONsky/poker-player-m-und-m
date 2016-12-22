class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState) {
    for (var player in gameState.players) {
      if(player.name === "M und M") {
        for (var card in player.hole_cards) {
          return gameState.current_buy_in + 23;
            /*if(card.rank === "A" || card.rank === "K" || card.rank === "Q" || card.rank === "J" || card.rank === "10") {
              return gameState.current_buy_in;
            }*/
        }
      }
    }

    return 0;
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
